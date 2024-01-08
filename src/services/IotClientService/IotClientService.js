import api from "../config/AxiosConfig";

const IotClientService = {
  uploadImage(userId) {
    return api.post(`/api/iot/image/${userId}`);
  },
};

export default IotClientService;
