import { Suspense } from "react";
import TransactionList from "./dashboard/components/transaction-list";
import TransactionListFallback from "./dashboard/components/transaction-list-fallback";

export default function Home() {
  return (
    <>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
