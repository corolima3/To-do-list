
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
//import { zodResolver } from "@hookform/resolvers/zod";
//import { Card, Message, Button, Input, Label } from "../components/ui";
//import { loginSchema } from "../schemas/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit =async (data) => await signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        {loginErrors?loginErrors.map((error, i) => (
          <div  key={i}>{error}</div>
        )): null}
        <h1 >Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input
            label="Write your email"
            type="email"
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email", { required: true })}
          />
          <p>{errors.email?.message}</p>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Write your password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p>falta password</p>

          <button type="submit">Login</button>
        </form>

        <p >Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      
    </div>
  );
}