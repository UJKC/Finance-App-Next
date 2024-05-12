'use server'

import { revalidateTag } from "next/cache"
import { createClient } from "./superbase/server"

export async function purgeTransactionListCache() {
    revalidateTag('transaction-List')
}

export async function createTransaction(formData) {
    console.log(formData)
    const { error } = await createClient().from('transaction').insert(formData)
}