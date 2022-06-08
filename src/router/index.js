import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("views/login/Login.vue");
const Home = () => import("views/home/Home.vue");
const MusicList = () => import("views/home/childrens/musiclist/MusicList.vue");
const MusicCheck = () =>import("views/home/childrens/musiclist/musiclistchildrens/MusicCheck.vue");
const SingerList = () =>import("views/home/childrens/singerlist/SingerList.vue");
const SingerkhList = () =>import("views/home/childrens/singerlist/SingerkhList.vue");
const VideoList = () => import("views/home/childrens/videolist/VideoList.vue");
const User = () => import("views/home/childrens/user/User.vue");
const ULogin = () => import("views/ulogin/ULogin.vue");
const Register = () => import("views/ulogin/Register.vue");
const UHome = () => import("views/uhome/UHome.vue");
const UPassword = () => import("views/uhome/header/UpdatePassword.vue");
const UInfo = () => import("views/uhome/header/UpdateInfo.vue");
const Find = () => import("views/uhome/container/find/Find.vue");
const Song = () => import("views/uhome/container/detail/Song.vue");
const Singer = () => import("views/uhome/container/detail/Singer.vue");
const Singers = () => import("views/uhome/container/singers/Singers.vue");
const Video = () => import("views/uhome/container/detail/Video.vue");

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/find"
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "/musiclist",
        component: MusicList
      },

      {
        path: "/musiccheck",
        component: MusicCheck
      },
   
      {
        path: "/singerlist",
        component: SingerList
      },
      {
        path: "/SingerkhList",
        component: SingerkhList
      },
      
  
      {
        path: "/videolist",
        component: VideoList
      },
      {
        path: "/user",
        component: User
      },

    ]
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/ulogin",
    component: ULogin
  },
  {
    path: "/uhome",
    component: UHome,
    children: [
      {
        path: "/find",
        component: Find
      },
      {
        path: "/song",
        component: Song
      },
      {
        path: "/singer",
        component: Singer
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/video",
        component: Video
      }
    ]
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/upassword",
    component: UPassword
  },
  {
    path: "/uinfo",
    component: UInfo
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
