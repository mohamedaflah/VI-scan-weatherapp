import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const cityFormSchema = z.object({
  cityname: z
    .string()
    .nonempty({ message: "Cityname is required" })
    .min(2)
    .max(122),
});
export function CityAddModal() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof cityFormSchema>>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: {
      cityname: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const submitCityForm = (values: z.infer<typeof cityFormSchema>) => {
    values;
  };
  return (
    <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
      <AlertDialogTrigger>
        {" "}
        <div className="size-10 border rounded-2xl flex items-center justify-center cursor-pointer">
          <Plus className="w-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex justify-between">
            <AlertDialogTitle>Add city</AlertDialogTitle>
            <AlertDialogCancel className="border-none p-0 m-0 h-auto">
              <X className="w-5" />
            </AlertDialogCancel>
          </div>

          <AlertDialogDescription className="flex flex-col relative">
            please add new city
            <form
              className="w-full flex flex-col mt-2 gap-3"
              onSubmit={handleSubmit(submitCityForm)}
            >
              <div className="flex flex-col gap-1">
                <Input
                  className=""
                  value={watch("cityname")}
                  placeholder="City name"
                  onChange={(e) => {
                    setValue("cityname", e.target.value);
                    trigger("cityname");
                  }}
                />
                <span className="text-sm text-red-600">
                  {errors && errors.cityname && errors.cityname.message}
                </span>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-400">Submit</Button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
