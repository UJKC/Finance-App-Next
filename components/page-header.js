import Link from "next/link";
import { Children } from "react";

export default function PageHeader() {
    return(
        <header className={`flex justify-between items-center ${Children}`}>
            <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance App</Link>

            <div className="flex items-center space-x-4">
                <div>Mode Toggle</div>
                <div>User Dropdown</div>
            </div>
        </header>
    )
}