import { Eye, EyeOff } from "lucide-react";
import { LoaderButton } from "../components/custom/LoaderButton";
import { Input } from "../components/ui/input";
import { InputWithLabel } from "../components/custom/InputwithLabel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signupFormSchema } from "../Schema/singupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const submitSignup = (values: z.infer<typeof signupFormSchema>) => {
    alert(values);
  };
  return (
    <main className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="w-full h-full hidden md:block">
        <img
          src={"/images/4205986.jpg"}
          className="w-full h-full object-cover"
          alt=""
        />
      </section>
      <section className="flex items-center justify-center p-5 w-full">
        <form className=" w-[80%]" onSubmit={handleSubmit(submitSignup)}>
          <div className="w-full  flex flex-col gap-1 ">
            <h1 className="text-2xl font-medium">Create an new Account</h1>
            <p className="text-gray-500">
              Create an free account to show weather details
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 mt-3">
            <InputWithLabel
              value={watch("email")}
              onChange={(e) => {
                setValue("email", e.target.value);
                trigger("email");
              }}
              type="email"
              label="Enter email address"
              placeholder="email address"
              errorMessage={errors && errors.email && errors.email.message}
            />
            <InputWithLabel
              onChange={(e) => {
                setValue("name", e.target.value);
                trigger("name");
              }}
              type="text"
              value={watch("name")}
              label="Enter username"
              placeholder="enter name"
              errorMessage={errors && errors.name && errors.name.message}
            />
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="" className="text-gray-600 text-[15px]">
                Enter password
              </label>
              <Input
                onChange={(e) => {
                  setValue("password", e.target.value);
                  trigger("password");
                }}
                value={watch("password")}
                type={showPass ? "text" : "password"}
                placeholder="enter password"
                className="border-gray-400 pr-9"
              />
              <span className="text-sm text-red-600">
                {errors && errors.password && errors.password.message}
              </span>
              {!showPass ? (
                <Eye
                  onClick={() => setShowPass(!showPass)}
                  className="w-5 cursor-pointer text-gray-500 absolute right-3 top-9"
                />
              ) : (
                <EyeOff
                  onClick={() => setShowPass(!showPass)}
                  className="w-5 cursor-pointer text-gray-500 absolute right-3 top-9"
                />
              )}
            </div>
            <InputWithLabel
              type="password"
              value={watch("confirmPassword")}
              onChange={(e) => {
                setValue("confirmPassword", e.target.value);
                trigger("confirmPassword");
              }}
              label="Confirm password"
              errorMessage={
                errors &&
                errors.confirmPassword &&
                errors.confirmPassword.message
              }
              placeholder="enter confirm pass"
            />

            <div className="flex flex-col gap-1 mt-2">
              <LoaderButton loading={false} type="submit">
                Submit
              </LoaderButton>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Signup;
