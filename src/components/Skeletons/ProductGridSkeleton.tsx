import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
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
  );
};

export default ProductGridSkeleton;
