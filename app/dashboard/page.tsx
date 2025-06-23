"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Upload,
  FileText,
  Shield,
  Settings,
  History,
  Moon,
  Sun,
  Github,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from '@supabase/supabase-js'
import { supabse } from "@/lib/supabaseClient"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
// Mock vulnerability data
const mockVulnerabilities = [
  {
    package: "lodash",
    currentVersion: "4.17.20",
    vulnerability: "Prototype Pollution",
    severity: "high",
    suggestedFix: "4.17.21",
    description: "Prototype pollution vulnerability in lodash",
  },
  {
    package: "axios",
    currentVersion: "0.21.1",
    vulnerability: "Server-Side Request Forgery",
    severity: "medium",
    suggestedFix: "0.21.4",
    description: "SSRF vulnerability in axios",
  },
  {
    package: "express",
    currentVersion: "4.17.1",
    vulnerability: "Open Redirect",
    severity: "low",
    suggestedFix: "4.18.2",
    description: "Open redirect vulnerability in express",
  },
]


const sidebarItems = [
  {
    title: "Dashboard",
    icon: Shield,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Upload File",
    icon: Upload,
    url: "/dashboard",
  },
  {
    title: "Scan History",
    icon: History,
    url: "/dashboard",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/dashboard",
  },
]

function AppSidebar() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabse.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SupplyGuard AI</span>
                  <span className="truncate text-xs text-muted-foreground">Vulnerability Scanner</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                    <span className="text-sm font-medium">U</span>
                  </div>
                  <span>User Account</span> */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.png"}
                        alt={user?.user_metadata?.name || "User"}
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {user?.user_metadata?.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user?.user_metadata?.name || "User"}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function FileUploadArea({ onFileContent }: { onFileContent: (content: string) => void }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileContent, setFileContent] = useState("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name === "package.json" || file.type === "application/json") {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setFileContent(content)
          onFileContent(content)
        }
        reader.readAsText(file)
      }
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setFileContent(content)
    onFileContent(content)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload package.json
        </CardTitle>
        <CardDescription>Drag and drop your package.json file or paste the content below</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Drop your package.json here</p>
          <p className="text-sm text-muted-foreground mb-4">or paste the content below</p>

          <Textarea
            placeholder="Paste your package.json content here..."
            value={fileContent}
            onChange={handleTextareaChange}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function VulnerabilityTable({ vulnerabilities }: { vulnerabilities: typeof mockVulnerabilities }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Vulnerability Report
        </CardTitle>
        <CardDescription>Found {vulnerabilities.length} vulnerabilities in your dependencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Current Version</TableHead>
                <TableHead>Vulnerability</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Suggested Fix</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vulnerabilities.map((vuln, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{vuln.package}</TableCell>
                  <TableCell className="font-mono text-sm">{vuln.currentVersion}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vuln.vulnerability}</div>
                      <div className="text-sm text-muted-foreground">{vuln.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(vuln.severity) as any} className="flex items-center gap-1 w-fit">
                      {getSeverityIcon(vuln.severity)}
                      {vuln.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{vuln.suggestedFix}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Patch
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const [hasScanned, setHasScanned] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [fileContent, setFileContent] = useState("")
  const [scanResults, setScanResults] = useState<typeof mockVulnerabilities>([])


  const handleScan = async () => {
    if (!fileContent.trim()) return

    setIsScanning(true)

    try {
      const parsed = JSON.parse(fileContent)
      const dependencies = parsed.dependencies || {}

      const res = await fetch("./api/scan-with-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dependencies }),
      })

      const data = await res.json()

      if (data.suggestions) {
        // Set this instead of mockVulnerabilities
        setScanResults(data.suggestions)
        setHasScanned(true)
      }
    } catch (err) {
      console.error("Scan failed:", err)
      alert("Something went wrong while scanning.")
    }

    setIsScanning(false)
  }

  const handleGeneratePR = () => {
    // Simulate GitHub PR generation
    alert("GitHub PR generation would be implemented here!")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <div className="space-y-6">
              <div className="mt-6">
                <FileUploadArea onFileContent={setFileContent} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleScan}
                  disabled={!fileContent.trim() || isScanning}
                  className="flex-1 sm:flex-none"
                >
                  {isScanning ? "Scanning..." : "Scan Dependencies"}
                </Button>

                {hasScanned && (
                  <Button
                    variant="outline"
                    onClick={handleGeneratePR}
                    className="flex items-center gap-2 flex-1 sm:flex-none"
                  >
                    <Github className="h-4 w-4" />
                    Generate GitHub PR
                  </Button>
                )}
              </div>

              {hasScanned && (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                  {scanResults.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-muted-foreground text-center">
                        No known vulnerabilities found!
                      </CardContent>
                    </Card>
                  ) : (
                      <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <VulnerabilityTable vulnerabilities={scanResults} />
                      </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
