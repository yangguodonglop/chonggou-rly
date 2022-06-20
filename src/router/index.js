import Vue from "vue";
import VueRouter from "vue-router";
import store from "store";

const Login = () => import("@/views/login/Login.vue");
const Home = () => import("@/views/home/Home.vue");
const MusicList = () => import("@/views/home/childrens/musiclist/MusicList.vue");
const MusicCheck = () => import("@/views/home/childrens/musiclist/musiclistchildrens/MusicCheck.vue");
const SingerList = () => import("@/views/home/childrens/singerlist/SingerList.vue");
const SingerkhList = () => import("@/views/home/childrens/singerlist/SingerkhList.vue");
const VideoList = () => import("@/views/home/childrens/videolist/VideoList.vue");
const User = () => import("@/views/home/childrens/user/User.vue");
const ULogin = () => import("@/views/ulogin/ULogin.vue");
const Register = () => import("@/views/ulogin/Register.vue");
const UHome = () => import("@/views/uhome/UHome.vue");
const UPassword = () => import("@/views/uhome/header/UpdatePassword.vue");
const UInfo = () => import("@/views/uhome/header/UpdateInfo.vue");
const Find = () => import("@/views/uhome/container/find/Find.vue");
const Song = () => import("@/views/uhome/container/detail/Song.vue");
const Singer = () => import("@/views/uhome/container/detail/Singer.vue");
const Singers = () => import("@/views/uhome/container/singers/Singers.vue");
const Video = () => import("@/views/uhome/container/detail/Video.vue");

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    component:  () => import("@/views/login/Login.vue")
  },
  {
    path: "/login",
    component:  () => import("@/views/login/Login.vue")
  },
  {
    path: "/ulogin",
    component: () => import("@/views/ulogin/ULogin.vue")
  },
  {
    path: "/home",
    component:() => import("@/views/home/Home.vue"),
    children: [
      {
        path: "/musiclist",
        component: () => import("@/views/home/childrens/musiclist/MusicList.vue"),
      },

      {
        path: "/musiccheck",
        component: import("@/views/home/childrens/musiclist/musiclistchildrens/MusicCheck.vue"),
      },

      {
        path: "/singerlist",
        component: () => import("@/views/home/childrens/singerlist/SingerList.vue"),
      },
      {
        path: "/SingerkhList",
        component: () => import("@/views/home/childrens/singerlist/SingerkhList.vue"),
      },


      {
        path: "/videolist",
        component:() => import("@/views/home/childrens/videolist/VideoList.vue")
      },
      {
        path: "/user",
        component: () => import("@/views/home/childrens/user/User.vue")
      },

    ]
  },
  {
    path: "/uhome",
    component:  () => import("@/views/uhome/UHome.vue"),
    children: [
      {
        path: "/find",
        component: () => import("@/views/uhome/container/find/Find.vue")
      },
      {
        path: "/song",
        component:() => import("@/views/uhome/container/detail/Song.vue")
      },
      {
        path: "/singer",
        component:() => import("@/views/uhome/container/detail/Singer.vue")
      },
      {
        path: "/singers",
        component:() => import("@/views/uhome/container/singers/Singers.vue")
      },
      {
        path: "/video",
        component: () => import("@/views/uhome/container/detail/Video.vue")
      }
    ]
  },
  {
    path: "/register",
    component:  () => import("@/views/ulogin/Register.vue")
  },
  {
    path: "/upassword",
    component: () => import("@/views/uhome/header/UpdatePassword.vue")
  },
  {
    path: "/uinfo",
    component:  () => import("@/views/uhome/header/UpdateInfo.vue")
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
