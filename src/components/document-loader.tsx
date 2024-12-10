import { Skeleton } from "./ui/skeleton";

export const DocumentLoader = () => {
  return (
    <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
      <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow  overflow-hidden pt-[8%] px-[12%]">
        <Skeleton className="h-[2.1%] mb-[5%]" />
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-[1.4%] ${
              index % 5 === 4 ? "w-[70%] mb-[5%]" : ""
            }  mt-[2%]`}
          />
        ))}
      </div>
    </div>
  );
};
