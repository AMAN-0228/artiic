import  { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { login as loginAction } from "../../store/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, seterrorMsg ] = useState('');

  const submit = async (data) => {
    try {
      const session = await authService.login(data);
      // console.log(session)
      if(session){
        const userData = await authService.getCurrentUser();
        if(userData) dispatch(loginAction(userData));
        navigate("/")
      }
      else{
        seterrorMsg("Wrong Email or Password")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full flex justify-center items-center flex-wrap  ">
      <div className="mx-auto w-full max-w-lg rounded-xl px-10 py-5 ">
        <div className="flex justify-center items-center flex-wrap my-6">logo</div>
        <div className="">
          <h2 className="text-center font-medium text-xl text-cyan-700">
            Sign In
          </h2>
          <form onSubmit={handleSubmit(submit) }>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              isRequired
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 mb-5">Email is required</p>
            )}
            <Input
              type="password"
              name="password"
              label="Password"
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
            <Button type={"submit"}>Login</Button>
          </form>
          <p className="mt-2 text-gray-700">
            Don't have an account?{" "}
            <Link to="/sign-up">
            <span className="text-sky-500 hover:cursor-pointer">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
