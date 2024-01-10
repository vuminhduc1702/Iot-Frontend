import React from "react";
import { Link } from "react-router-dom";

const DeviceList = ({ deviceList }) => {
  return (
    <div className="flex flex-col gap-5">
      <Link
        to={"/admin/new-device"}
        className="bg-green-400 hover:bg-green-500 font-bold text-white text-lg w-fit px-3 py-1 rounded-lg"
      >
        Add new device
      </Link>

      {deviceList.length > 0 ? (
        <div className="overflow-x-auto overflow-y-scroll h-96">
          <table className="table text-lg table-pin-rows">
            <thead>
              <tr className="bg-gray-200 text-lg">
                <th>Device ID</th>
                <th>Device Name</th>
                <th>Owner Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {deviceList.map((device) => (
                <tr>
                  <th>{device.iotClientId}</th>
                  <th>{device.iotClientName}</th>
                  <th>{device.userEmail}</th>
                  <th>
                    <Link
                      to={`/admin/device/${device.iotClientId}`}
                      className="basis-1/6 flex justify-end"
                    >
                      <span className=" text-center bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded-lg">
                        Add user
                      </span>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-lg font-semibold">No device available</h3>
      )}
    </div>
  );
};

export default DeviceList;
