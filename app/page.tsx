"use client"

import { useState } from "react"

// Header
import { SiteHeader } from "@/components/site-header"

// Sidebar
import { DocSidebar, navigationItems } from "@/components/doc-sidebar"

// Scroll
import { ScrollArea } from "@/components/ui/scroll-area"

// Docs
import { GettingStartedDoc } from "@/components/docs/getting-started-doc"
import { APIDocumentation } from "@/components/api-documentation"
import { BillerEngineDoc } from "@/components/docs/Biller-Engine-api"
import { SmsApiDoc } from "@/components/docs/SmsApiDoc"
import { SecureAcceptance } from "@/components/docs/SecureAcceptance"

type Message = {
  role: "user" | "bot"
  text: string
}

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ✅ KEEP activeDoc for sidebar highlight
  const [activeDoc, setActiveDoc] = useState("getting-started.md")

  // 💬 Chat
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi 👋 How can I help you?" }
  ])
  const [input, setInput] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  /**
   * ✅ SCROLL NAVIGATION (NO PAGE SWITCHING)
   */
  const handleNavigate = (_href: string, docFile: string) => {
    const id = docFile.replace(".md", "")
    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }

    // ✅ keep sidebar highlight working
    setActiveDoc(docFile)

    setSidebarOpen(false)
  }

  /**
   * 💬 CHAT
   */
  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      })

      if (!res.ok) throw new Error()

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response." }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error connecting to server." }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">

      {/* 🔹 HEADER */}
      <SiteHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={navigationItems || []} // ✅ prevents error
        onNavigate={handleNavigate}
      />

      <div className="flex">

        {/* 🔹 SIDEBAR */}
        <DocSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeDoc={activeDoc} // ✅ highlight works
          onNavigate={handleNavigate}
        />

        {/* 🔹 MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          <ScrollArea className="h-[calc(100vh-4rem)]">

            <div className="max-w-4xl mx-auto p-6 space-y-16">

              {/* ✅ ALL DOCS */}

              <section id="getting-started" className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <GettingStartedDoc />
              </section>

              <section id="processor-payment-api" className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">Processor Payment API</h2>
                <APIDocumentation />
              </section>

              <section id="biller-engine" className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">Biller Engine API</h2>
                <BillerEngineDoc />
              </section>

              <section id="sms-api" className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">SMS API</h2>
                <SmsApiDoc />
              </section>

              <section id="secure-acceptance" className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">Secure Acceptance</h2>
                <SecureAcceptance />
              </section>

              {/* 🔹 FOOTER */}
              <footer className="pt-10 border-t text-sm text-muted-foreground flex justify-between">
                <span>© 2026 Tylersoft-Eclectics</span>
                <div className="flex gap-4">
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
                </div>
              </footer>

            </div>
          </ScrollArea>
        </main>
      </div>

      {/* 💬 CHAT BUTTON */}
      <div
        className="fixed bottom-5 right-5 bg-black text-white p-3 rounded-full cursor-pointer z-50"
        onClick={() => setChatOpen(!chatOpen)}
      >
        💬
      </div>

      {/* 💬 CHAT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-20 right-5 w-[320px] h-[420px] bg-white rounded-xl shadow-xl flex flex-col z-50">

          <div className="bg-black text-white p-3 rounded-t-xl font-bold flex justify-between">
            Assistant
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-200 self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-200 p-2 rounded-lg">
                Typing...
              </div>
            )}
          </div>

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