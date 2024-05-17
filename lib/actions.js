'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "./superbase/server"
import { transactionSchema } from "./validation"

export async function createTransaction(formData) {
    
    const validate = transactionSchema.safeParse(formData)
    if (!validate.success) {
        throw new Error("Wrong from client")
    }

    const { error } = await createClient().from('transaction').insert(validate.data)
    if (error) {
        throw new Error("Failed")
    }

    revalidatePath('/dashboard')
}

export async function fetchTransaction(range, offset = 0, limit = 0) {
    const supabase = createClient()
    let { data, error } = await supabase
    .rpc('fetch_transactions', {
        limit_arg: limit, 
        offset_arg: offset, 
        range_arg: range
    })
    if (error) throw new Error("WE cant fetch transactions")
    return data
}