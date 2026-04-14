"use client"

/**
 * This tells Next.js that this component must run on the client (browser),
 * not on the server. We need this because we are using React hooks like useState
 * and handling UI interactions (clicks, chat input, etc).
 */

import { useState } from "react"

// Header component (top navigation bar)
import { SiteHeader } from "@/components/site-header"

// Sidebar navigation + navigation data
import { DocSidebar, navigationItems } from "@/components/doc-sidebar"

// Scroll container for smooth scrolling inside main content
import { ScrollArea } from "@/components/ui/scroll-area"

// 📚 Documentation Components (each represents a page)
import { GettingStartedDoc } from "@/components/docs/getting-started-doc"
import { APIDocumentation } from "@/components/api-documentation"
import { BillerEngineDoc } from "@/components/docs/Biller-Engine-api"
import { SmsApiDoc } from "@/components/docs/SmsApiDoc"
import { SecureAcceptance } from "@/components/docs/SecureAcceptance"


/**
 * 🔹 Message Type Definition
 * This defines the structure of each chat message.
 * 
 * role → who sent the message (user or bot)
 * text → actual message content
 */
type Message = {
  role: "user" | "bot"
  text: string
}

export default function Home() {

  /**
   * 🔹 SIDEBAR STATE
   * Controls whether the sidebar is visible or hidden (mainly for mobile view)
   */
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /**
   * 🔹 ACTIVE DOCUMENT STATE
   * Stores which documentation file is currently selected.
   * This drives what content is rendered on the page.
   */
  const [activeDoc, setActiveDoc] = useState("getting-started.md")


  /**
   * 🔹 CHATBOT STATES
   */

  // Stores the full chat conversation (array of messages)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi 👋 How can I help you?" }
  ])

  // Stores the current text typed by the user
  const [input, setInput] = useState("")

  // Controls whether chat window is open or closed
  const [chatOpen, setChatOpen] = useState(false)

  // Indicates if the bot is currently processing (used for "Typing..." UI)
  const [loading, setLoading] = useState(false)


  /**
   * 🔹 DOCUMENT COMPONENT MAPPING
   * 
   * This maps a document file name → React component.
   * Instead of manually switching pages, we dynamically render based on this map.
   * 
   * Example:
   * "sms-api.md" → SmsApiDoc component
   */
  const docComponents: Record<string, React.ComponentType> = {
    "getting-started.md": GettingStartedDoc,
    "processor-payment-api.md": APIDocumentation,
    "biller-engine.md": BillerEngineDoc,
    "sms-api.md": SmsApiDoc,
    "secure-acceptance.md": SecureAcceptance,
  }


  /**
   * 🔹 TITLE MAPPING
   * Maps document file → readable page title.
   * Used in breadcrumb and page header.
   */
  const titleMap: Record<string, string> = {
    "getting-started.md": "Getting Started with Our API",
    "processor-payment-api.md": "Processor Payment API",
    "biller-engine.md": "Biller Engine API",
    "sms-api.md": "SMS API",
    "secure-acceptance.md": "Secure Acceptance",
  }


  /**
   * 🔹 NAVIGATION HANDLER
   * Called when user clicks a sidebar item.
   * 
   * Steps:
   * 1. Update active document (this changes the page content)
   * 2. Close sidebar (important for mobile UX)
   * 3. Scroll to top for better user experience
   */
  const handleNavigate = (_href: string, docFile: string) => {
    setActiveDoc(docFile)
    setSidebarOpen(false)

    // Smooth scroll to top after navigation
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  /**
   * 🔹 DYNAMIC COMPONENT LOADING
   * Based on activeDoc, we pick the correct component.
   * If not found, fallback to GettingStartedDoc.
   */
  const CurrentDocComponent =
    docComponents[activeDoc] || GettingStartedDoc

  /**
   * 🔹 CURRENT PAGE TITLE
   */
  const activeTitle =
    titleMap[activeDoc] || "Documentation"


  /**
   * 🔹 CHATBOT SEND FUNCTION
   * Handles sending user message to backend and receiving reply.
   */
  const sendMessage = async () => {

    // Prevent sending empty messages or sending while already loading
    if (!input.trim() || loading) return

    // Create user message object
    const userMessage: Message = { role: "user", text: input }

    // Add user message to UI immediately (optimistic update)
    setMessages((prev) => [...prev, userMessage])

    // Clear input field
    setInput("")

    // Set loading state to show "Typing..."
    setLoading(true)

    try {
      /**
       * 🔹 API CALL
       * Sends user message to backend chatbot server
       */
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      })

      // Handle server errors (non-200 responses)
      if (!res.ok) {
        throw new Error("Server error")
      }

      // Parse JSON response
      const data: { reply?: string } = await res.json()

      /**
       * Add bot response to chat
       * If reply is missing, fallback message is used
       */
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "No response from server."
        }
      ])
    } catch (error) {

      /**
       * If request fails (network/server issue),
       * show error message instead of crashing app
       */
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Error connecting to server."
        }
      ])
    } finally {
      // Stop loading state
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-background">

      {/* 🔹 HEADER (Top navigation bar) */}
      <SiteHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={navigationItems}
        onNavigate={handleNavigate}
      />

      <div className="flex">

        {/* 🔹 SIDEBAR (Left navigation menu) */}
        <DocSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeDoc={activeDoc}
          onNavigate={handleNavigate}
        />

        {/* 🔹 MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0">
          <ScrollArea className="h-[calc(100vh-4rem)]">

            <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">

              {/* 🔹 BREADCRUMB NAVIGATION */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <button
                  onClick={() => handleNavigate("", "getting-started.md")}
                  className="hover:text-primary"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-foreground font-medium">
                  {activeTitle}
                </span>
              </nav>

              {/* 🔹 DYNAMIC DOCUMENT CONTENT */}
              <CurrentDocComponent />

              {/* 🔹 FOOTER */}
              <footer className="mt-12 pt-6 border-t border-border">
                <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex gap-4">
                    <span>© 2026 Tylersoft-Eclectics</span>
                    <a href="#">Terms</a>
                    <a href="#">Privacy</a>
                  </div>

                  <div className="flex gap-4">
                    <a href="#">API Status</a>
                    <a href="#">Support</a>
                  </div>
                </div>
              </footer>

            </div>
          </ScrollArea>
        </main>
      </div>

      {/* 🔥 CHAT BUTTON (floating button bottom right) */}
      <div
        className="fixed bottom-5 right-5 bg-black text-white p-3 rounded-full cursor-pointer z-50"
        onClick={() => setChatOpen(!chatOpen)}
      >
        💬
      </div>

      {/* 🔥 CHAT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-20 right-5 w-[320px] h-[420px] bg-white rounded-xl shadow-xl flex flex-col z-50">

          {/* Chat Header */}
          <div className="bg-black text-white p-3 rounded-t-xl font-bold flex justify-between">
            Assistant
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">

            {/* Loop through messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-200 self-end"   // user message (right side)
                    : "bg-gray-200 self-start" // bot message (left side)
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="bg-gray-200 p-2 rounded-lg w-fit">
                Typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex p-2 gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded px-2"
              placeholder="Type a message..."
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-black text-white px-3 rounded"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  )
}