This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## Getting Started

First, install the dependencies, including the Playwright Chromium browser
```
npm install
npx playwright install chromium
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Basic File Structure
- [`app/api/invoices`](app/api/invoices/route.ts) - Housed the api route used to generate an invoice
- [`app/componenets/InvoiceForm`](app/components/InvoiceForm.tsx) - Main component that has all the input, radio groups, and buttons associated with the project and its stylings. Most components and stylings are from Mantine
- [`app/hooks/useGenerateInvoice.ts`](app/hooks/useGenerateInvoice.ts) - Hook used by the `invoiceForm.tsx` to send a POST request to the backend and generate the invoice
- `lib` folder - Houses various utilities used by the project including return types from shopGarage api responses, a HTML template for the PDF invoice, and a helper function that inserts the listing details into the invoice with Mustache



