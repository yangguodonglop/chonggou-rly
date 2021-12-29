import { request } from "./request";

const method = "POST";

export function findUserByName(userName) {
  return request({
    method,
    url: "user/findUser",
    data: {
      userName
    }
  });
}

export function updatePassword(
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
    method,
    url: "user/updatePassword",
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

//随机请求8首歌
export function randomMusic() {
  return request({
    method,
    url: "/music/random"
  });
}

// 请求华语或则流行的歌
export function findMusicByType(musictypename) {
  return request({
    method,
    url: "/music/typeMusic",
    data: {
      musictypename
    }
  });
}

// 按照热度请求音乐
export function findMusicOrderByHot() {
  return request({
    method,
    url: "/music/hot"
  });
}

// 随机获取视频
export function randomVideo() {
  return request({
    method,
    url: "/video/randomVideo"
  });
}

// 按照热度请求歌手
export function findSingerOrderByHot() {
  return request({
    method,
    url: "/singer/hot"
  });
}

// 相似音乐
export function findSameMusicByMusicType(musictypeid) {
  return request({
    method,
    url: "/music/sameMusic",
    data: {
      musictypeid
    }
  });
}

// 相似歌手
export function findSameSingerByTypeid(typeid) {
  return request({
    method,
    url: "/singer/sameSinger",
    data: {
      typeid
    }
  });
}

export function findMusicBySingerid(singerid) {
  return request({
    method,
    url: "/music/singer",
    data: {
      singerid
    }
  });
}

export function findSingerByTypename(typename) {
  return request({
    method,
    url: "/singer/typename",
    data: {
      typename
    }
  });
}

export function findMessageByVid(videoid) {
  return request({
    method,
    url: "/message/messages",
    data: {
      videoid
    }
  });
}

export function insertMessage(messagecomment, videoid, uid) {
  return request({
    method,
    url: "/message/insertMessage",
    data: {
      messagecomment,
      videoid,
      uid
    }
  });
}

export function searchMusic(musicname) {
  return request({
    method,
    url: "/music/searchMusic",
    data: {
      musicname
    }
  });
}

export function searchSinger(singername) {
  return request({
    method,
    url: "/singer/searchSinger",
    data: {
      singername
    }
  });
}

export function searchVideo(videoname) {
  return request({
    method,
    url: "/video/searchVideo",
    data: {
      videoname
    }
  });
}
