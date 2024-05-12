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