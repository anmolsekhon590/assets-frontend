import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "./User";
export default function Login() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // to store login message
    const [loginMessage, setLoginMessage] = useState(null);

    // to store color of login messgae
    const [loginMessageColor, setLoginMessageColor] = useState(null);

    const onSubmit = (e) => {

        // clear session storage
        sessionStorage.clear();

        // clear login message 
        setLoginMessage("");

        // constructing a user object
        const user = new User(e.username, e.password);

        // using axios library to handle api requests
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/v1/asset/authenticate',
            headers: {},
            data: {
                username: user.username,
                password: user.password
            }
            // If request is sucessful
        }).then(response => {
            sessionStorage.setItem("jwtToken", response.data.jwtToken);
            setLoginMessageColor("text-green");
            setLoginMessage("Login Successful!");
            // To handle Uncaught exception 
        }).catch(response => {
            console.log(response.request.status)
            setLoginMessageColor("text-red");
            setLoginMessage("Invalid Username or password");
        });
    }

    return (
        <div className="max-w-xl m-auto bg-white mt-10">
            <form className="shadow-md rounded-md p-8 text-2xl" onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-3">
                    <label htmlFor="username">Username: </label>
                    <input className="w-full border-2 p-2" type="text" name="username" {...register("username")} placeholder="Enter username here" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password: </label>
                    <input className="w-full border-2 p-2" type="password" {...register("password")} placeholder="Enter Password Here" />
                </div>

                <div className={loginMessageColor}>
                    {loginMessage}
                </div>

                <button className="w-full bg-color-2 text-color-4 mb-3 rounded-md py-2" type="submit">Login</button>
            </form>
        </div>
    )
}