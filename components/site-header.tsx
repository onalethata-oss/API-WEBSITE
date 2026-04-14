"use client"

import { useState, useEffect } from "react"
import { Search, Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

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

function flattenNavItems(items: NavItem[]) {
  const result: any[] = []

  function traverse(items: NavItem[], parent?: string) {
    for (const item of items) {
      if (item.href && item.docFile) {
        result.push({ title: item.title, href: item.href, docFile: item.docFile, parent })
      }
      if (item.children) {
        traverse(item.children, item.title)
      }
    }
  }

  traverse(items)
  return result
}

export function SiteHeader({ onMenuClick, navigationItems, onNavigate }: SiteHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const flatItems = flattenNavItems(navigationItems)

  const filteredItems = searchQuery
    ? flatItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parent?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleSearchSelect = (href: string, docFile: string) => {
    setSearchOpen(false)
    setSearchQuery("")
    onNavigate?.(href, docFile)
  }

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-header text-header-foreground shadow-lg">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-header-foreground hover:bg-white/10"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* LOGO + TEXT */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden bg-white p-1">
                <Image
                  src="/logo.png"
                  alt="TylerSoft Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-bold leading-tight">
                  Tylersoft-Eclectics 
                </h1>
                <p className="text-xs text-white/70">
                  Simplifying Lives Digitally
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* SEARCH DIALOG */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Search Documentation</DialogTitle>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search API documentation..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />

            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-4 max-h-80 overflow-y-auto">
              {filteredItems.length > 0 ? (
                <ul className="space-y-1">
                  {filteredItems.map((item, index) => (
                    <li key={index}>
                      <button
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-accent"
                        onClick={() => handleSearchSelect(item.href, item.docFile)}
                      >
                        <div className="font-medium">{item.title}</div>
                        {item.parent && (
                          <div className="text-xs text-muted-foreground">
                            in {item.parent}
                          </div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No results found for "{searchQuery}"
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}