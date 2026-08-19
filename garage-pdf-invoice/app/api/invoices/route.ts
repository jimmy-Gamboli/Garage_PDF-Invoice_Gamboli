import Mustache from 'mustache';
import { chromium } from 'playwright';
import fs from "fs"
import axios from 'axios';


export async function POST(request: Request) {
  try {
    const { vehicleId } = await request.json();

    if (!vehicleId) {
      return Response.json(
        { error: 'UUID is required' },
        { status: 400 }
      );
    }

   

    const listingResponse = await axios.get<Listing>(`https://api.shopgarage.com/listings/${vehicleId}`)

    console.log(listingResponse)

    if (listingResponse.status!==200) {
      return Response.json(
        { error: 'Failed to fetch listing' },
        { status: listingResponse.status }
      );
    }

    const listing = await listingResponse.data;

    console.log(listing.listingTitle)



    const template = fs.readFileSync(`${process.cwd()}/app/lib/templates/invoice.html`,'utf-8')

    // Generate invoice HTML
    const html = Mustache.render(template,listing)

    

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