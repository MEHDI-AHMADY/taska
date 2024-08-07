import React from "react";
import { useMutation } from "@tanstack/react-query";
import pb from "../../lib/pocketbase";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

 const password = watch("password", ""); 

  const submitHandler = async (data) => {
    const { username, email, password, passwordConfirm } = data;

   try {
    let newUserObj = {
      username,
      email,
      password,
      passwordConfirm,
      isRegistered: true,
    };

   const record = await pb.collection("users").create(newUserObj);
   
   }catch(err) {
    console.log(err);
   }
  };

  const mutation = useMutation({
    mutationFn: submitHandler,
  });
  

  return (
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
            {...register("password" , { required: "password is required" })}
            type="password"
            placeholder="password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            {...register("passwordConfirm" , {
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
          >
            register
          </button>
        </form>
      </div>
    </div>
  );
}
