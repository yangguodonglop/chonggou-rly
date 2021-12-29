// import { request } from "./request";
import {get,post} from './request'
const baseUrl='http://106.53.61.91:6325'
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
export const adminLogin = param => post(baseUrl+'/rylBGM/account/signIn', param)

