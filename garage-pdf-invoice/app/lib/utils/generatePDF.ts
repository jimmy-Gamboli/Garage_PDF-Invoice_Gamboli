import Mustache from "mustache";
import { chromium } from "playwright";
import fs from "fs"

export async function generatePDF(listingDetails:Listing){

     const template = fs.readFileSync(`${process.cwd()}/app/lib/templates/invoice.html`,'utf-8')
    
        // Generate invoice HTML
        const html = Mustache.render(template,listingDetails)
    
        
    
        // Generate PDF
        const browser = await chromium.launch();
    
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