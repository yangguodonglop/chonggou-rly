import { request } from "./request";
import {get,post} from './request'
const baseUrl='http://106.53.61.91:6325/rylBGM'
export {baseUrl}

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
// export const postActive = (param) =>{
// return  post(baseUrl+'/productLine/downloadFile', param)

// }

export const userList = (param) => post(baseUrl+'/account/getAllAccountAllInfo', param)
export const userListActive = (param) => post(baseUrl+'/account/getAccountIntro', param)

export const addUser = (param) => post(baseUrl+'/account/signUp', param)

export const delAccount = (param) => post(baseUrl+'/account/delAccount', param)
export const rewriteInfo = (param) => post(baseUrl+'/account/rewriteInfo', param)
export const updatePassword = (param) => post(baseUrl+'/account/updatePassword', param)
export const authorization = (param) => post(baseUrl+'/account/authorization', param)
export const adminSetPassword = (param) => post(baseUrl+'/account/adminSetPassword', param)
export const aboutCopyrightMode = (param) => post(baseUrl+'/config/aboutCopyrightMode', param)
export const aboutCooperative = (param) => post(baseUrl+'/config/aboutCooperative', param)
export const aboutMusicTag = (param) => post(baseUrl+'/config/aboutMusicTag', param)
export const uploadFile = (param) => post(baseUrl+'/uploadFile', param)
export const downloadFile = (param) => post(baseUrl+'/productLine/downloadFile', param)
export const commitDemo = (param) => post(baseUrl+'/productLine/commitDemo', param)
export const commitArrangement = (param) => post(baseUrl+'/productLine/commitArrangement', param)

export const getProductionSong = (param) => post(baseUrl+'/productLine/getProductionSong', param)
export const deleteSong = (param) => post(baseUrl+'/productLine/deleteSong', param)
export const openFile = (param) => post(baseUrl+'/openFile', param)
export const openFileActive = (param) => get(baseUrl+'/openFile/'+param,)
export const assignWork = (param) => post(baseUrl+'/productLine/assignWork', param)
export const checkWork = (param) => post(baseUrl+'/productLine/checkWork', param)
export const commitRecord = (param) => post(baseUrl+'/productLine/commitRecord', param)
export const commitMix = (param) => post(baseUrl+'/productLine/commitMix', param)
export const getPublishSong = (param) => post(baseUrl+'/sell/getPublishSong', param)
export const commitFinishedProduct = (param) => post(baseUrl+'/productLine/commitFinishedProduct', param)
export const makeAuditionList = (param) => post(baseUrl+'/audition/makeAuditionList', param)
export const getPublishSongSell = (param) => post(baseUrl+'/sell/getPublishSong', param)
export const doWork = (param) => post(baseUrl+'/sell/doWork', param)
export const extendLock = (param) => post(baseUrl+'/sell/extendLock', param)
export const removeLockSong = (param) => post(baseUrl+'/sell/removeLockSong', param)
export const queryAuditionList = (param) => post(baseUrl+'/audition/queryAuditionList', param)
export const putLockIngList = (param) => post(baseUrl+'/sell/putLockIngList', param)
export const updateSongInfo = (param) => post(baseUrl+'/productLine/updateSongInfo', param)
export const updateDemo = (param) => post(baseUrl+'/productLine/updateDemo', param)
export const updatePublishData = (param) => post(baseUrl+'/sell/updatePublishData', param)
export const remarkToSong = (param) => post(baseUrl+'/god/remarkToSong', param)
export const remarkToSongActive = (param) => post(baseUrl+'/productLine/putSongRemark', param)
export const reCommitLyric = (param) => post(baseUrl+'/productLine/reCommitLyric', param)
// export const deleteSong = (param) => post(baseUrl+'/productLine/deleteSong', param)
// sell/getPublishSong
const method = "POST";

//相关参数要与实体类名字一样

//User相关请求

// 增加用户
export function insertUser(
  uid,
  userName,
  email,
  password,
  phone,
  address,
  status,
  remark
) {
  return request({
    method: "POST",
    url: "/user/insert",
    data: {
      uid,
      userName,
      email,
      password,
      phone,
      address,
      status,
      remark
    }
  });
}

// 删除单条用户
export function deleteUser(uid) {
  return request({
    method,
    url: "/user/delete",
    data: {
      uid
    }
  });
}

// 删除多条用户
export function deletesUser(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "user/deletes",
    data: ids
  });
}

// // 获取用户列表
// export function userList() {
//   return request({
//     method: "POST",
//     url: "/user/list"
//   });
// }

//根据id查找单个用户
export function findUserById(uid) {
  return request({
    method: "POST",
    url: "/user/find",
    data: {
      uid
    }
  });
}

// 更新用户
export function updateUserList(
  uid,
  userName,
  email,
  password,
  phone,
  address,
  createTime,
  status,
  remark
) {
  return request({
    method: "POST",
    url: "/user/update",
    data: {
      uid,
      userName,
      email,
      password,
      phone,
      address,
      createTime,
      status,
      remark
    }
  });
}

// MusicType相关请求

// 增加音乐类型
export function insertMusicType(musictypename) {
  return request({
    method,
    url: "music/insert",
    data: {
      musictypename
    }
  });
}

// 删除单条音乐类型
export function deleteMusicTypeById(musictypeid) {
  return request({
    method,
    url: "/music/delete",
    data: {
      musictypeid
    }
  });
}

// 查找音乐类型列表
export function musicTypeList() {
  return request({
    method: "POST",
    url: "/music/type"
  });
}

// 更新音乐类型列表
export function updateMusicTypeById(musictypeid, musictypename) {
  return request({
    method,
    url: "/music/update",
    data: {
      musictypeid,
      musictypename
    }
  });
}

export function deletesMusicTypeById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/music/deletesMusicType",
    data: ids
  });
}

//Music相关请求

// 查找音乐列表
export function musicList() {
  return request({
    method: "POST",
    url: "/music/list"
  });
}

// 查找单条音乐
export function findMusicById(musicid) {
  return request({
    method,
    url: "/music/findMusic",
    data: {
      musicid
    }
  });
}

// 删除单条音乐
export function deleteMusicById(musicid) {
  return request({
    method,
    url: "/music/deleteMusic",
    data: {
      musicid
    }
  });
}

// 删除多条音乐
export function deletesMusicById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/music/deletesMusic",
    data: ids
  });
}

//SingerType相关请求

// 增加歌手类型
export function insertType(typename) {
  return request({
    method,
    url: "/singer/insert",
    data: {
      typename
    }
  });
}

// 删除歌手类型
export function deleteType(typeid) {
  return request({
    method,
    url: "/singer/delete",
    data: {
      typeid
    }
  });
}

// 查找歌手类型列表
export function singerTypeList() {
  return request({
    method,
    url: "/singer/type"
  });
}

// 更新音乐类型
export function updateType(typeid, typename) {
  return request({
    method,
    url: "/singer/update",
    data: {
      typeid,
      typename
    }
  });
}

export function deletesSinerTypeByid(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/singer/deletesSingerType",
    data: ids
  });
}

// Singer相关请求

// 查找歌手列表
export function singerList() {
  return request({
    method,
    url: "singer/list"
  });
}

// 查找单个歌手
export function findSingerById(singerid) {
  return request({
    method,
    url: "/singer/findSinger",
    data: {
      singerid
    }
  });
}

// 删除单条歌手列表
export function deleteSingerById(singerid) {
  return request({
    method,
    url: "/singer/deleteSinger",
    data: {
      singerid
    }
  });
}

// 删除多条歌手列表
export function deletesSingerById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/singer/deletesSinger",
    data: ids
  });
}

//Video相关请求

// 查找视频列表
export function videoList() {
  return request({
    method,
    url: "video/list"
  });
}

// 查找单条视频
export function findVideoById(videoid) {
  return request({
    method,
    url: "video/findVideo",
    data: {
      videoid
    }
  });
}

// 删除单条视频
export function deleteVideoById(videoid) {
  return request({
    method,
    url: "/video/deleteVideo",
    data: {
      videoid
    }
  });
}

// 删除多条视频
export function deletesVideoById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/video/deletesVideo",
    data: ids
  });
}
