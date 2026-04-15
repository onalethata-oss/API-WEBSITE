"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  Moon,
  Sun,
  User,
  Eye,
  EyeOff
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import Image from "next/image"

// TYPES
interface NavItem {
  title: string
  href?: string
  docFile?: string
  children?: NavItem[]
}

interface SiteHeaderProps {
  onMenuClick: () => void
  navigationItems: NavItem[]
  onNavigate?: (href: string, docFile: string) => void
}

export function SiteHeader({
  onMenuClick,
}: SiteHeaderProps) {

  const [theme, setTheme] = useState<"light" | "dark">("light")

  // AUTH STATE
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // INIT
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const logged = localStorage.getItem("loggedIn")

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"

    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)

    document.documentElement.classList.toggle("dark", initialTheme === "dark")

    if (logged === "true") setIsLoggedIn(true)
  }, [])

  // THEME TOGGLE
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // AUTH LOGIC
  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    // SIGNUP
    if (authMode === "signup") {
      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      const exists = users.find((u: any) => u.email === email)
      if (exists) {
        alert("User already exists")
        return
      }

      users.push({ email, password })
      localStorage.setItem("users", JSON.stringify(users))
      alert("Account created! Please login.")
      setAuthMode("login")
      return
    }

    // LOGIN
    const validUser = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (!validUser) {
      alert("Invalid credentials")
      return
    }

    localStorage.setItem("loggedIn", "true")
    setIsLoggedIn(true)
    setAuthOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    setIsLoggedIn(false)
  }

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-header text-header-foreground shadow-lg">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu />
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
              </div>

              <div className="hidden sm:block">
                <h1 className="font-bold">Tylersoft-Eclectics</h1>
                <p className="text-xs text-white/70">
                  Simplifying Lives Digitally
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>

            {isLoggedIn ? (
              <Button className="bg-red-500 text-white" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                className="bg-blue-500 text-white flex items-center gap-1"
                onClick={() => setAuthOpen(true)}
              >
                <User size={16} />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* AUTH MODAL */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="max-w-sm p-6 rounded-2xl shadow-2xl">

          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              {authMode === "login" ? "Welcome Back – Access Your APIs" : "Create an Account to Get Started"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">

            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {authMode === "signup" && (
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              onClick={handleAuth}
            >
              {authMode === "login" ? "Login" : "Sign Up"}
            </Button>

            <div className="text-center text-sm">
              {authMode === "login" ? (
                <button
                  onClick={() => setAuthMode("signup")}
                  className="text-blue-500"
                >
                  Don't have an account? Sign up
                </button>
              ) : (
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-blue-500"
                >
                  Already have an account? Login
                </button>
              )}
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}