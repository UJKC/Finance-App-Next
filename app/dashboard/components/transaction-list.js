'use client'
import Button from "@/components/button"
import Separator from "@/components/separator"
import TransactionItem from "@/components/transaction-item"
import TransactionSummaryItem from "@/components/transaction-summary-item"
import { fetchTransaction } from "@/lib/actions"
import { groupAndSumTransactionsByDate } from "@/lib/utils"
import { useState } from "react"
import { Loader } from "lucide-react"


export default async function TransactionList({ range, initialTransaction }) {
  const [transactions, setTransactions] = useState(initialTransaction)
  const [offset, setoffset] = useState(initialTransaction.length)
  const [buttonHidden, setButtonHidden] = useState(initialTransaction.length == 0)
  const [loading, setLoading] = useState(false)
  const grouped = groupAndSumTransactionsByDate(transactions)
  const handleChange = async (e) => {
    setLoading(true)
    let nextTransaction = null
    try {
      nextTransaction = await fetchTransaction(range, offset, 10)
      setoffset(prevValue => prevValue + 10)
      setButtonHidden(nextTransaction.length == 0)
      setTransactions(prevTransactions => [
        ...prevTransactions,
        ...nextTransaction
      ])
    }
    finally {
      setLoading(false)
    }
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
      {transactions.length == 0 && <div className="text-center text-gray-400 dark:text-gray-500">No mire transactions found</div>}
      {!buttonHidden && <div className="flex justify-between">
        <Button variant='ghost' onClick={handleChange} disabled={loading} >
          <div className="flex items-center space-x-1">
            {loading && <Loader>
              <div>Load More</div>
            </Loader>}
          </div>
        </Button>
      </div>}
    </div>
  )
}