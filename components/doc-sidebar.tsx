"use client"

// React hook to store and update state (like open/close)
import { useState } from "react"

// Icons used in the sidebar
import { ChevronDown, ChevronRight, BookOpen, CreditCard, Smartphone, Zap } from "lucide-react"

// Helper function to combine class names
import { cn } from "@/lib/utils"

// Makes the sidebar scrollable
import { ScrollArea } from "@/components/ui/scroll-area"

// Components used to show/hide dropdown sections
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


// 👉 Defines what each menu item should look like
export interface NavItem {
  title: string                // Text shown in the sidebar
  href?: string               // Page identifier
  docFile?: string            // File to load when clicked
  icon?: React.ComponentType<{ className?: string }> // Icon to display
  children?: NavItem[]        // Sub-items (for dropdown menus)
  isActive?: boolean          // Whether it's active by default
}


// 👉 List of all sidebar menu items
export const navigationItems: NavItem[] = [
  {
    title: "Getting Started",
    icon: BookOpen,
    href: "getting-started",
    docFile: "getting-started.md",
    isActive: true, // this is the default selected page
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
  level?: number              // How deep the item is (for nested items)
  activeDoc: string           // Currently open document
  onNavigate: (href: string, docFile: string) => void // Function to handle navigation
}


// 👉 Component that renders ONE menu item
// It calls itself again if there are nested items (recursive)
function NavItemComponent({ item, level = 0, activeDoc, onNavigate }: NavItemComponentProps) {

  // Controls whether dropdown is open or closed
  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => child.isActive) ?? false
  )

  // Check if this item has sub-items
  const hasChildren = item.children && item.children.length > 0

  // Get the icon for this item
  const Icon = item.icon

  // Check if this item is the current active page
  const isActive = item.docFile === activeDoc


  // 👉 If item has sub-items → show dropdown
  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>

        {/* Clickable header that opens/closes dropdown */}
        <CollapsibleTrigger className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors group">
          
          {/* Show icon if it exists */}
          {Icon && <Icon className="h-4 w-4 text-electric-blue" />}

          {/* Menu title */}
          <span className="flex-1 text-left">{item.title}</span>

          {/* Arrow icon changes depending on open/closed state */}
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>

        {/* Show child items when dropdown is open */}
        <CollapsibleContent>
          <div className="ml-4 pl-2 border-l-2 border-sidebar-border space-y-0.5 mt-1">
            {item.children!.map((child, index) => (
              <NavItemComponent
                key={index}
                item={child}
                level={level + 1}
                activeDoc={activeDoc}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </CollapsibleContent>

      </Collapsible>
    )
  }


  // 👉 If no sub-items → simple clickable button
  return (
    <button
      onClick={() =>
        item.href && item.docFile && onNavigate(item.href, item.docFile)
      }
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full text-left",

        // Highlight if this is the active page
        isActive
          ? "bg-electric-blue text-white font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-electric-blue"
      )}
    >
      {/* Show icon if available */}
      {Icon && <Icon className="h-4 w-4" />}

      {/* Menu title */}
      <span>{item.title}</span>
    </button>
  )
}


// 👉 Props for the main sidebar
interface DocSidebarProps {
  isOpen: boolean                        // Is sidebar visible (for mobile)
  onClose: () => void                   // Function to close sidebar
  activeDoc: string                     // Current document
  onNavigate: (href: string, docFile: string) => void // Navigation function
}


// 👉 Main sidebar component
export function DocSidebar({ isOpen, onClose, activeDoc, onNavigate }: DocSidebarProps) {
  return (
    <>
      {/* Dark background overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose} // click outside to close sidebar
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",

          // Slide in/out animation for mobile
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >

        {/* Scrollable area */}
        <ScrollArea className="h-full">
          <div className="p-4">

            {/* Header section (branding/info) */}
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

            {/* Navigation menu */}
            <nav className="space-y-1">
              {navigationItems.map((item, index) => (
                <NavItemComponent
                  key={index}
                  item={item}
                  activeDoc={activeDoc}
                  onNavigate={onNavigate}
                />
              ))}
            </nav>

          </div>
        </ScrollArea>

      </aside>
    </>
  )
}