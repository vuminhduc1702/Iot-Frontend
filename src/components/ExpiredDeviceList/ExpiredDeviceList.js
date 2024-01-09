import React, { useState } from "react";
import AdminService from "../../services/AdminService/AdminService";
import toast from "react-hot-toast";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ExpiredDeviceList = ({ expiredDeviceList, fetch }) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const refreshToken = async (e, iotClientId) => {
    e.preventDefault();
    try {
      const response = await AdminService.refreshToken(iotClientId);
      document.getElementById("my_modal_1").showModal();
      setDeviceInfo(response.data);
      fetch();
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div>
        {expiredDeviceList.length > 0 ? (
          <div className="flex flex-col border border-gray-300 h-fit max-h-96 rounded-lg">
            <div className="flex w-full h-16 items-center justify-between border-b border-gray-300 px-5 py-3 bg-gray-300 text-xl font-bold">
              <h1 className="basis-1/5">Device ID</h1>
              <h1 className="basis-1/5">Device Name</h1>
              <h1 className="flex-1">Owner Email</h1>
              <h1 className="basis-1/6">Day to expired</h1>
              <h1 className="basis-1/6"></h1>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto h-full">
              {expiredDeviceList.map((device) => (
                <div className="flex w-full items-center justify-between border-b border-gray-300 px-5 py-3 text-lg font-semibold">
                  <h1 className="basis-1/5">{device.iotClientId}</h1>
                  <h1 className="basis-1/5">{device.iotClientName}</h1>
                  <h1 className="flex-1">{device.userEmail}</h1>
                  <h1 className="basis-1/6">{device.dayExpired}</h1>
                  <div className="basis-1/6 flex justify-end">
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 hover:text-white text-white"
                      onClick={(e) => refreshToken(e, device.iotClientId)}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h3 className="text-lg font-semibold">No device is expired</h3>
        )}
      </div>
      <div id="my-modal-1">
        <ConfirmModal deviceInfo={deviceInfo} />
      </div>
    </>
  );
};

export default ExpiredDeviceList;
