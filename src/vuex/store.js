import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{ //状态，要管理的数据
    count:0,
    uid:null,
    password:null
  },
  mutations: { //定义方法：set方法，用于给数据赋值
    setUid:function (state, uid) {
      state.uid = uid;  //将外部参数赋值给state对象中的数据
    },
    setUpwd:function (state, password) {
      state.password = password;
    }
  },
  actions:{
    //作用同mutations，提供方法给数据赋值
    //调用mutations中的方法，类似于dao的service关系
    //支持异步操作
    setUser:function (context,uid) {
      //第一个参数为mutation对象，第二个为传递进来的数据
      context.commit("setUid",uid);
    },
    setUpwd:function (context,password) {
      context.commit("setUpwd",password);
    }
  }
})
export default store;
