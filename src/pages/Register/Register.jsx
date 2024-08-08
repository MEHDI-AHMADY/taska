import React , { useEffect } from "react";
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

  const password = watch("password" , "");

  const createUser = async (data) => {
    const res = await pb.collection("users").create(data);
    
    return res.id;
  };

  const { mutate, isPending, data, error, isSuccess } = useMutation({
    mutationFn: createUser,
  });

  const submitHandler = (data) => {        
    mutate(data);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
     <Navigate to="/dashboard" />;
    }
  }, []);

  if (data && isSuccess) {
    localStorage.setItem("userId", data);
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="customBg px-5 sm:px-0 h-screen">
        <h2 className="flex items-center justify-center pt-5 text-2xl text-green-800">sign up</h2>
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-[300px] py-4 mt-7 rounded-md flex flex-col gap-5 [&_input]:p-3 [&_input]:w-full [&_input]:rounded-md"
          >
            <input
              {...register("username", { required: "username is required" })}
              type="text"
              placeholder="Username"
            />
            {errors.username && <p>{errors.username.message}</p>}
            {error &&
              error.data &&
              error.data.data &&
              error.data.data.username &&
              error.data.data.username.message ===
                "The username is invalid or already in use." && (
                <p>username is already in use.</p>
              )}

            <input
              {...register("email", { required: "email is required" })}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
            {error &&
              error.data &&
              error.data.data &&
              error.data.data.email &&
              error.data.data.email.message ===
                "The email is invalid or already in use." && (
                <p>Email is already in use.</p>
              )}

            <input
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
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
              {isPending ? "wait a few seconds" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
