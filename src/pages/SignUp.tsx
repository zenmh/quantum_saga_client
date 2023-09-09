import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { createUser } from "../redux/features/user/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<SignUpFormInputs> = (
    data: SignUpFormInputs
  ) => {
    setIsLoading(true);

    dispatch(createUser({ email: data.email, password: data.password }));

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
          type="text"
          placeholder="Your Name"
          className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          {...register("name", { required: "Name is required !!" })}
        />
        {errors.name && <p className="text-rose-400">{errors.name.message}</p>}
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
          value="Sign Up"
          disabled={isLoading}
          className="w-full p-3 cursor-pointer text-xl bg-sky-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed font-bold"
        />
        <p className="text-center font-normal">
          I already have an account!
          <Link
            to="/sign_in"
            className="text-blue-400 underline hover:text-blue-500 ml-2"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
