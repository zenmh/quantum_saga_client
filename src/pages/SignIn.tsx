import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser } from "../redux/features/user/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SignInFromInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFromInputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInFromInputs> = (
    data: SignInFromInputs
  ) => {
    setIsLoading(true);

    dispatch(loginUser({ email: data.email, password: data.password }));

    setIsLoading(false);
  };

  if (user) navigate(from, { replace: true });

  return (
    <div className="flex flex-row justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[500px]"
      >
        <input
          disabled={isLoading}
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          {...register("email", { required: "Email is required !!" })}
        />
        {errors.email && (
          <p className="text-rose-400">{errors.email.message}</p>
        )}
        <input
          disabled={isLoading}
          type="password"
          placeholder="Password"
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          {...register("password", { required: "Password is required !!" })}
        />
        {errors.password && (
          <p className="text-rose-400">{errors.password.message}</p>
        )}
        <input
          type="submit"
          value="Sign In"
          disabled={isLoading}
          className="w-full p-3 text-xl bg-sky-800 border-sky-800 rounded-md cursor-pointer outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed font-bold"
        />
        <p className="text-center font-normal">
          You are new here?
          <Link
            to="/sign_up"
            className="text-blue-400 underline hover:text-blue-500 ml-2"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
