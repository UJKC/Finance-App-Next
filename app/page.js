import { Suspense } from "react";
import TransactionList from "./dashboard/components/transaction-list";
import TransactionListFallback from "./dashboard/components/transaction-list-fallback";
import Trend from "./dashboard/components/trend";
import Trendfallback from "./dashboard/components/trend-fallback";

export default function Home() {
  return (
    <>
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
