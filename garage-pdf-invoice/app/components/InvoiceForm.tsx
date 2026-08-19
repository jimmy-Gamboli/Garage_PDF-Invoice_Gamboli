// app/components/InvoiceForm.tsx

'use client';

import { Button, TextInput, Stack, Radio } from '@mantine/core';
import { useState } from 'react';

export function InvoiceForm() {
  const [listingLink, setListingLink] = useState('');

  const [action,setAction] = useState<"download"|"open">("open")

  async function createInvoice() {
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingLink,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }

     const pdf = await response.blob();

  const url = URL.createObjectURL(pdf);

   if (action === 'open') {
      window.open(url, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invoice.pdf';
      link.click();
    }
  }

  return (
    <Stack>
      <TextInput
        label="VehicleId"
        value={listingLink}
        onChange={(event) => setListingLink(event.currentTarget.value)}
      />

       <Radio.Group
        label="After generating invoice"
        value={action}
        onChange={(value) => setAction(value as 'open' | 'download')}
      >
        <Stack mt="xs">
          <Radio value="open" label="Open in new tab" />
          <Radio value="download" label="Download PDF" />
        </Stack>
      </Radio.Group>

      <Button onClick={createInvoice}>
        Create Invoice
      </Button>
    </Stack>
  );
}