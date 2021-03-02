import axios from "axios";

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: "/api/"
  });
  // 发送网络请求
  return instance(config);
}
