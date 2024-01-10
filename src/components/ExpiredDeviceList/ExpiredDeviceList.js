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
      <div className="mt-12">
        {expiredDeviceList.length > 0 ? (
          <div className="overflow-x-auto overflow-y-scroll h-96">
            <table className="table text-lg table-pin-rows">
              <thead>
                <tr className="bg-gray-200 text-lg">
                  <th>Device ID</th>
                  <th>Device Name</th>
                  <th>Owner Email</th>
                  <th>Day to expired</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {expiredDeviceList.map((device) => (
                  <tr>
                    <th>{device.iotClientId}</th>
                    <th>{device.iotClientName}</th>
                    <th>{device.userEmail}</th>
                    <th>{device.dayExpired}</th>
                    <th>
                      <button
                        className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 hover:text-white text-white"
                        onClick={(e) => refreshToken(e, device.iotClientId)}
                      >
                        Refresh
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-lg font-semibold">No device is expired</h3>
        )}
      </div>
      <ConfirmModal deviceInfo={deviceInfo} />
    </>
  );
};

export default ExpiredDeviceList;
