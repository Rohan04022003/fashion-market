import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

const LoadingSkeleton = () => {
    return (
        <div>
            <div className="flex items-center justify-center w-full py-3">
                <Skeleton className="sm:w-11/12 w-12/13 sm:h-[400px] h-[200px] rounded-md dark:bg-zinc-800" />
            </div>
            <div>
                <div className="flex flex-col items-center justify-center gap-4 w-full py-3">
                    <Skeleton className="w-[20%] h-4 rounded-md dark:bg-zinc-800" />
                    <Skeleton className="w-[45%] h-6 rounded-md dark:bg-zinc-800" />
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-1 py-3 lg:px-16 px-4 gap-4">
                    {
                        Array.from({ length: 9 }).map((_, index) => (
                            <Skeleton key={index} className={`w-full h-48 rounded-md dark:bg-zinc-800 ${index > 3 ? "sm:block hidden": ""}`} />
                        ))
                    }
                </div>
                <div className=" px-2 sm:px-8 md:px-16 py-5">
                    <Skeleton className="w-[40%] h-6 rounded-md" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-2 sm:px-8 md:px-16">
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <Card key={idx} className="p-0 rounded-[5px] shadow-none overflow-hidden">
                            <div className="h-60 w-full dark:bg-zinc-800">
                                <Skeleton className="h-full w-full rounded-[5px]" />
                            </div>

                            <CardHeader className="p-2 py-2 border-t space-y-2">
                                <div className="w-full flex justify-between items-center">
                                    <Skeleton className="h-4 w-16 rounded-[4px] dark:bg-zinc-800" />
                                    <Skeleton className="h-4 w-12 rounded-[4px] dark:bg-zinc-800" />
                                </div>

                                <CardDescription>
                                    <Skeleton className="h-4 w-[70%] rounded-[5px] dark:bg-zinc-800" />
                                </CardDescription>

                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-md">
                                        <Skeleton className="h-5 w-24 rounded-[5px] dark:bg-zinc-800" />
                                    </CardTitle>
                                    <Skeleton className="h-8 w-8 rounded-[5px] dark:bg-zinc-800" />
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default LoadingSkeleton