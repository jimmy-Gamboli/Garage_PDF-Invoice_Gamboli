// app/components/InvoiceForm.tsx

'use client';

import { Button, TextInput, Stack } from '@mantine/core';
import { useState } from 'react';

export function InvoiceForm() {
  const [vehicleId, setVehicleId] = useState('');

  async function createInvoice() {
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vehicleId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }

     const pdf = await response.blob();

  const url = URL.createObjectURL(pdf);

  window.open(url, '_blank');
  }

  return (
    <Stack>
      <TextInput
        label="VehicleId"
        value={vehicleId}
        onChange={(event) => setVehicleId(event.currentTarget.value)}
      />

      <Button onClick={createInvoice}>
        Create Invoice
      </Button>
    </Stack>
  );
}