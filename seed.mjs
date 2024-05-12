import dotenv from "dotenv"
import {faker} from "@faker-js/faker"
import { createClient } from '@supabase/supabase-js'

dotenv.config({path: '.env.local'})

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
)

const categories = [
    'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
]

async function seed() {
    let transactions = []
    for (let i = 0; i < 10; i++) {
        const created_at = faker.date.past()
        let type, category = null

        const typeBias = Math.random()
        if (typeBias > 0.80) {
            type = 'Expense'
            category = faker.helpers.arrayElement(categories)
        }
        else if (typeBias > 0.90) {
            type = 'Income'
        }
        else {
            type = faker.helpers.arrayElement(['Saving', 'Investment'])
        }

        let amount;
        switch(type) {
            case 'Income': amount = faker.number.int({min: 2000, max: 9000})
            break
            case 'Expense': amount = faker.number.int({min: 10, max: 1000})
            break
            case 'Investment': amount = faker.number.int({min: 10, max: 1000})
            break
            case 'Saving': amount = faker.number.int({min: 3000, max: 10000})
            break
        }

        transactions.push({
            created_at, amount, type, description: faker.lorem.sentence(), category
        })
    }

    
    const { data, error } = await supabase.from('transaction').insert(transactions).select()

    if (error) {
        console.log(error)
    }
    else {
        console.log("Data inserted: " + data)
    }
        
}

seed().catch(console.error)