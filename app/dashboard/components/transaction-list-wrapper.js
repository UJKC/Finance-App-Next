import { fetchTransaction } from "@/lib/actions"
import TransactionList from "./transaction-list"

export default function TransactionListWrapper({range}) {
    const transaction = fetchTransaction(range)
    return <TransactionList initialTransaction={transaction} />
}