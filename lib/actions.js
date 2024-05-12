'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "./superbase/server"

export async function createTransaction(formData) {
    const { error } = await createClient().from('transaction').insert(formData)
    if (error) {
        throw new Error("Failed")
    }

    revalidatePath('/dashboard')
}