import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6",
        "max-w-[1198px] lg:max-w-[1248px] xl:max-w-[1298px] 2xl:max-w-[1348px] 3xl:max-w-[1488px] 4xl:max-w-[1888px]",
        className
      )}
    >
      {children}
    </div>
  );
}
