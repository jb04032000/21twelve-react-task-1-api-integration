import axios from "axios";
import { BASE_URL } from "../basic/constants/apiUrls";

const myAxios = axios.create({
  baseURL: BASE_URL,
});

export default myAxios;
