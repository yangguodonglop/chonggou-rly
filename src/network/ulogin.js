import { request } from "./request";

export function userLogin(userName, password) {
  return request({
    method: "POST",
    url: "/user/login",
    data: {
      userName,
      password
    }
  });
}

export function register(userName, password, address, phone, email) {
  return request({
    method: "POST",
    url: "/user/register",
    data: {
      userName,
      password,
      address,
      phone,
      email
    }
  });
}
