import api from "../config/AxiosConfig";

const AdminService = {
  getDeviceList() {
    return api.get("/api/admin/iot-items");
  },
  getExpiredDeviceList() {
    return api.get("/api/admin/iot-items/expired");
  },
  addNewDevice(data) {
    return api.post("/api/admin/register/iot", data);
  },
  addNewUser(data) {
    return api.post("/api/admin/register/user", data);
  },
  deleteUserFromDevice(iotClientId, userId) {
    return api.delete(`/api/admin/iot/${iotClientId}/user/${userId}`);
  },
  getUserList() {
    return api.get("/api/admin/user");
  },
  getUserListForDevice(iotClientId) {
    return api.get(`/api/admin/user/${iotClientId}`);
  },
  refreshToken(iotClientId) {
    return api.get(`/api/admin/refresh-token/${iotClientId}`);
  },
};

export default AdminService;
