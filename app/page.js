import { Suspense } from "react";
import TransactionList from "./dashboard/components/transaction-list";
import TransactionListFallback from "./dashboard/components/transaction-list-fallback";
import Trend from "./dashboard/components/trend";
import Trendfallback from "./dashboard/components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { createClient } from "@/lib/superbase/server";

export default async function Home() {
  
  const client = createClient()
  console.log(await client.from('transaction').select())

  return (
    <>
      <section className="mb-8">
        <h1 className="text-4xl font-semibold">Summary</h1>
      </section>

      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">"""</section>

      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transaction</h2>
        <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sa']}`}>
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<Trendfallback />}>
          <Trend type="Income" />
        </Suspense>
        <Suspense fallback={<Trendfallback />}>
          <Trend type="Expense" />
        </Suspense>
        <Suspense fallback={<Trendfallback />}>
          <Trend type="Saving" />
        </Suspense>
        <Suspense fallback={<Trendfallback />}>
          <Trend type="Investment" />
        </Suspense>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
