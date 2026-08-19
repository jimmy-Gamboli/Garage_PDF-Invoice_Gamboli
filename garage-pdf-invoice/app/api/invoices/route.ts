import Mustache from 'mustache';
import { chromium } from 'playwright';
import fs from "fs"
import axios from 'axios';
import { generatePDF } from '@/app/lib/utils/generatePDF';


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