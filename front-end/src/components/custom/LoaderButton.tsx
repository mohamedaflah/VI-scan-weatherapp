import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { LoaderCircle } from "lucide-react";

interface ChildProp {
  children: ReactNode;
  loading: boolean;
  className?: string;
  type: "submit" | "button";
}
export const LoaderButton = ({
  children,
  loading,
  type,
  className,
}: ChildProp) => {
  return (
    <Button
      className={cn(
        "w-full bg-blue-400 flex gap-2 hover:bg-blue-500",
        {
          "pointer-events-none ": loading,
        },
        className
      )}
      type={type}
    >
      {children}
      {loading && (
        <>
          <LoaderCircle className="w-5 animate-spin" />{" "}
        </>
      )}
    </Button>
  );
};
