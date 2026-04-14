"use client"

import { cn } from "@/lib/utils"

interface ContentCardProps {
  children: React.ReactNode
  className?: string
}

export function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-lg border border-border shadow-sm p-6 md:p-8",
      className
    )}>
      {children}
    </div>
  )
}

interface SectionHeadingProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function SectionHeading({ children, id, className }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-2xl font-bold text-foreground mb-4 pb-2 border-b border-electric-blue/30",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function SubHeading({ children, id, className }: SectionHeadingProps) {
  return (
    <h3
      id={id}
      className={cn(
        "text-xl font-semibold text-foreground mt-6 mb-3",
        className
      )}
    >
      {children}
    </h3>
  )
}

interface CalloutProps {
  type?: "info" | "warning" | "success" | "tip"
  title?: string
  children: React.ReactNode
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: "bg-electric-blue/10 border-electric-blue/30 text-electric-blue",
    warning: "bg-electric-orange/10 border-electric-orange/30 text-electric-orange",
    success: "bg-green-500/10 border-green-500/30 text-green-600",
    tip: "bg-purple-500/10 border-purple-500/30 text-purple-600",
  }

  const icons = {
    info: "💡",
    warning: "⚠️",
    success: "✅",
    tip: "💬",
  }

  return (
    <div className={cn(
      "rounded-lg border-l-4 p-4 my-4",
      styles[type]
    )}>
      {title && (
        <div className="flex items-center gap-2 font-semibold mb-2">
          <span>{icons[type]}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-foreground/90 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
}

interface TableOfContentsProps {
  items: { title: string; href: string }[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-6">
      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
        On This Page
      </h4>
      <nav className="space-y-1">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="block text-sm text-muted-foreground hover:text-electric-blue transition-colors py-1"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
