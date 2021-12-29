import axios from "axios";

export function request1(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    withCredentials: true
  });

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      console.log(err);
    }
  );

  //响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      console.log(err);
    }
  );

  // 发送真正的请求
  return instance(config);
}

export function banner() {
  return request1({
    url: "/banner"
  });
}
