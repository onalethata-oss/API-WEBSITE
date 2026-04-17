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
          Tylersoft provides two integration options for payment processing:
          <strong> Secure Acceptance</strong> and <strong>REST API</strong>.
        </p>
      </ContentCard>

      {/* Workflow */}
      {/* Workflow */}
<ContentCard>
  <SectionHeading>Workflow Overview</SectionHeading>

  <p className="mb-3">
    The Secure Acceptance integration involves two key steps:
  </p>

  <div className="space-y-4 text-sm">

   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Step 1 */}
  <div className="p-5 rounded-2xl border bg-muted/40 hover:shadow-sm transition">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-electric-blue text-white text-sm font-bold">
        1
      </div>
      <SubHeading>Generate Web Token</SubHeading>
    </div>

    <p className="text-sm text-muted-foreground">
      This step involves requesting an authorization token from the payment gateway.
      The token enables secure communication between your application and the Tylersoft API.
      The generated token must be included in all subsequent API requests.
    </p>
  </div>

  {/* Step 2 */}
  <div className="p-5 rounded-2xl border bg-muted/40 hover:shadow-sm transition">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-electric-orange text-white text-sm font-bold">
        2
      </div>
      <SubHeading>Process Payment</SubHeading>
    </div>

    <p className="text-sm text-muted-foreground">
      After obtaining the web token, a payment request is made by submitting transaction details
      such as amount, customer information, and service ID. Once processed, the customer is redirected
      to a secure checkout page where they complete the payment by entering their card details.
    </p>
  </div>

</div>

  </div>
</ContentCard>

     
 {/* Authorization */}
<ContentCard>
  <SectionHeading>1. Authorization Request</SectionHeading>

  <Callout type="info" title="Endpoint">
    https://Url:0000/ecommerce/web-token
  </Callout>

  {/* Request Details */}
  <SubHeading>Request Details</SubHeading>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">

    <div className="p-3 rounded-xl border bg-muted/40">
      <p className="text-xs text-muted-foreground">Method</p>
      <p className="font-semibold">POST</p>
    </div>

    <div className="p-3 rounded-xl border bg-muted/40">
      <p className="text-xs text-muted-foreground">Content-Type</p>
      <p className="font-semibold">application/json</p>
    </div>

    <div className="p-3 rounded-xl border bg-muted/40">
      <p className="text-xs text-muted-foreground">Authorization</p>
      <p className="font-semibold">Basic</p>
    </div>

  </div>

  {/* Parameters */}
  <SubHeading>Parameters</SubHeading>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <div className="p-4 rounded-xl border hover:shadow-sm transition">
      <p className="font-semibold">username</p>
      <p className="text-sm text-muted-foreground mt-1">
        Your API username provided by Tylersoft.
      </p>
    </div>

    <div className="p-4 rounded-xl border hover:shadow-sm transition">
      <p className="font-semibold">password</p>
      <p className="text-sm text-muted-foreground mt-1">
        Your API password provided by Tylersoft.
      </p>
    </div>

  </div>

  {/* Sample Request */}
  <SubHeading>Sample Request</SubHeading>
  <CodeBlock
    language="json"
    code={`{
  "username": "your_username",
  "password": "your_password"
}`}
  />

  {/* Success Response */}
  <SubHeading>Success Response</SubHeading>
  <CodeBlock
    language="json"
    code={`{
  "status": "00",
  "statusDescription": "Success",
  "token": "b0c95e2144bdd4c86b94501a814f9bbd9d025651d8497df"
}`}
  />

  {/* Failure Response */}
  <SubHeading>Failure Response</SubHeading>
  <CodeBlock
    language="json"
    code={`{
  "status": "99",
  "statusDescription": "Invalid request",
  "token": ""
}`}
  />
</ContentCard>

      {/* Payment */}
      <ContentCard>
        <SectionHeading>2. Payment Request</SectionHeading>

        <Callout type="info" title="Endpoint">
          POST /ecommerce/pay
        </Callout>

        <SubHeading>Headers</SubHeading>
        <p>Content-Type: application/json</p>
        <p>Authorization: Bearer &lt;web_token&gt;</p>

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
            <tr><td>accountno</td><td>Customer account number</td></tr>
            <tr><td>serviceid</td><td>Service ID assigned by Tylersoft</td></tr>
            <tr><td>msisdn</td><td>Customer phone number</td></tr>
            <tr><td>currencycode</td><td>Currency (e.g. BWP)</td></tr>
            <tr><td>name</td><td>Customer full name</td></tr>
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
        <ul className="list-disc pl-6">
          <li>99 - Invalid request</li>
          <li>101 - Unauthorized access</li>
        </ul>
      </ContentCard>

      {/* Redirection */}
      <ContentCard>
        <SectionHeading>Redirection Flow</SectionHeading>

        <p>
          After processing payment, the customer is redirected to a secure checkout page
          to enter card details and complete the transaction.
        </p>

        <CodeBlock
          language="html"
          code={`<form id="redirectForm" method="POST" action="https://secure.cybersource.com">
  <input type="hidden" name="transaction_id" value="TRX_0008786707">
  <input type="hidden" name="redirect_url" value="https://merchant.com/success">
</form>

<script>
  document.getElementById("redirectForm").submit();
</script>`}
        />

        <Callout type="info" title="Frontend Handling">
          Render the HTML response returned by the server directly in the browser.
        </Callout>
      </ContentCard>

      {/* Illustration */}
      <ContentCard>
        <SectionHeading>Illustration</SectionHeading>

        <div className="space-y-4 mt-4">
          <p>First page after clicking checkout</p>
          <Image
            src="/images/secure-acceptance-step1.jpg"
            alt="Checkout Page"
            width={900}
            height={500}
            className="rounded-lg border"
          />

          <p>Second page after completing payment</p>
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
              <th className="p-3 text-left">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>100</td><td>Successful Transaction</td><td>Issuing Bank</td></tr>
            <tr><td>203</td><td>Declined</td><td>Issuing Bank</td></tr>
            <tr><td>204</td><td>Insufficient Funds</td><td>Issuing Bank</td></tr>
            <tr><td>205</td><td>Lost/Stolen Card</td><td>Issuing Bank</td></tr>
          </tbody>
        </table>
      </ContentCard>

    </div>
  )
}