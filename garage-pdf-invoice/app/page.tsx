'use client'
import { MantineProvider, } from "@mantine/core";
import { InvoiceForm } from "./components/InvoiceForm";
import { useState } from "react";
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function Home() {
  const [queryClient] = useState(()=> new QueryClient)

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <main className="text-black w-full" >
        <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <InvoiceForm />
        </MantineProvider>
        </QueryClientProvider>
      </main>
    </div>
  );
}
