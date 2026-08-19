
import axios from 'axios';
import { generatePDF } from '@/app/lib/utils/generatePDF';


export async function POST(request: Request) {
  try {
    const { listingLink } = await request.json();

    if (!listingLink) {
      return Response.json(
        { error: 'UUID is required' },
        { status: 400 }
      );
    }

    // example listing link https://www.shopgarage.com/listing/2007-Pierce-Dash-Pumper-5d123316-f36a-4a67-83cb-26e341d3484e
    const match = listingLink.match(
      /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i
    );

    const vehicleId = match?.[1];

    const listingResponse = await axios.get<Listing>(`https://api.shopgarage.com/listings/${vehicleId}`)

    console.log(listingResponse)

    if (listingResponse.status !== 200) {
      return Response.json(
        { error: 'Failed to fetch listing' },
        { status: listingResponse.status }
      );
    }

    const listing = await listingResponse.data;


    const pdf = await generatePDF(listing)


    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice.pdf"',
      },
    });

  } catch (error) {
    console.error('Invoice generation failed:', error);

    return Response.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    );
  }
}