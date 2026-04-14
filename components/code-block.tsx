"use client"

// React hook to manage copied state
import { useState } from "react"

// Icons for copy button
import { Copy, Check } from "lucide-react"

// Button component
import { Button } from "@/components/ui/button"


// 👉 Props for the CodeBlock component
interface CodeBlockProps {
  code: string              // The code text to display
  language?: string         // Language label (e.g. js, bash)
  title?: string            // Optional title above the code
  showLineNumbers?: boolean // Show line numbers or not
}


// 👉 Main CodeBlock component
export function CodeBlock({
  code,
  language = "bash",
  title,
  showLineNumbers = true,
}: CodeBlockProps) {

  // 👉 Track if code is copied
  const [copied, setCopied] = useState(false)

  // 👉 Copy code to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)

    // Reset after 2 seconds
    setTimeout(() => setCopied(false), 2000)
  }

  // 👉 Split code into lines
  const lines = code.split("\n")

  return (
    <div className="rounded-lg border bg-[#1e293b] overflow-hidden my-4">
      
      {/* 👉 Top bar (title + copy button) */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-white/10">
        
        {/* Left side: title + language */}
        <div className="flex items-center gap-2 text-xs text-white/60">
          {title && <span>{title}</span>}
          <span className="uppercase text-electric-orange">{language}</span>
        </div>

        {/* Right side: copy button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-7 px-2 text-white/60 hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </Button>
      </div>

      {/* 👉 Code display area */}
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code>

          {/* 👉 If line numbers are enabled */}
          {showLineNumbers ? (
            <table>
              <tbody>

                {/* Loop through each line */}
                {lines.map((line, i) => (
                  <tr key={i}>

                    {/* Line number */}
                    <td className="pr-4 text-right text-white/30 select-none align-top">
                      {i + 1}
                    </td>

                    {/* Code text */}
                    <td className="whitespace-pre">
                      {line}
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          ) : (

            // 👉 If no line numbers, just show lines
            lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))

          )}

        </code>
      </pre>
    </div>
  )
}