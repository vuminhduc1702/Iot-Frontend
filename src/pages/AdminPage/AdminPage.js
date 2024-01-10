import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../services/AdminService/AdminService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./admin-page.css";
import MainLayout from "../../layout/MainLayout/MainLayout";
import ExpiredDeviceList from "../../components/ExpiredDeviceList/ExpiredDeviceList";
import DeviceList from "../../components/DeviceList/DeviceList";

const AdminPage = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [toggle, setToggle] = useState(1);
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

  return (
    <MainLayout>
      <div role="tablist" className="tabs tabs-lifted">
        <a
          role="tab"
          className={toggle === 1 ? "tab tab-active" : "tab"}
          onClick={() => setToggle(1)}
        >
          Device list
        </a>
        <a
          role="tab"
          className={toggle === 2 ? "tab tab-active" : "tab"}
          onClick={() => setToggle(2)}
        >
          Expired device list
        </a>
      </div>
      <div className="content-tabs">
        <div className={toggle === 1 ? "content active-content" : "content"}>
          <DeviceList deviceList={deviceList} />
        </div>
        <div className={toggle === 2 ? "content active-content" : "content"}>
          <ExpiredDeviceList
            expiredDeviceList={expiredDeviceList}
            fetch={fetch}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
