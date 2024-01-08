import api from "../config/AxiosConfig";

const UserService = {
  getDeviceListOfUser() {
    return api.get("/api/user/iot-items");
  },
  publishMessage(iotClientId) {
    return api.post(`/api/user/image/${iotClientId}`);
  },
  messageHistory(iotClientId) {
    return api.get(`/api/user/history/${iotClientId}`);
  },
  setSendAuto(iotClientId) {
    return api.post(`/api/user/setting/${iotClientId}`);
  },
  setMinute(iotClientId, data) {
    return api.post(`/api/user/setting/${iotClientId}/minutes`, data);
  },
};

export default UserService;
