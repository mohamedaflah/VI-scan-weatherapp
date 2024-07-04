import { ChangeEvent } from "react";
import { Input } from "../ui/input";

interface ChildProp {
  label: string;
  placeholder?: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
}
export const InputWithLabel = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  errorMessage,
}: ChildProp) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className="text-gray-600 text-[15px]">
        {label}
      </label>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="border-gray-400"
      />
      <span className="text-sm text-red-600">{errorMessage}</span>
    </div>
  );
};
