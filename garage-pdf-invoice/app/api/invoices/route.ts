import Mustache from 'mustache';
import { chromium } from 'playwright';
import fs from "fs"


export async function POST(request: Request) {
  try {
    const { vehicleId } = await request.json();

    if (!vehicleId) {
      return Response.json(
        { error: 'UUID is required' },
        { status: 400 }
      );
    }

    // Fetch listing
    const listingResponse = await fetch(
      `https://api.shopgarage.com/listings/${vehicleId}`
    );

    if (!listingResponse.ok) {
      return Response.json(
        { error: 'Failed to fetch listing' },
        { status: listingResponse.status }
      );
    }

    const listing = await listingResponse.json();

    const template = fs.readFileSync(`${__dirname}/../lib/templates/invoice.html`,'utf-8')

    // Generate invoice HTML
    const html = Mustache.render(template,listing.listingTitle)

    // Generate PDF
    const browser = await chromium.launch();

    try {
      const page = await browser.newPage();

      await page.setContent(html);

      const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
      });


      return new Response(new Uint8Array(pdf), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="invoice.pdf"',
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('Invoice generation failed:', error);

    return Response.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    );
  }
}