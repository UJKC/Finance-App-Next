'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "./select";

export default function Range() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const range = searchParams.get('range') ?? 'last30days'

    const handleChange = (e) => {
        const params = new URLSearchParams()
        params.set('range', e.target.value)
        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <Select defaultValue={range} onChange={handleChange}>
            <option value="last24hours">Last 24 hours</option>
            <option value='Last7days'>Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="Last12months">Last 12 Months</option>
        </Select>
    )
}