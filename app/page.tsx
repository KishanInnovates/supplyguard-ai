"use client"
import Link from "next/link"
import { ArrowRight, Shield, Zap, GitBranch, Upload, Scan, CheckCircle, Star, Github, Twitter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { useState } from "react"
import { LoginDialog } from "@/components/login-dialog"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/useAuth"

// Animation utility classes
const fadeInUp = "animate-in slide-in-from-bottom-4 duration-700 fill-mode-both"
const fadeInLeft = "animate-in slide-in-from-left-4 duration-700 fill-mode-both"
const fadeInRight = "animate-in slide-in-from-right-4 duration-700 fill-mode-both"
const scaleIn = "animate-in zoom-in-95 duration-500 fill-mode-both"
const staggerDelay = (index: number) => ({ animationDelay: `${index * 150}ms` })

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isChanging, setIsChanging] = useState(false)

  const handleThemeChange = () => {
    setIsChanging(true)

    // Create ripple effect
    const button = document.querySelector("[data-theme-toggle]") as HTMLElement
    if (button) {
      const ripple = document.createElement("div")
      ripple.className = "absolute inset-0 rounded-full bg-primary/20 animate-ping"
      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    // Add page transition effect
    document.documentElement.style.transition = "background-color 0.5s ease, color 0.5s ease"

    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light")
      setTimeout(() => {
        setIsChanging(false)
        document.documentElement.style.transition = ""
      }, 100)
    }, 150)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      data-theme-toggle
      className={`h-9 w-9 relative overflow-hidden transition-all duration-300 ${isChanging ? "scale-110 rotate-180" : "hover:scale-105"
        }`}
      disabled={isChanging}
    >
      {/* Light mode sun icon */}
      <svg
        className={`h-4 w-4 transition-all duration-500 ${theme === "dark" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>

      {/* Dark mode moon icon */}
      <svg
        className={`absolute h-4 w-4 transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          }`}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Loading spinner overlay */}
      {isChanging && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function Header({ onOpenLogin }: { onOpenLogin: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-full px-4 md:px-8 lg:px-12 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
            <Shield className="size-4 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
            SupplyGuard AI
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Testimonials
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu onOpenLogin={onOpenLogin} />
        </div>
      </div>
    </header>
  )
}

function HeroSection({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { user } = useAuth()

  return (
    <section className="relative overflow-hidden py-20 md:py-32 w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="container max-w-full px-4 md:px-8 lg:px-12 relative">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={`mb-8 inline-flex items-center rounded-full border px-3 py-1 text-sm hover:scale-105 transition-transform duration-300 ${fadeInUp}`}
          >
            <span className="mr-2">🚀</span>
            <span>Now with AI-powered vulnerability detection</span>
          </div>

          <h1
            className={`mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl ${fadeInUp}`}
            style={staggerDelay(1)}
          >
            Secure Your Codebase
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> with AI</span>
          </h1>

          <p className={`mb-8 text-xl text-muted-foreground md:text-2xl ${fadeInUp}`} style={staggerDelay(2)}>
            Detect vulnerabilities. Get smart patch suggestions. Ship safer software.
          </p>

          <div className={`flex flex-col gap-4 sm:flex-row sm:justify-center ${fadeInUp}`} style={staggerDelay(3)}>
            {user ? (
              <Button
                size="lg"
                className="w-full sm:w-auto group hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full sm:w-auto group hover:scale-105 transition-all duration-300"
                onClick={onOpenLogin}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto hover:scale-105 transition-all duration-300"
            >
              View Demo
            </Button>
          </div>
        </div>

        <div className={`mt-16 mx-auto max-w-5xl ${fadeInUp}`} style={staggerDelay(4)}>
          <div className="relative rounded-xl border bg-background/50 p-4 backdrop-blur hover:shadow-2xl transition-all duration-500 group">
            <img
              src="/security-dashboard-vulnerability-scan.png"
              alt="SupplyGuard AI Dashboard"
              className="w-full rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Vulnerability Detection",
      description:
        "Advanced machine learning algorithms scan your dependencies for known vulnerabilities and zero-day threats.",
    },
    {
      icon: Zap,
      title: "Instant Fix Suggestions",
      description:
        "Get intelligent recommendations for patches and updates, prioritized by severity and compatibility.",
    },
    {
      icon: GitBranch,
      title: "One-Click GitHub PR Automation",
      description:
        "Automatically generate pull requests with fixes, complete with detailed explanations and testing notes.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 w-full">
      <div className="container max-w-full px-4 md:px-8 lg:px-12">
        <div className={`mx-auto max-w-2xl text-center mb-16 ${fadeInUp}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to keep your dependencies secure and up-to-date
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${fadeInUp}`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Dependency File",
      description: "Simply drag and drop your package.json, requirements.txt, or any dependency file.",
    },
    {
      icon: Scan,
      title: "Scan with AI",
      description: "Our AI engine analyzes your dependencies against our comprehensive vulnerability database.",
    },
    {
      icon: CheckCircle,
      title: "Patch with Confidence",
      description: "Review AI-generated fixes and apply them with one-click GitHub PR generation.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted/30 w-full">
      <div className="container max-w-full px-4 md:px-8 lg:px-12">
        <div className={`mx-auto max-w-2xl text-center mb-16 ${fadeInUp}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Get started in minutes with our simple three-step process</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`relative text-center group ${fadeInUp}`} style={staggerDelay(index)}>
              <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 cursor-pointer">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full">
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "SupplyGuard AI has transformed how we handle security vulnerabilities. The AI suggestions are incredibly accurate and save us hours of manual work.",
      author: "Sarah Chen",
      role: "Senior DevOps Engineer",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "The GitHub PR automation is a game-changer. We can now patch vulnerabilities across all our repositories in minutes, not days.",
      author: "Marcus Rodriguez",
      role: "Security Lead",
      company: "StartupXYZ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "Finally, a tool that understands the context of our codebase. The AI doesn't just find vulnerabilities—it provides intelligent solutions.",
      author: "Emily Watson",
      role: "CTO",
      company: "InnovateLabs",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32 w-full">
      <div className="container max-w-full px-4 md:px-8 lg:px-12">
        <div className={`mx-auto max-w-2xl text-center mb-16 ${fadeInUp}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Trusted by Development Teams</h2>
          <p className="text-lg text-muted-foreground">See what our users are saying about SupplyGuard AI</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group ${fadeInUp}`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <blockquote className="mb-6 text-muted-foreground">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors duration-300">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { user } = useAuth()

  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground w-full">
      <div className="container max-w-full px-4 md:px-8 lg:px-12">
        <div className={`mx-auto max-w-2xl text-center ${fadeInUp}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {user ? "Ready to Continue Securing Your Codebase?" : "Ready to Secure Your Codebase?"}
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/80">
            {user
              ? "Access your dashboard to continue monitoring and securing your dependencies."
              : "Join thousands of developers who trust SupplyGuard AI to keep their dependencies secure."
            }
          </p>
          <div className={`flex flex-col gap-4 sm:flex-row sm:justify-center ${fadeInUp}`} style={staggerDelay(1)}>
            {user ? (
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto group hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto group hover:scale-105 transition-all duration-300"
                onClick={onOpenLogin}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t py-12 w-full">
      <div className="container max-w-full px-4 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-4 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="size-4" />
              </div>
              <span className="font-bold text-xl">SupplyGuard AI</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Secure your codebase with AI-powered vulnerability detection and intelligent patch suggestions.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/KishanInnovates" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://x.com/guptakishan428" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground max-w-7xl mx-auto">
          <p>&copy; 2025 SupplyGuard AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header onOpenLogin={() => setIsLoginDialogOpen(true)} />
      <HeroSection onOpenLogin={() => setIsLoginDialogOpen(true)} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onOpenLogin={() => setIsLoginDialogOpen(true)} />
      <Footer />
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
    </div>
  )
}
