import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{ //状态，要管理的数据
    count:0,
    uid:null,
    username:null,
    password:null,
    classNo:null,
    defaultG:null
  },
  mutations: { //定义方法：set方法，用于给数据赋值
    setUid:function (state,uid) {
      state.uid = uid;
    },
    setRole:function (state, role) {
      state.role = role;
    },
    setUname:function (state, username) {
      state.username = username;  //将外部参数赋值给state对象中的数据
    },
    setUpwd:function (state, password) {
      state.password = password;
    },
    setClassNo:function (state, classNo) {
      state.classNo = classNo;
    },
    setDefault:function (state, defaultG) {
      state.defaultG = defaultG;
    }
  },
  actions:{
    //作用同mutations，提供方法给数据赋值
    //调用mutations中的方法，类似于dao的service关系
    //支持异步操作
    setRole:function (context,role) {
      context.commit("setRole",role);
    },
    setUid:function (context,uid) {
      //第一个参数为mutation对象，第二个为传递进来的数据
      context.commit("setUid",uid);
    },
    setUname:function (context,username) {
      //第一个参数为mutation对象，第二个为传递进来的数据
      context.commit("setUname",username);
    },
    setUpwd:function (context,password) {
      context.commit("setUpwd",password);
    },
    setClassNo:function (context,classNo) {
      context.commit("setClassNo",classNo);
    },
    setDefault:function (context,defaultG) {
      context.commit("setDefault",defaultG);
    }
  }
});
export default store;
