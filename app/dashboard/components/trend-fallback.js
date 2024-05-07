import Skeleton from "@/components/skeleton";

export default function Trendfallback() {
    return(
        <div className="space-y-5 w-3/5 lg:w-5/6">
            <div className={`font-semibold`}><Skeleton /></div>
            <div className="font-semibold text-black dark:text-white mb-2">
                <Skeleton />
            </div>
            <div className="flex space-x-1 text-sm">
                <Skeleton />
                
            </div>
        </div>
    )
}