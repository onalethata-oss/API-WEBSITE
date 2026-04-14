"use client"

import { ContentCard, SectionHeading, SubHeading, Callout } from "@/components/content-card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen, ArrowRight, ExternalLink } from "lucide-react"

export function APIDocumentation() {
  return (
    <div className="space-y-6">
      {/* Page Header Card */}
      <ContentCard className="bg-gradient-to-r from-electric-blue/5 to-electric-orange/5 border-electric-blue/20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-electric-blue text-white">API Documentation</Badge>
              <Badge variant="outline" className="border-electric-orange text-electric-orange">v2.1</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tylersoft Card Processor API
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              The Tylersoft Payment API provides functionality for payment processing for authorization, 
              capture and settlement of card transactions worldwide. This guide describes the tasks you 
              must complete on your application to send a successful request to TCP.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground shrink-0">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-electric-blue" />
              <span>Last updated: May 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-electric-blue" />
              <span>Author: Gaonyadiwe Gaboiphiwe</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-electric-blue" />
              <span>20 min read</span>
            </div>
          </div>
        </div>
      </ContentCard>

      {/* Introduction Section */}
      <ContentCard id="tcp-introduction">
        <SectionHeading>Introduction</SectionHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          The Tylersoft Payment API provides functionality for payment processing for authorization, capture 
          and settlement of card transactions worldwide. You can use the API documentation to integrate into 
          our different endpoints. This guide is written for application developers who want to use 
          Tylersoft&apos;s Card Processor (TCP) to integrate to their relevant systems for card payment.
        </p>
        
        <Callout type="info" title="Purpose">
          This guide describes the tasks you must complete on your application in order to be able to 
          send a successful request to TCP.
        </Callout>

        <SubHeading>Contact Information</SubHeading>
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <p className="text-foreground/90 text-sm mb-2">
            <strong>Tylersoft (Pty) Ltd</strong>
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Plot 75782, Pinnacle Park, Setlhoa Village, Gaborone</li>
            <li>Private Bag BO 70, Gaborone, Botswana</li>
            <li>Tel: +(267) 3951798 | Fax: +(267) 3951898</li>
            <li>Email: enquiries@tylersoft.net</li>
          </ul>
        </div>
      </ContentCard>

      {/* Requirements Section */}
      <ContentCard id="tcp-requirements">
        <SectionHeading>Requirements</SectionHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          For your organization to be setup in TCP, Tylersoft will require the following information:
        </p>

        <ul className="list-none space-y-2 mb-4">
          {[
            "Organization email",
            "Post Back URL (callback URL for transaction status)",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-foreground/90">
              <ArrowRight className="h-4 w-4 text-electric-orange mt-1 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Callout type="warning" title="Important">
          Contact Tylersoft to obtain your unique organization key which will be used for authkey generation.
        </Callout>
      </ContentCard>

      {/* Authkey Generation Section */}
      <ContentCard id="authkey-generation">
        <SectionHeading>Authkey Generation</SectionHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          This simply adds a level of security to ensure that only an authorized organization is able to 
          send a transaction to TCP. The authkey submitted for transaction processing should be constructed 
          using the following format:
        </p>

        <CodeBlock
          language="text"
          title="Authkey Format"
          code={`Sha512(base64(key + tranid + amount + timestamp + phone))`}
        />

        <SubHeading>Parameters</SubHeading>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">key</td>
                <td className="py-3 px-4 text-muted-foreground">Unique organization key (provided by Tylersoft)</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">tranid</td>
                <td className="py-3 px-4 text-muted-foreground">Unique transaction ID</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">amount</td>
                <td className="py-3 px-4 text-muted-foreground">The amount to be debited</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">timestamp</td>
                <td className="py-3 px-4 text-muted-foreground">Transaction request time</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">phone</td>
                <td className="py-3 px-4 text-muted-foreground">Card holder&apos;s phone number</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubHeading>Example</SubHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Given the following values:
        </p>

        <CodeBlock
          language="text"
          title="Example Values"
          code={`key = !@#$%^&*()~_+}{?
tranid = 1919091
amount = 3
timestamp = 2017-01-22 03:41:02+0000
phone = 254721765451`}
        />

        <p className="text-foreground/90 leading-relaxed my-4">
          The base64 of the concatenated string:
        </p>

        <CodeBlock
          language="text"
          title="Base64 Result"
          code={`IUAjJCVeJiooKX5fK317PzE5MTkwOTEzMjAxNy0wMS0yMiAwMzo0MTowMiswMDAwMjU0NzIxNzY1NDUx`}
        />

        <p className="text-foreground/90 leading-relaxed my-4">
          The SHA512 hash of the base64 string (final authkey):
        </p>

        <CodeBlock
          language="text"
          title="Final Authkey (SHA512)"
          code={`0105FC3963F29C1DCA74229D499E79CD9DB0D0FDF32B203676FD802CC9191727FE3166A80D95DD8893512531F37E59FB7DA853849DFA9DAAFC4AD49821C71529`}
        />

        <Callout type="warning" title="Security Notice">
          The control key should NOT be included anywhere in the JSON request or any other form of 
          submission to TCP. This would compromise the security of the control key and could possibly 
          allow for outsiders to view or capture the control.
        </Callout>
      </ContentCard>

      {/* Device Finger-Print Section */}
      <ContentCard id="device-fingerprint">
        <SectionHeading>Device Finger-Print (Device Data Collection)</SectionHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          This API functionality is used for collecting information about the device that the customer 
          is using to transact. TCP will respond with a device collection URL and access token that 
          the client would use to send device data to the issuing bank.
        </p>

        <SubHeading>Sample Request</SubHeading>
        <CodeBlock
          language="json"
          title="Device Data Collection Request"
          code={`{
  "tranid": "2025-05-01 09:25:41",
  "country": "Botswana",
  "amount": "1",
  "authkey": "6dc8ed3910b0799293799efe9a6720d6c397c6930a630c349afe7d58a1c426d80b3d81074e11dd77b8cda54069d8e0b83b900a2368ea5b48c3fdbcbfb1a36645",
  "firstname": "Gao",
  "card_number": "4111111111111111",
  "org": "tylersoft_eclectics",
  "card_expiration_year": "2025",
  "Serviceid": "1010",
  "secondname": "Gabo",
  "card_cvNumber": "123",
  "card_cardType": "001",
  "processingcode": "000010",
  "phone": "26774374154",
  "card_expiration_month": "12",
  "currency": "BWP",
  "email": "ggaboiphiwe@outlook.com",
  "timestamp": "2025-04-16 21:47:48"
}`}
        />

        <Callout type="info" title="Endpoint URL">
          <code className="bg-muted px-2 py-0.5 rounded text-electric-blue font-mono text-sm">
            https://domain:port/tcp/api/deviceData-Collection
          </code>
        </Callout>

        <SubHeading>Sample Response</SubHeading>
        <CodeBlock
          language="json"
          title="Device Data Collection Response"
          code={`{
  "statuscode": "00",
  "tranid": "2025-05-01 09:25:41",
  "statusmessage": "COMPLETED",
  "id": "7464578125406450604807",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "deviceDataCollectionUrl": "https://centinelapistag.cardinalcommerce.com/V1/Cruise/Collect",
  "referenceId": "ebd3166d-04ab-40b8-abbf-24712612acdc"
}`}
        />

        <SubHeading>Frontend Implementation</SubHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Device Data Collection is initiated on the front end after you receive the device data collection 
          reply. A hidden iframe is rendered to the browser in order to profile the customer device. Upon 
          receiving the device collection details, initiate a form POST in a hidden iframe:
        </p>

        <CodeBlock
          language="html"
          title="Hidden Iframe for Device Data Collection"
          code={`<iframe name="ddc-iframe" height="1" width="1" style="display: none;"></iframe>
<form id="ddc-form" target="ddc-iframe" method="POST" action="<<deviceDataCollectionUrl>>">
  <input type="hidden" name="JWT" value="<<accessToken>>" />
</form>`}
        />

        <SubHeading>Event Listener</SubHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          After device data collection has completed, an event will be generated. You will need to trap 
          this event. Place the JavaScript after the closing &lt;/body&gt; element:
        </p>

        <CodeBlock
          language="javascript"
          title="Event Listener for Device Data Collection"
          code={`<script>
window.addEventListener("message", (event) => {
  // {MessageType: "profile.completed", SessionId: "0_57f063fd-659a-4779-b45b-9e456fdb7935", Status: true}
  
  // Test environment
  if (event.origin === "https://centinelapistag.cardinalcommerce.com") {
    let data = JSON.parse(event.data);
    console.log('Merchant received a message:', data);
    
    if (data !== undefined && data.Status) {
      // Device data collection completed successfully
      // Proceed with payment request
      console.log('Device profiling completed');
    }
  }
  
  // Production environment: https://centinelapi.cardinalcommerce.com
}, false);
</script>`}
        />

        <Callout type="info" title="Environment URLs">
          <ul className="text-sm space-y-1 mt-2">
            <li><strong>Test:</strong> https://centinelapistag.cardinalcommerce.com</li>
            <li><strong>Production:</strong> https://centinelapi.cardinalcommerce.com</li>
          </ul>
        </Callout>
      </ContentCard>

      {/* Payment Section */}
      <ContentCard id="tcp-payment">
        <SectionHeading>Payment</SectionHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          This API function is used to complete the payment. Upon receiving the payment request from the 
          client, TCP will respond with the payer authentication URL and access token that the client 
          would need to redirect the customer to so that they can input the OTP they received from the 
          issuing bank.
        </p>

        <Callout type="warning" title="Important">
          The client should NOT run this service before running the device data collection call because 
          one of the request parameters for Payment API requires the <code className="font-mono">referenceId</code> which 
          was returned from the Device Data Collection response.
        </Callout>

        <SubHeading>Sample Request</SubHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          The request parameters should be similar to the Device Data Collection call, but with additional 
          Device Data parameters:
        </p>

        <CodeBlock
          language="json"
          title="Payment Request"
          code={`{
  "tranid": "2025-05-01 09:25:41",
  "country": "Botswana",
  "amount": "1",
  "cbyreferenceId": "ebd3166d-04ab-40b8-abbf-24712612acdc",
  "authkey": "6dc8ed3910b0799293799efe9a6720d6c397c6930a630c349afe7d58a1c426d80b3d81074e11dd77b8cda54069d8e0b83b900a2368ea5b48c3fdbcbfb1a36645",
  "firstname": "Gao",
  "card_number": "4111111111111111",
  "org": "tylersoft_eclectics",
  "card_expiration_year": "2025",
  "Serviceid": "1010",
  "secondname": "Gabo",
  "card_cvNumber": "123",
  "card_cardType": "001",
  "processingcode": "000010",
  "phone": "26774374154",
  "card_expiration_month": "12",
  "currency": "BWP",
  "email": "ggaboiphiwe@outlook.com",
  "timestamp": "2025-04-16 21:47:48",
  "ipAddress": "123.45.65.20",
  "httpAcceptContent": "test",
  "httpBrowserLanguage": "en_us",
  "httpBrowserJavaEnabled": "false",
  "httpBrowserJavaScriptEnabled": "false",
  "httpBrowserColorDepth": "24",
  "httpBrowserScreenHeight": "100000",
  "httpBrowserScreenWidth": "100000",
  "httpBrowserTimeDifference": "300",
  "userAgentBrowserValue": "GxKnLy8TFDUFxJP1t"
}`}
        />

        <Callout type="info" title="Endpoint URL">
          <code className="bg-muted px-2 py-0.5 rounded text-electric-blue font-mono text-sm">
            https://domain:port/tcp/api/request
          </code>
        </Callout>

        <SubHeading>Sample Response</SubHeading>
        <CodeBlock
          language="json"
          title="Payment Response (Authentication Required)"
          code={`{
  "pareq": "eyJtZXNzYWdlVHlwZSI6IkNSZXEi...",
  "pastepup": "https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "PENDING_AUTHENTICATION",
  "statusCode": "001"
}`}
        />

        <SubHeading>Step-Up Authentication</SubHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          If authentication is required (TCP will respond with the message <code className="font-mono bg-muted px-1 rounded">PENDING_AUTHENTICATION</code>), 
          the client must initiate step-up authentication. This is done by creating an iframe to send a POST 
          request to the step-up URL:
        </p>

        <CodeBlock
          language="html"
          title="Step-Up Authentication Iframe"
          code={`<iframe name="step-up-iframe" height="400" width="400" style="display: none;"></iframe>
<form id="step-up-form" target="step-up-iframe" method="post" action="<<pastepup value>>">
  <input type="hidden" name="JWT" value="<<accessToken value>>" />
  <input type="hidden" name="MD" value="<<optional merchant data - returned as is>>" />
</form>`}
        />

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">Form POST Action</td>
                <td className="py-3 px-4 text-muted-foreground">The <code className="font-mono">pastepup</code> field returned by TCP</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">JWT</td>
                <td className="py-3 px-4 text-muted-foreground">The <code className="font-mono">accessToken</code> field returned by TCP</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-electric-blue">MD</td>
                <td className="py-3 px-4 text-muted-foreground">Optional merchant-defined data (returned in the response)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="No Authentication Required">
          If the issuing bank does not require further authentication, the transaction would be processed 
          without having to redirect the customer to the authentication page. In this case, TCP will send 
          the final status via a callback.
        </Callout>
      </ContentCard>

      {/* Final Transaction Status Section */}
      <ContentCard id="final-status">
        <SectionHeading>Final Transaction Status</SectionHeading>
        <p className="text-foreground/90 leading-relaxed mb-4">
          The final transaction status will be delivered to the client via a callback to the URL that the 
          client would need to provide. Upon receiving the callback, the client should reply with an 
          acknowledgement to confirm that the callback was received.
        </p>

        <SubHeading>Sample Callback to Client</SubHeading>
        <CodeBlock
          language="json"
          title="Callback from TCP"
          code={`{
  "statuscode": "100",
  "tranid": "2025-05-01 09:25:41",
  "status": "Request was processed successfully"
}`}
        />

        <SubHeading>Sample ACK Reply from Client</SubHeading>
        <CodeBlock
          language="json"
          title="Acknowledgement Response"
          code={`{
  "statuscode": "00",
  "tranid": "2025-05-01 09:25:41"
}`}
        />

        <Callout type="info" title="Status Codes">
          <ul className="text-sm space-y-1 mt-2">
            <li><strong>00:</strong> Success / Acknowledgement received</li>
            <li><strong>001:</strong> Pending Authentication</li>
            <li><strong>100:</strong> Request processed successfully</li>
          </ul>
        </Callout>
      </ContentCard>

      {/* Footer Navigation */}
      <ContentCard className="bg-muted/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Was this article helpful?</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm bg-electric-blue/10 text-electric-blue rounded-md hover:bg-electric-blue/20 transition-colors">
                Yes, thanks!
              </button>
              <button className="px-4 py-1.5 text-sm bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors">
                Not really
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a href="https://tylersofteclectics.net/contacts/" className="flex items-center gap-1 text-electric-blue hover:underline">
              Contact Support
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}
