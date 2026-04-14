"use client"

import {
  ContentCard,
  SectionHeading,
  Callout,
} from "@/components/content-card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen, CheckCircle } from "lucide-react"

export function GettingStartedDoc() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <ContentCard>
        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div>
            <div className="flex gap-2 mb-3">
              <Badge>Docs</Badge>
              <Badge variant="outline">v2.0</Badge>
            </div>

            <h1 className="text-3xl font-bold mb-2">
              Getting Started
            </h1>

            <p className="text-muted-foreground max-w-xl">
              Learn how to integrate payments, billing, SMS, and secure transactions.
            </p>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex gap-2 items-center">
              <Clock size={16} /> April 2026
            </div>
            <div className="flex gap-2 items-center">
              <User size={16} /> Tylersoft Team
            </div>
            <div className="flex gap-2 items-center">
              <BookOpen size={16} /> 10 min read
            </div>
          </div>

        </div>
      </ContentCard>

      {/* Overview */}
      <ContentCard>
        <SectionHeading>Overview</SectionHeading>
        <p className="text-muted-foreground">
          Our API follows REST principles using standard HTTP methods.
        </p>
      </ContentCard>

      {/* HTTP Methods */}
      <ContentCard>
        <SectionHeading>HTTP Methods</SectionHeading>

        <CodeBlock
          title="GET Example"
          language="bash"
          code={`curl -X GET "https://api.example.com/v2/transactions/123"
-H "Authorization: Bearer YOUR_API_KEY"`}
        />

        <CodeBlock
          title="POST Example"
          language="json"
          code={`POST /v2/payments

{
  "amount": 100,
  "currency": "BWP",
  "customer": "John Doe"
}`}
        />
      </ContentCard>

      {/* Auth */}
      <ContentCard>
        <SectionHeading>Authentication</SectionHeading>

        <CodeBlock
          language="bash"
          code={`curl -H "Authorization: Bearer YOUR_API_KEY"`}
        />

        <Callout type="warning" title="Security">
          Never expose API keys on the frontend.
        </Callout>
      </ContentCard>

      {/* Quick Start */}
      <ContentCard>
        <SectionHeading>Quick Start</SectionHeading>

        <div className="grid md:grid-cols-2 gap-4">
          {["Get API Key", "Choose API", "Test", "Go Live"].map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle size={18} />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </ContentCard>

    </div>
  )
}