import { Eye, EyeOff } from "lucide-react";
import { LoaderButton } from "../components/custom/LoaderButton";
import { Input } from "../components/ui/input";
import { InputWithLabel } from "../components/custom/InputwithLabel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginFormSchema } from "../Schema/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { userLoginAction } from "../redux/actions/userLoginaction";

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.user);
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const submitSignup = (values: z.infer<typeof loginFormSchema>) => {
    dispatch(userLoginAction(values));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);
  return (
    <main className="w-full h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <section className="w-full h-full hidden md:block">
        <img
          src={"/images/4189851.jpg"}
          className="w-full h-full object-cover"
          alt=""
        />
      </section>
      <section className="flex items-center justify-center p-5 w-full">
        <form className=" w-[80%]" onSubmit={handleSubmit(submitSignup)}>
          <div className="w-full  flex flex-col gap-1 ">
            <h1 className="text-2xl font-medium">Sign in existing account</h1>
            <p className="text-gray-500">
              login an existing account with email and password
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

            <div className="flex flex-col gap-1 relative mt-5">
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

            <div className="flex flex-col gap-1 mt-2">
              <LoaderButton loading={loading} type="submit">
                Sign in
              </LoaderButton>
            </div>
            <div className="w-full flex justify-end">
              <span className="text-sm text-gray-500">
                Create an new Account{" "}
                <Link className="text-blue-500 font-medium" to={"/signup"}>
                  Signup
                </Link>{" "}
              </span>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
