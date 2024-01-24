import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { register, handleSubmit,formState: { errors } } = useForm();
    const {signup, hola, isAuthenticated, errors:registerErrors } = useAuth();
    const navigate = useNavigate();

    const submit = handleSubmit(async (values) => {
        await signup(values);
        console.log(values);
    });
    
    useEffect(() => {
    if(isAuthenticated) navigate('/tasks');
    console.log(isAuthenticated);
}, [isAuthenticated])

    return (
        <div>
            {/*  <form onSubmit={handlerSubmit}> */}
            {registerErrors.map((error, i)=>(<div key={i}>
                {error}
            </div>))}
            <form onSubmit={submit}>

                <input type="text" {...register("name", { required: true })} />
                {errors.name && ( <p>Se necesita name</p>
          )}
                <input type="email" {...register("email", { required: true })} />
                {errors.email && (
            <p>Se necesita email</p>
          )}
                <input type="password" {...register("password", { required: true })} />
                {errors.password && (
            <p>Se necesita password</p>
          )}
                <button type="submit">Submit</button>
            </form>
            <h1>{hola}</h1>
        </div>
    )
}