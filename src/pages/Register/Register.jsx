import React from "react";
import { useMutation } from "@tanstack/react-query";
import pb from "../../lib/pocketbase";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const checkEmailExists = async (email) => {
    const result = await pb.collection("users").getFullList({
      filter: `email='${email}'`,
    });
    return result.length > 0;
  };

  const createUser = async (data) => {
    if (await checkEmailExists(data.email)) {
      throw new Error("Email already exists");
    }
    await pb.collection("users").create(data);
  };

  const { mutate, isPending , data , error } = useMutation({
    mutationFn: createUser,
  });

  const password = watch("password", "");

  const submitHandler = (data) => {
    mutate(data);
  };

  return (
    <>
      {error && error.message === "Email already exists" && (
        <Navigate to="/login" />
      )}

      {error && (
        <span>{error.message}{console.log(error)}</span>
      )}

      {data && (
        <Navigate to="/" />
      )}

      <div className="container px-5 sm:px-0">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-slate-500 p-5 mt-7 rounded-md flex flex-col gap-5 [&_input]:p-3 [&_input]:rounded-md"
          >
            <input
              {...register("username", { required: "username is required" })}
              type="text"
              placeholder="Username"
            />
            {errors.username && <p>{errors.username.message}</p>}

            <input
              {...register("email", { required: "email is required" })}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              {...register("password", { required: "password is required" })}
              type="password"
              placeholder="password"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
              {...register("passwordConfirm", {
                required: "confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="confirm password"
            />
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}

            <button
              className="p-3 bg-white text-black rounded-md hover:bg-black hover:text-white transition-all"
              type="submit"
              disabled={isPending}
            >
               {isPending ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
