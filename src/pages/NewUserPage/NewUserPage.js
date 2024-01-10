import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminService from "../../services/AdminService/AdminService";
import BackIcon from "../../assets/icons/BackIcon";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const NewUserPage = () => {
  const [userList, setUserList] = useState([]);
  const { iotClientId } = useParams();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await AdminService.getUserListForDevice(iotClientId);
    setUserList(response.data);
  };

  const handleAddUser = async (e, userId) => {
    e.preventDefault();
    try {
      const data = { iotClientId, userId };
      const response = await AdminService.addNewUser(data);
      fetch();
      toast.success(response.status);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  const handleDeleteUser = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await AdminService.deleteUserFromDevice(
        iotClientId,
        userId
      );
      fetch();
      toast.success(response.statusText);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  return (
    <div className="w-full m-auto h-screen">
      <div className="w-full h-20 flex gap-2 px-2 items-center text-xl font-bold hover:underline">
        <BackIcon />
        <Link to={"/admin"}>Back to admin page</Link>
      </div>
      <div className="w-11/12 m-auto">
        <h1 className="text-xl font-bold mb-6">
          <span>Device ID: </span>
          {iotClientId}
        </h1>
        <label className="text-xl">User List</label>
        <div className="overflow-x-auto overflow-y-scroll h-96">
          <table className="table text-lg table-pin-rows">
            <thead>
              <tr className="bg-gray-200 text-lg">
                <th>User ID</th>
                <th>User Email</th>
                <th>Status</th>
                <th>Add/Delete</th>
              </tr>
            </thead>
            <tbody className="">
              {userList.map((user) => (
                <tr>
                  <th>{user.userId}</th>
                  <th>{user.userEmail}</th>
                  <th>{user.isJoined === 0 ? "Not Joined" : "Joined"}</th>
                  <th className="flex justify-end">
                    {user.isJoined === 0 && (
                      <button
                        className="bg-green-400 hover:bg-green-500 text-white font-semibold px-3 py-1 rounded-lg"
                        onClick={(e) => handleAddUser(e, user.userId)}
                      >
                        Add user
                      </button>
                    )}
                    {user.isJoined === 1 && (
                      <button
                        className="bg-red-400 hover:bg-red-500 text-white font-semibold px-3 py-1 rounded-lg"
                        onClick={(e) => handleDeleteUser(e, user.userId)}
                      >
                        Delete user
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewUserPage;
