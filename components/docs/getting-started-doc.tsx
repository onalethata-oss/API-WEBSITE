"use client"

import {
  ContentCard,
  SectionHeading,
  Callout,
} from "@/components/content-card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  User,
  BookOpen,
  Zap,
  Shield,
  Globe,
} from "lucide-react"

export function GettingStartedDoc() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
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
              Integrate payments, billing, SMS, and secure APIs into your system quickly and efficiently.
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
              <BookOpen size={16} /> 8 min read
            </div>
          </div>

        </div>
      </ContentCard>

      {/* OVERVIEW */}
      <ContentCard>
        <SectionHeading>Overview</SectionHeading>
        <p className="text-muted-foreground">
          The Tylersoft API is a REST-based platform that allows developers to
          integrate core services such as payments, billing systems, and SMS notifications
          into their applications using simple HTTP requests.
        </p>
      </ContentCard>

      {/* BASE URL */}
      <ContentCard>
        <SectionHeading>Base URL</SectionHeading>

        <CodeBlock
          language="bash"
          code={`https://api.tylersoft.com/v2`}
        />

        <Callout type="info" title="Tip">
          All requests must be made over HTTPS.
        </Callout>
      </ContentCard>

      {/* FEATURES */}
      <ContentCard>
        <SectionHeading>Key Features</SectionHeading>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg flex gap-3">
            <Zap /> Fast Transactions
          </div>
          <div className="p-4 border rounded-lg flex gap-3">
            <Shield /> Secure API Access
          </div>
          <div className="p-4 border rounded-lg flex gap-3">
            <Globe /> Easy Integration
          </div>
        </div>
      </ContentCard>

      {/* HOW IT WORKS */}
      <ContentCard>
        <SectionHeading>How It Works</SectionHeading>

        <p className="text-muted-foreground mb-3">
          You interact with the API by sending HTTP requests to specific endpoints.
          Each request includes your API key for authentication and returns a structured response.
        </p>

        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>Send a request to an endpoint</li>
          <li>Include your API key</li>
          <li>Receive a JSON response</li>
        </ul>
      </ContentCard>

      {/* HTTP METHODS */}
      <ContentCard>
        <SectionHeading>HTTP Methods</SectionHeading>

        <CodeBlock
          title="GET Example"
          language="bash"
          code={`curl -X GET "https://api.tylersoft.com/v2/transactions"
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

      {/* AUTHENTICATION */}
      <ContentCard>
        <SectionHeading>Authentication</SectionHeading>

        <p className="text-muted-foreground mb-3">
          Every request must include your API key in the Authorization header.
        </p>

        <CodeBlock
          language="bash"
          code={`Authorization: Bearer YOUR_API_KEY`}
        />

        <Callout type="warning" title="Security">
          Never expose your API key in frontend applications.
        </Callout>
      </ContentCard>

      {/* RESPONSE */}
      <ContentCard>
        <SectionHeading>Response Format</SectionHeading>

        <p className="text-muted-foreground mb-3">
          All responses are returned in JSON format.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "status": "success",
  "data": {
    "id": "txn_123",
    "amount": 100,
    "currency": "BWP"
  }
}`}
        />
      </ContentCard>

      {/* ERRORS */}
      <ContentCard>
        <SectionHeading>Error Handling</SectionHeading>

        <p className="text-muted-foreground mb-3">
          If something goes wrong, the API will return an error response.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "status": "error",
  "message": "Invalid API Key"
}`}
        />
      </ContentCard>

    </div>
  )
}