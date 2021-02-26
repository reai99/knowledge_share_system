import Axios from 'axios'
import { Message } from "element-ui";

// 设置请求头
Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export interface AxiosConf {
  withCredentials: boolean;
  baseURL: string;
  timeout: number;
}

// 请求配置项
const config: AxiosConf = {
  withCredentials: true, // 请求带上cookies
  baseURL: process.env.NODE_ENV === "development" ? '/' : process.env.VUE_APP_BASE_API,  // 设置默认地址
  timeout: 10 * 1000, // 请求异常时间
}

const axios = Axios.create(config);

axios.interceptors.request.use(
  config => {
    // 加入鉴权信息 ....
    return config
  },
  error => {
    Message.error("请求错误!");
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  config => {
    return config.data
  },
  error => {
    Message.error("服务器响应错误!");
    return Promise.reject(error);
  }
)
export default axios
