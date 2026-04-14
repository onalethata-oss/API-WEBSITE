"use client"

import Image from "next/image"
import { ContentCard, SectionHeading, SubHeading, Callout } from "@/components/content-card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function SecureAcceptance() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <ContentCard className="bg-gradient-to-r from-electric-blue/5 to-electric-orange/5 border-electric-blue/20">
        <div className="flex justify-between">
          <div>
            <Badge className="bg-electric-blue text-white mb-2">
              Payment Gateway
            </Badge>
            <h1 className="text-3xl font-bold">
              Secure Acceptance Integration
            </h1>
            <p className="text-muted-foreground">Version 1.1</p>
          </div>

          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-electric-blue" />
            April 2026
          </div>
        </div>
      </ContentCard>

      {/* Introduction */}
      <ContentCard>
        <SectionHeading>Introduction</SectionHeading>
        <p>
          Tylersoft provides Secure Acceptance and REST API options for payment gateway integration.
        </p>
      </ContentCard>

      {/* Workflow */}
      <ContentCard>
        <SectionHeading>Workflow Overview</SectionHeading>

        <ul className="list-none space-y-2">
          <li>1. Generate Web Token (Authorization)</li>
          <li>2. Process Payment</li>
        </ul>
      </ContentCard>

      {/* Step 1 */}
      <ContentCard>
        <SectionHeading>1. Authorization Request</SectionHeading>

        <Callout type="info" title="Endpoint">
          POST /ecommerce/web-token
        </Callout>

        <SubHeading>Headers</SubHeading>
        <p>Authorization: Basic</p>

        <SubHeading>Request</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "username": "your_username",
  "password": "your_password"
}`}
        />

        <SubHeading>Success Response</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "status": "00",
  "statusDescription": "Success",
  "token": "abc123token"
}`}
        />

        <SubHeading>Failure Response</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "status": "99",
  "statusDescription": "Invalid request"
}`}
        />
      </ContentCard>

      {/* Step 2 */}
      <ContentCard>
        <SectionHeading>2. Payment Request</SectionHeading>

        <Callout type="info" title="Endpoint">
          POST /ecommerce/pay
        </Callout>

        <SubHeading>Headers</SubHeading>
        <p>Authorization: Bearer web_token</p>

        <SubHeading>Request Parameters</SubHeading>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left">Field</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>amount</td><td>Transaction amount</td></tr>
            <tr><td>accountno</td><td>Customer account</td></tr>
            <tr><td>serviceid</td><td>Service ID</td></tr>
            <tr><td>msisdn</td><td>Phone number</td></tr>
            <tr><td>currencycode</td><td>Currency (BWP)</td></tr>
            <tr><td>name</td><td>Customer name</td></tr>
            <tr><td>transactionid</td><td>Unique transaction ID</td></tr>
          </tbody>
        </table>

        <SubHeading>Sample Request</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "amount": "50",
  "accountno": "26777063984",
  "serviceid": "1000",
  "msisdn": "26777063984",
  "currencycode": "BWP",
  "name": "Mompati Mokoka",
  "transactionid": "TRX_0008786707"
}`}
        />

        <SubHeading>Success Response</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "decision": "ACCEPT",
  "responseCode": "100",
  "message": "Request was processed successfully"
}`}
        />

        <SubHeading>Failure Codes</SubHeading>
        <ul>
          <li>99 - Invalid request</li>
          <li>101 - Unauthorized</li>
        </ul>
      </ContentCard>

      {/* Redirection */}
      <ContentCard>
        <SectionHeading>Redirection Flow</SectionHeading>

        <p>
          After payment request, the user is redirected to a secure checkout page.
        </p>

        <CodeBlock
          language="html"
          code={`<form action="https://secure.cybersource.com" method="POST">
  <input type="hidden" name="transaction_id" value="TRX_0008786707" />
</form>`}
        />

        <Callout type="info" title="Frontend Handling">
          Render the response HTML directly in the browser.
        </Callout>
      </ContentCard>

      {/* Illustration */}
      <ContentCard>
        <SectionHeading>Illustration</SectionHeading>

        <Callout type="warning" title="Add Images">
          Add screenshots to:
          <br />
          /public/images/secure-acceptance-step1.jpg
          <br />
          /public/images/secure-acceptance-step2.jpg
        </Callout>

        <div className="space-y-4 mt-4">
            <p>Below is the first page that appears after clicking the checkout button</p>
          <Image
            src="/images/secure-acceptance-step1.jpg"
            alt="Checkout Page"
            width={900}
            height={500}
            className="rounded-lg border"
          />
          <p>Below is the second page that appears after completing the checkout process</p>
          <Image
            src="/images/secure-acceptance-step2.jpg"
            alt="Payment Page"
            width={900}
            height={500}
            className="rounded-lg border"
          />
        </div>
      </ContentCard>

      {/* Response Codes */}
      <ContentCard>
        <SectionHeading>Response Codes</SectionHeading>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>100</td><td>Successful</td></tr>
            <tr><td>203</td><td>Declined</td></tr>
            <tr><td>204</td><td>Insufficient funds</td></tr>
            <tr><td>205</td><td>Lost card</td></tr>
          </tbody>
        </table>
      </ContentCard>

    </div>
  )
}