"use client"

import { ContentCard, SectionHeading, SubHeading, Callout } from "@/components/content-card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen } from "lucide-react"

export function SmsApiDoc() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <ContentCard className="bg-gradient-to-r from-electric-blue/5 to-electric-orange/5 border-electric-blue/20">
        <div className="flex justify-between">
          <div>
            <Badge className="bg-electric-orange text-white mb-2">
              SMS API
            </Badge>
            <h1 className="text-3xl font-bold mb-2">
              Transactional SMS API Documentation
            </h1>
            <p className="text-muted-foreground">
              Send SMS messages via Tylersoft REST API
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-electric-blue" />
              Last updated: April 2026
            </div>
          </div>
        </div>
      </ContentCard>

      {/* Purpose */}
      <ContentCard>
        <SectionHeading>Purpose</SectionHeading>
        <p>
          This document serves as a guide for clients who want to send SMS messages
          using the Tylersoft SMS API.
        </p>
      </ContentCard>

      {/* Introduction */}
      <ContentCard>
        <SectionHeading>Introduction</SectionHeading>
        <p>
          The Tylersoft SMS API is a REST-based API that enables registered clients
          to connect and send SMS messages programmatically.
        </p>
      </ContentCard>

      {/* Requirements */}
      <ContentCard>
        <SectionHeading>Requirements</SectionHeading>

        <ul className="list-disc pl-6 space-y-2">
          <li>Client must be registered on the payment gateway</li>
          <li>Valid API credentials (clientId, username, password)</li>
        </ul>

        <Callout type="info" title="Authentication">
          All requests require valid credentials to be included in the request body.
        </Callout>
      </ContentCard>

      {/* Request Parameters */}
      <ContentCard>
        <SectionHeading>Request Parameters</SectionHeading>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left">Parameter</th>
                <th className="p-3 text-left">Required</th>
                <th className="p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-mono text-electric-blue">message</td>
                <td className="p-3">M</td>
                <td className="p-3">SMS message content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-electric-blue">recipient</td>
                <td className="p-3">M</td>
                <td className="p-3">Phone number with country code (e.g. 267...)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-electric-blue">clientId</td>
                <td className="p-3">M</td>
                <td className="p-3">Client identifier</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-electric-blue">username</td>
                <td className="p-3">M</td>
                <td className="p-3">API username</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-electric-blue">password</td>
                <td className="p-3">M</td>
                <td className="p-3">API password</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-electric-blue">TransactionId</td>
                <td className="p-3">M</td>
                <td className="p-3">Unique transaction reference</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ContentCard>

      {/* Sample Request */}
      <ContentCard>
        <SectionHeading>Sample SMS Request</SectionHeading>

        <CodeBlock
          language="json"
          code={`{
  "message": "This is a test sms",
  "recipient": "26774769141",
  "clientId": "1",
  "username": "xxxx",
  "password": "xxxxxxx",
  "TransactionId": "72134"
}`}
        />
      </ContentCard>

      {/* Responses */}
      <ContentCard>
        <SectionHeading>Responses</SectionHeading>

        <SubHeading>Success Response</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "Message": "SMS was sent Successfully!",
  "Responsecode": "00"
}`}
        />

        <SubHeading>Failure Response</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "Message": "SMS not sent!",
  "Responsecode": "99"
}`}
        />
      </ContentCard>

      {/* Response Codes */}
      <ContentCard>
        <SectionHeading>Response Codes</SectionHeading>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>00</td><td>Successful</td></tr>
            <tr><td>99</td><td>Failed</td></tr>
          </tbody>
        </table>
      </ContentCard>

      {/* Footer Info */}
      <ContentCard>
        <SectionHeading>Contact</SectionHeading>
        <p className="text-sm text-muted-foreground">
          Plot 8842 Khama Crescent, Government Enclave, Gaborone<br />
          Tel: +267 3951798<br />
          Email: enquiries@tylersoft.net
        </p>
      </ContentCard>

    </div>
  )
}