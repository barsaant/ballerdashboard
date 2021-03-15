import axios from "axios";
import config from "../config/config.json";

const instance = axios.create({
  baseURL: `${config.FILE_SERVER_UPLOAD}`,
});

instance.defaults.withCredentials = true;

export default instance;
