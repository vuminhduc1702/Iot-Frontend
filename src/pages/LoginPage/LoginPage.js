import { AuthContext } from "../../context/AuthContext";
import AuthenticationService from "../../services/AuthenticationService/AuthenticationService";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../../layout/MainLayout/MainLayout";

const LoginPage = () => {
  const { setIsAuthed, role, checkRole } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    AuthenticationService.login(data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        setIsAuthed(true);
        checkRole(localStorage.getItem("accessToken"));
        setRedirect(true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (redirect) {
    if (role === 1) {
      navigate("/admin");
    } else {
      navigate("/chat");
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center mt-8">
        <h1 className="font-bold my-4">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
          noValidate
        >
          <input
            className="ipt w-96 font-bold"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "email is required" },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>

          <input
            className="ipt w-96 font-bold"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "password is required" },
            })}
          />
          <p className="error">{errors.password?.message}</p>
          <div className="flex flex-col justify-center items-center pb-4 border-b border-gray-300">
            <button className="my-4 bg-black w-96 py-2 text-white font-bold">
              Log in
            </button>
          </div>
        </form>
        <span className="mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-bold text-black underline">
            Sign up
          </Link>
        </span>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
