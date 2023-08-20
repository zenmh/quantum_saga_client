import { FormEvent } from "react";
import { useState } from "react";
import { Inp } from "../components/ui";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form_data = new FormData(e.currentTarget);
    const email = form_data.get("email");
    const password = form_data.get("password");

    console.log("hlw", email, password);

    setIsLoading(false);
  };

  return (
    <div className="flex flex-row justify-center">
      <form onSubmit={handleSignin} className="flex flex-col gap-4 w-[500px]">
        <Inp
          disabled={isLoading}
          name="email"
          type="email"
          placeholder="Enter Email"
        />
        <Inp
          disabled={isLoading}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          type="submit"
          value="Sign In"
          disabled={isLoading}
          className="w-full p-3 text-xl bg-sky-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed font-bold"
        />
      </form>
    </div>
  );
};

export default SignIn;
