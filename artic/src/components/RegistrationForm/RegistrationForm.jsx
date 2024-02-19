import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import Input from "../Input";
// import Button from "../Button";
import { Button, Input } from "../index.js";
import authService from '../../appwrite/auth.js';
import { useDispatch } from "react-redux";
import {login as loginAction} from '../../store/slice/authSlice.js'
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  const submit = async(data) => {
    try {
      setErrorMsg('')
      const userData =await authService.createAccount(data);
      if(userData){
        
        dispatch(loginAction(userData))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      setErrorMsg(error.message)
    }
  }
  return (
    <div className="w-full flex justify-center items-center flex-wrap">
      <div className="mx-auto w-full max-w-lg rounded-xl px-10 py-5 ">
        <div className="flex justify-center items-center flex-wrap my-6">logo</div>
        <div className="">
          <h2 className="text-center font-medium text-xl text-cyan-700">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(submit)} className="w-full">
            <Input
              label="Name"
              placeholder="Full Name"
              isRequired
              name="userName"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 mb-5">Name is required</p>
            )}
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              isRequired
              {...register("email", { required: true })}
              />
            {errors.email && (
              <p className="text-red-500 mb-5">Email is required</p>
              )}
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              isRequired
              {...register("password", { required: true })}
              />
            {errors.password && (
              <p className="text-red-500 mb-5">Password is required</p>
              )}
            {errorMsg && (
              <p className="text-red-500 mb-5">{errorMsg}</p>
              )}
            <Button type={"submit"}>Register</Button>
          </form>
          <p className="mt-2 text-gray-700">
            Already have a account?{" "}
            <Link to="/log-in">
            <span className="text-sky-500 hover:cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
