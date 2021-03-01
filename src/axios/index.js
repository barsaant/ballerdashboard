import axios from "axios";
import config from "../config/config.json";

const instance = axios.create({
  baseURL: `${config.SERVER_URL}`,
});

instance.defaults.withCredentials = true;

export default instance;
