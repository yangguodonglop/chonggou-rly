// import { request } from "./request";
import {get,post} from './request'
const baseUrl='http://47.114.141.171:8990/rylBGM'
//const baseUrl='http://175.27.187.172:6325/rylBGM'
// export function adminLogin(key, pw) {
//   return request({
//     method: "POST",
//     url: "rylBGM/account/signIn",
//     data: {
//       key,
//       pw
//     }
//   });
// }
export const adminLogin = param => post(baseUrl+'/account/signIn', param)

