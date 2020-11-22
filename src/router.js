import Vue from "vue";
import Router from "vue-router";
import Game from "./views/Game.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Groups from "./views/Groups.vue";
import Dashboard from "./views/Dashboard.vue";
import Workshop from "./views/Workshop.vue";
import Question from "./views/Question.vue";
import Upload from "./views/Upload.vue";
import Podium from "./views/Podium.vue";
import Profile from "./views/Profile.vue";
import Ask from "./views/Ask.vue";
import Index from "./views/Index.vue";

Vue.use(Router);

var r = {
  routes: [{
  	name: "game",
  	path: '/game',
  	component: Game
  },
  {
  	name: "login",
  	path: '/',
  	component: Login
  },
  {
    name: "register",
    path: '/register',
    component: Register

  },
  {
    name: "groups",
    path: '/groups',
    component: Groups
  },
  {
    name: "dashboard",
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: "workshop",
    path: '/workshop',
    component: Workshop
  },
  {
    name: "question",
    path: '/question/:qId',
    component: Question
  },
  {
    name: "upload",
    path: '/upload',
    component: Upload
  },
  {
    name: "podium",
    path: '/podium',
    component: Podium
  },
  {
    name: "profile",
    path: '/profile',
    component: Profile
  },
  {
    name: "ask",
    path: '/ask',
    component: Ask
  }]
};

export default new Router(r);
