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
  const [otp, setOtp] = useState();
  const { errors } = formState;

  // const onSubmit = (data) => {
  //   AuthenticationService.login(data)
  //     .then((response) => {
  //       console.log(response.data);
  //       localStorage.setItem("accessToken", response.data.accessToken);
  //       setIsAuthed(true);
  //       checkRole(localStorage.getItem("accessToken"));
  //       setRedirect(true);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // };

  if (redirect) {
    if (role === 1) {
      navigate("/admin");
    } else {
      navigate("/chat");
    }
  }

  const onSubmit = (data) => {
    if (!otp) {
      setTimeout(function () {
        const response = {
          valid: true,
          otp: Math.floor(100000 + Math.random() * 900000),
        };
        setOtp(response.otp);
      }, 1000);
    } else {
      console.log(typeof otp);
      console.log(typeof data.otp);
      if (data.otp != otp) {
        document.getElementById("noti").innerHTML = "Wrong OTP";
        return;
      } else {
        document.getElementById("noti").innerHTML = JSON.stringify(data);
        return;
      }
    }
  };

  // const getOtp = () => {
  //   console.log(data);
  // };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="font-bold mb-4 text-2xl">Login your account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
          noValidate
        >
          <input
            className="input input-bordered w-96 max-w-md"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>

          <input
            className="input input-bordered w-96 max-w-md"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
          <p className="error">{errors.password?.message}</p>
          {!otp && (
            <button className="btn my-4 bg-black w-96 py-2 text-white font-bold">
              Get OTP
            </button>
          )}
          {otp && (
            <div>
              <h1>Your OTP is: {otp}</h1>
              <input
                className="input input-bordered w-96 max-w-md"
                type="number"
                {...register("otp", { required: { value: true } })}
                minLength={6}
                maxLength={6}
              />
              <div className="flex flex-col justify-center items-center pb-4 border-b border-gray-300">
                <button className="btn my-4 bg-black w-96 py-2 text-white font-bold">
                  Log in
                </button>
              </div>
            </div>
          )}
        </form>
        <div id="noti"></div>
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
