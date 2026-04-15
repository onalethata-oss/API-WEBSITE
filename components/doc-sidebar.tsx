"use client"

// React hook to store and update state (like open/close)
import { useState } from "react"

// Icons used in the sidebar
import { ChevronDown, ChevronRight, BookOpen, CreditCard, Smartphone, Zap, Search } from "lucide-react"

// Helper function to combine class names
import { cn } from "@/lib/utils"

// Makes the sidebar scrollable
import { ScrollArea } from "@/components/ui/scroll-area"

// Components used to show/hide dropdown sections
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


// 👉 Defines what each menu item should look like
export interface NavItem {
  title: string
  href?: string
  docFile?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
  isActive?: boolean
}


// 👉 List of all sidebar menu items
export const navigationItems: NavItem[] = [
  {
    title: "Getting Started",
    icon: BookOpen,
    href: "getting-started",
    docFile: "getting-started.md",
    isActive: true,
  },
  {
    title: "Processor Payment API",
    icon: CreditCard,
    href: "processor-payment-api",
    docFile: "processor-payment-api.md",
  },
  {
    title: "Biller Engine API",
    icon: Zap,
    href: "biller-engine",
    docFile: "biller-engine.md",
  },
  {
    title: "SMS API",
    icon: Smartphone,
    href: "sms-api",
    docFile: "sms-api.md",
  },
  {
    title: "Secure Acceptance",
    icon: CreditCard,
    href: "secure-acceptance",
    docFile: "secure-acceptance.md",
  },
]


// 👉 Props (inputs) for each sidebar item
interface NavItemComponentProps {
  item: NavItem
  level?: number
  activeDoc: string
  onNavigate: (href: string, docFile: string) => void
  search?: string // ✅ ADDED
}


// 👉 Component that renders ONE menu item
function NavItemComponent({ item, level = 0, activeDoc, onNavigate, search = "" }: NavItemComponentProps) {

  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => child.isActive) ?? false
  )

  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon
  const isActive = item.docFile === activeDoc

  // 🔍 MATCH CHECK (no filtering, just highlight)
  const isMatch = item.title.toLowerCase().includes(search.toLowerCase())

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors group">
          
          {Icon && <Icon className="h-4 w-4 text-electric-blue" />}
          <span className="flex-1 text-left">{item.title}</span>

          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="ml-4 pl-2 border-l-2 border-sidebar-border space-y-0.5 mt-1">
            {item.children!.map((child, index) => (
              <NavItemComponent
                key={index}
                item={child}
                level={level + 1}
                activeDoc={activeDoc}
                onNavigate={onNavigate}
                search={search} // ✅ PASS DOWN
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <button
      onClick={() =>
        item.href && item.docFile && onNavigate(item.href, item.docFile)
      }
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full text-left",

        isActive
          ? "bg-electric-blue text-white font-medium"
          : isMatch && search
          ? "bg-blue-100 text-blue-600 font-medium" // ✅ highlight match
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-electric-blue"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{item.title}</span>
    </button>
  )
}


// 👉 Props for the main sidebar
interface DocSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeDoc: string
  onNavigate: (href: string, docFile: string) => void
}


// 👉 Main sidebar component
export function DocSidebar({ isOpen, onClose, activeDoc, onNavigate }: DocSidebarProps) {

  // 🔍 SEARCH STATE (ONLY ADDITION)
  const [search, setSearch] = useState("")

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >

        <ScrollArea className="h-full">
          <div className="p-4">

            {/* Header section */}
            <div className="flex items-center gap-2 px-3 py-3 mb-4 bg-electric-blue/10 rounded-lg border border-electric-blue/20">
              <Zap className="h-5 w-5 text-electric-orange" />
              <div>
                <p className="text-sm font-semibold text-electric-blue">
                  API Documentation
                </p>
                <p className="text-xs text-muted-foreground">
                  Version 2.0
                </p>
              </div>
            </div>

            {/* 🔍 SEARCH BAR (ADDED ONLY) */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                placeholder="Search APIs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Navigation menu (UNCHANGED) */}
            <nav className="space-y-1">
              {navigationItems.map((item, index) => (
                <NavItemComponent
                  key={index}
                  item={item}
                  activeDoc={activeDoc}
                  onNavigate={onNavigate}
                  search={search} // ✅ PASS SEARCH
                />
              ))}
            </nav>

          </div>
        </ScrollArea>

      </aside>
    </>
  )
}