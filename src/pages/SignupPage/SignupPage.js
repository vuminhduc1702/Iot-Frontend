import { useForm } from "react-hook-form";
import AuthenticationService from "../../services/AuthenticationService/AuthenticationService";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout/MainLayout";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const response = await AuthenticationService.register(data);
      toast.success("Successfully create a new account");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="font-bold mb-4 text-2xl">Create a new account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
          noValidate
        >
          <input
            className="input input-bordered w-96 max-w-md"
            type="text"
            placeholder="First name"
            {...register("firstName", {
              required: { value: true, message: "First name is required" },
            })}
          />
          <p className="error">{errors.firstName?.message}</p>
          <input
            className="input input-bordered w-96 max-w-md"
            type="text"
            placeholder="Last name"
            {...register("lastName", {
              required: { value: true, message: "Last name is required" },
            })}
          />
          <p className="error">{errors.lastName?.message}</p>

          <input
            className="input input-bordered w-96 max-w-md"
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
            className="input input-bordered w-96 max-w-md"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "password is required" },
            })}
          />
          <p className="error">{errors.password?.message}</p>

          <div className="flex justify-around">
            <label className="flex items-center gap-1 font-bold">
              <input
                type="radio"
                name="role"
                {...register("roles")}
                value={0}
              />{" "}
              User
            </label>
            <label className="flex items-center gap-1 font-bold">
              <input
                type="radio"
                name="role"
                {...register("roles")}
                value={1}
              />{" "}
              Admin
            </label>
          </div>
          <div className=" flex flex-col justify-center items-center w-96">
            <button className="btn my-4 bg-black w-96 py-2 text-white font-bold">
              Sign up
            </button>
            <span className="mt-4 py-3 w-full text-center border-t border-gray-300">
              Already have an account?{" "}
              <Link to={"/login"} className="font-bold text-black underline">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default SignupPage;
