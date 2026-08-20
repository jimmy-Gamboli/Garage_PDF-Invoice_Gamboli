import Mustache from "mustache";
import { chromium as playwright } from "playwright-core";
import chromium from "@sparticuz/chromium";
import fs from "fs"

export const runtime = "nodejs";

export async function generatePDF(listingDetails: Listing) {

  const template = fs.readFileSync(`${process.cwd()}/app/lib/templates/invoice.html`, 'utf-8')

  // Generate invoice HTML
  const html = Mustache.render(template, listingDetails)



  // Generate PDF
  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html);

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
    });


    return pdf
  } finally {
    await browser.close();
  }

}