import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../services/AdminService/AdminService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainLayout from "../../layout/MainLayout/MainLayout";
import ExpiredDeviceList from "../../components/ExpiredDeviceList/ExpiredDeviceList";

const AdminPage = () => {
  const [deviceList, setDeviceList] = useState([]);
  const navigate = useNavigate();
  const [expiredDeviceList, setExpiredDeviceList] = useState([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await AdminService.getDeviceList();
      setDeviceList(response.data);
    } catch (err) {
      toast.error("Unauthorized");
      navigate("/");
    }

    try {
      const response = await AdminService.getExpiredDeviceList();
      setExpiredDeviceList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshToken = async (e, iotClientId) => {
    e.preventDefault();
    try {
      const response = await AdminService.refreshToken(iotClientId);
      fetch();
      toast(response.status);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 w-5/6 mt-10 m-auto">
        <Link
          to={"/admin/new-device"}
          className="bg-green-400 hover:bg-green-500 font-bold text-white text-lg w-fit px-3 py-1 rounded-lg"
        >
          Add new device
        </Link>

        <div>
          <label className="text-xl font-bold">Device List</label>
          {deviceList.length > 0 ? (
            <div className="flex flex-col border border-gray-300 h-fit max-h-96 rounded-lg mt-4">
              <div className="flex w-full h-16 items-center justify-between border-b border-gray-300 px-5 py-3 bg-gray-300 text-xl font-bold">
                <h1 className="basis-1/5">Device ID</h1>
                <h1 className="flex-1">Device Name</h1>
                <h1 className="basis-1/3">Owner Email</h1>
                <h1 className="basis-1/6"></h1>
              </div>

              <div className="flex flex-col flex-1 overflow-y-auto h-full">
                {deviceList.map((device) => (
                  <div className="flex w-full items-center justify-between border-b border-gray-300 px-5 py-3 text-lg font-semibold">
                    <h1 className="basis-1/5">{device.iotClientId}</h1>
                    <h1 className="flex-1">{device.iotClientName}</h1>
                    <h1 className="basis-1/3">{device.userEmail}</h1>
                    <Link
                      to={`/admin/device/${device.iotClientId}`}
                      className="basis-1/6 flex justify-end"
                    >
                      <span className=" text-center bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded-lg">
                        Add user
                      </span>
                    </Link>
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

        <label className="text-xl font-bold">Expired Device List</label>
        <ExpiredDeviceList
          expiredDeviceList={expiredDeviceList}
          fetch={fetch}
        />
      </div>
    </MainLayout>
  );
};

export default AdminPage;
