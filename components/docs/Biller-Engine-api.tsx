"use client"

import Image from "next/image"
import { ContentCard, SectionHeading, SubHeading, Callout } from "@/components/content-card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen } from "lucide-react"

export function BillerEngineDoc() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <ContentCard className="bg-gradient-to-r from-electric-blue/5 to-electric-orange/5 border-electric-blue/20">
        <div className="flex justify-between">
          <div>
            <Badge className="bg-electric-blue text-white mb-2">
              Biller Engine API
            </Badge>
            <h1 className="text-3xl font-bold">
              TYLERSOFT BILLER ENGINE API DOCUMENT
            </h1>
            <p className="text-muted-foreground mt-1">Version 1.3</p>
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-electric-blue" />
              Last updated: April 2026
            </div>
          </div>
        </div>
      </ContentCard>

      {/* Disclaimer */}
      <ContentCard>
        <SectionHeading>Disclaimer</SectionHeading>
        <p className="text-sm text-muted-foreground">© 2018 Tylersoft-Eclectics</p>
        <p className="mt-2">
          This document is intended for Tylersoft-Eclectics partners’ use. The information shall not
          be disclosed outside the partners’ organization and shall not be duplicated. Tylersoft-Eclectics
          may make improvements and/or changes at any time.
        </p>
      </ContentCard>

      {/* Purpose */}
      <ContentCard>
        <SectionHeading>Purpose</SectionHeading>
        <p>
          This document is intended for technical personnel integrating with the Tylersoft Biller Engine API.
          It enables secure utility payments and airtime top-ups using JSON-based requests.
        </p>
      </ContentCard>

      {/* Revision History */}
      <ContentCard>
        <SectionHeading>Revision History</SectionHeading>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left">Version</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1.0</td><td>24/04/2018</td><td>Charles Mutura</td><td>Initial draft</td></tr>
            <tr><td>1.1</td><td>04/10/2019</td><td>Gaonyadiwe Gaboiphiwe</td><td>Callback + flow</td></tr>
            <tr><td>1.2</td><td>20/08/2021</td><td>Gaonyadiwe Gaboiphiwe</td><td>BPC updates</td></tr>
            <tr><td>1.3</td><td>13/09/2022</td><td>Gaonyadiwe Gaboiphiwe</td><td>DSTV confirmation</td></tr>
          </tbody>
        </table>
      </ContentCard>

      {/* Services */}
      <ContentCard>
        <SectionHeading>List of Services</SectionHeading>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left">Service ID</th>
              <th className="p-3 text-left">Biller</th>
              <th className="p-3 text-left">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1001</td><td>DSTV</td><td>DSTV</td></tr>
            <tr><td>1002</td><td>MASCOM</td><td>Airtime</td></tr>
            <tr><td>1003</td><td>BEMOBILE</td><td>Airtime</td></tr>
            <tr><td>1004</td><td>ORANGE</td><td>Airtime</td></tr>
            <tr><td>1005</td><td>BPC</td><td>Electricity</td></tr>
            <tr><td>1006</td><td>INTERCAPE</td><td>Bus Ticketing</td></tr>
          </tbody>
        </table>
      </ContentCard>

      {/* Confirm Customer */}
      <ContentCard>
        <SectionHeading>Confirm BPC Customer</SectionHeading>

        <Callout type="info" title="Endpoint">
          POST /TYLERSOFT_VPS_ADAPTOR/Confirm_Customer
        </Callout>

        <CodeBlock
          language="json"
          title="Sample Request"
          code={`{
  "meternumber":"04040404040",
  "ClientId":"1005",
  "username":"testClient",
  "password":"clientpass"
}`}
        />

        <CodeBlock
          language="json"
          title="Sample Response"
          code={`{
  "canvend": "true",
  "status": "00",
  "kyc": {
    "name": "Test Vend"
  }
}`}
        />
      </ContentCard>

      {/* Message Flow Diagram */}
      <ContentCard>
        <SectionHeading>Message Flow Diagram</SectionHeading>

        <Callout type="warning" title="Biller Engine Flow Diagram">
          Image is in the images folder, use the following path to display it:
          <code className="ml-2">/public/images/biller-flow.png</code>
        </Callout>

        <div className="mt-4">
          <Image
            src="/images/biller-flow.jpg"
            alt="Biller Engine Flow Diagram"
            width={900}
            height={500}
            className="rounded-lg border"
          />
        </div>
      </ContentCard>

      {/* Transaction */}
      <ContentCard>
        <SectionHeading>Send Transaction</SectionHeading>

        <Callout type="info" title="Endpoint">
          POST /TylerSoftBillerEnine_Servlet/Servlet
        </Callout>

        <SubHeading>Sample Request</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "Amount":"11.00",
  "Currency":"BWP",
  "Serviceid":"1005",
  "accountno":"04040404040",
  "TransactionId":"011217203-BPC45"
}`}
        />

        <SubHeading>Sample Response</SubHeading>
        <CodeBlock
          language="json"
          code={`{
  "Message": "Transaction received",
  "Responsecode": "00"
}`}
        />
      </ContentCard>

      {/* Callback */}
      <ContentCard>
        <SectionHeading>Callback</SectionHeading>

        <CodeBlock
          language="json"
          title="Airtime"
          code={`{
  "Message":"success-Successful",
  "Responsecode":"00"
}`}
        />

        <CodeBlock
          language="json"
          title="Electricity Token"
          code={`{
  "token":"0404-0404-0400-0000-0148",
  "units":"14.8 kWh"
}`}
        />
      </ContentCard>

      {/* Query */}
      <ContentCard>
        <SectionHeading>Transaction Status Query</SectionHeading>

        <Callout type="info" title="Endpoint">
          POST /TYLERSOFT_VPS_ADAPTOR/QueryStatus
        </Callout>

        <CodeBlock
          language="json"
          code={`{
  "TransactionId":"011217203BPC45",
  "ClientId":"1005"
}`}
        />
      </ContentCard>

      {/* Response Codes */}
      <ContentCard>
        <SectionHeading>Response Codes</SectionHeading>

        <ul className="space-y-2">
          <li><strong>00</strong> - Successful</li>
          <li><strong>99</strong> - Failed</li>
          <li><strong>20</strong> - Pending Processing</li>
        </ul>
      </ContentCard>

    </div>
  )
}