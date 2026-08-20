// app/hooks/useGenerateInvoice.ts

import { useMutation } from '@tanstack/react-query';

interface GenerateInvoiceParams {
  listingLink: string;
}

export function useGenerateInvoice() {
  const query = useMutation({
    mutationFn: async ({ listingLink }: GenerateInvoiceParams) => {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingLink }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate invoice');
      }

      return response.blob();
    },
  });
  return query
}