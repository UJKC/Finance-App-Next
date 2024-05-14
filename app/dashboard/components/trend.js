import BaseTrend from "@/components/trend";
import { createClient } from "@/lib/superbase/server";

export default async function Trend({ type, range }) {
    const supabase = createClient()
    let { data, error } = await supabase
    .rpc('calculate_total', {
        range_arg: range, 
        type_arg: type
      })
    if (error) console.log(error)

    const amount = data[0]
  
    console.log(data)
  
    return <BaseTrend type={type} amount={amount.current_amount} prevAmount={amount.previous_amount} />
  }
