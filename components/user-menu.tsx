"use client"

import { useState } from "react"
import { User, LogOut, Settings, User as UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/useAuth"

interface UserMenuProps {
    onOpenLogin: () => void
}

export function UserMenu({ onOpenLogin }: UserMenuProps) {
    const { user, signOut } = useAuth()
    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        setIsSigningOut(true)
        try {
            await signOut()
        } finally {
            setIsSigningOut(false)
        }
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-300"
                    onClick={onOpenLogin}
                >
                    Sign In
                </Button>
                <Button
                    size="sm"
                    className="hover:scale-105 transition-transform duration-300"
                    onClick={onOpenLogin}
                >
                    Get Started
                </Button>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:scale-105 transition-transform duration-300"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                            alt={user.user_metadata?.name || user.email || "User"}
                        />
                        <AvatarFallback className="text-xs font-medium">
                            {user.user_metadata?.name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.user_metadata?.name || user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href="/dashboard" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <a href="/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 