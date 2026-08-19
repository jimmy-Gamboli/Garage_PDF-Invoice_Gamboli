import { MantineProvider, } from "@mantine/core";
import { InvoiceForm } from "./components/InvoiceForm";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <main className="text-black" >
        <MantineProvider>
          <InvoiceForm />
        </MantineProvider>
      </main>
    </div>
  );
}
