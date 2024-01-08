import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./new-device.css";
import BackIcon from "../../assets/icons/BackIcon";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService/AdminService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewDevicePage = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    AdminService.getUserList().then((response) => {
      setUserList(response.data);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await AdminService.addNewDevice(data);
      toast.success(response.status);
      navigate("/admin");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="w-full h-20 flex gap-2 px-2 items-center text-xl font-bold hover:underline">
        <BackIcon />
        <Link to={"/admin"}>Back to admin page</Link>
      </div>
      <div className="new-device">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <button className="submit-btn">Save new device</button>
          <div className="field">
            <label className="font-bold">Device name:</label>
            <div className="field-input">
              <input
                type="text"
                placeholder="Device A"
                {...register("iotClientName", {
                  required: { value: true, message: "Device name is required" },
                })}
              />
              <p className="error">{errors.iotClientName?.message}</p>
            </div>
          </div>
          <div className="field">
            <label className="font-bold">Device model:</label>
            <div className="field-input">
              <input
                type="text"
                placeholder="ESP32"
                {...register("iotClientModel", {
                  required: {
                    value: true,
                    message: "Devide model is required",
                  },
                })}
              />
              <p className="error">{errors.iotClientModel?.message}</p>
            </div>
          </div>

          <div>
            <label className="text-xl font-bold">Owner:</label>
            {userList.length > 0 ? (
              <div className="flex flex-col border border-gray-300 h-96 rounded-lg mt-4">
                <div className="flex w-full h-16 items-center justify-between border-b border-gray-300 px-5 py-3 bg-gray-300 text-xl font-bold">
                  <h1 className="basis-1/4">Owner</h1>
                  <h1 className="basis-1/4">User ID</h1>
                  <h1 className="flex-1">User Email</h1>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto h-full">
                  {userList.map((user) => (
                    <div className="flex w-full items-center justify-between border-b border-gray-300 px-5 py-3 text-lg font-semibold">
                      <div className="basis-1/4">
                        <input
                          type="radio"
                          value={user.userId}
                          className="h-6 w-6"
                          {...register("userId")}
                        />
                      </div>
                      <h1 className="basis-1/4">{user.userId}</h1>
                      <h1 className="flex-1">{user.userEmail}</h1>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h1 className="text-lg pt-2 pl-2">
                Refresh token for expired devices to use
              </h1>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDevicePage;