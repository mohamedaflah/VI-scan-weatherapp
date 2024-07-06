import { useEffect, useState } from "react";
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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderButton } from "../custom/LoaderButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addCity } from "../../redux/actions/cityActions/addCityAction";
import { isValidCity } from "../../util/validateCity";
import toast from "react-hot-toast";
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
    reset,
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
  const { loading, user } = useSelector((state: RootState) => state.user);
  const [closeOption, setClosOption] = useState<boolean>(true);
  useEffect(() => {
    if (user && user.favouriteCities && user?.favouriteCities?.length <= 0) {
      setModalOpen(true);
      setClosOption(false);
    } else {
      setModalOpen(false);
    }
  }, [user]);
  const dispatch: AppDispatch = useDispatch();
  const submitCityForm = async (values: z.infer<typeof cityFormSchema>) => {
    const cityValid = await isValidCity(values.cityname);
    if (!cityValid) {
      return toast.error("City is not valid");
    }
    dispatch(
      addCity({ cityname: values.cityname, userId: user?.id as string })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        setModalOpen(false);
        setClosOption(true);
        reset({
          cityname: "", // New default value or initial value for cityname
        });
      }
    });
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
            {closeOption && (
              <>
                <AlertDialogCancel className="border-none p-0 m-0 h-auto">
                  <X className="w-5" />
                </AlertDialogCancel>
              </>
            )}
          </div>

          <AlertDialogDescription className="flex flex-col relative">
            Please add new city
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
              <LoaderButton
                className="bg-blue-500 hover:bg-blue-400"
                loading={loading}
                type="submit"
              >
                Submit
              </LoaderButton>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
