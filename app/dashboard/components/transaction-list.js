'use client'
import Button from "@/components/button"
import Separator from "@/components/separator"
import TransactionItem from "@/components/transaction-item"
import TransactionSummaryItem from "@/components/transaction-summary-item"
import { fetchTransaction } from "@/lib/actions"
import { groupAndSumTransactionsByDate } from "@/lib/utils"
import { useState } from "react"


export default async function TransactionList({ range, initialTransaction }) {
  const [transactions, setTransactions] = useState(initialTransaction)
  const [offset, setoffset] = useState(initialTransaction.length)
  const grouped = groupAndSumTransactionsByDate(transactions)
  const handleChange = async (e) => {
    const nextTransaction = await fetchTransaction(range, offset, 10)
    setoffset(prevValue => prevValue + 10)
    setTransactions(prevTransactions => [
      ...prevTransactions,
      ...nextTransaction
    ])
  }
  return (
    <div className="space-y-8">
      {Object.entries(grouped)
        .map(([date, { transactions, amount }]) =>
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Separator />
            <section className="space-y-4">
              {transactions.map(transaction => 
                <div key={transaction.id}>
                  <TransactionItem {...transaction} />
                </div>
              )}
            </section>
          </div>
        )
      }
      <div className="flex justify-between">
        <Button variant='ghost' onClick={handleChange}>Load More</Button>
      </div>
    </div>
  )
}