import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { LoaderButton } from "../components/custom/LoaderButton";
import { Input } from "../components/ui/input";
import { InputWithLabel } from "../components/custom/InputwithLabel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signupFormSchema } from "../Schema/singupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userSignupAction } from "../redux/actions/userSignp.action";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { verifyUser } from "../redux/actions/verifyUseraction";
import { cn } from "../lib/utils";

const Signup = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { loading, verificationSend, err } = useSelector(
    (state: RootState) => state.user
  );
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
    const { confirmPassword, ...userValues } = values;
    confirmPassword;
    dispatch(userSignupAction(userValues));
  };
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    verificationSend && setModalOpen(true);
  }, [verificationSend]);
  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const token = param.get("qrt");

    if (token) {
      setModalOpen(true);
      dispatch(verifyUser(token as string));
    }
  }, [dispatch]);
  return (
    <main className="w-full h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogTrigger className="hidden">Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {loading ? (
              <AlertDialogTitle
                className={cn("text-blue-500 text-2xl", {
                  "text-red-500": err,
                })}
              >
                {!err ? <>Verification in Progress </> : <>{err}</>}
                <span className=" animate-ping">....</span>
              </AlertDialogTitle>
            ) : (
              <AlertDialogTitle>Go and Verify your email</AlertDialogTitle>
            )}

            <AlertDialogDescription className="flex flex-col relative">
              go and check your email, verification link has been sended click
              and verify
              <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                {loading && (
                  <>
                    <LoaderCircle
                      className=" text-green-500 animate-spin"
                      size={60}
                    />
                  </>
                )}
              </div>
              <div>
                <img src={"/images/2880024.jpg"} className="w-full" alt="" />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
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
              <LoaderButton loading={loading} type="submit">
                Submit
              </LoaderButton>
            </div>
            <div className="w-full flex justify-end">
              <span className="text-sm text-gray-500">
                Login an existing account{" "}
                <Link className="text-blue-500 font-medium" to={"/login"}>
                  Login
                </Link>{" "}
              </span>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Signup;
