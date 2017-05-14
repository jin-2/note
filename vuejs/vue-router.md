# vue-router

## Setting

```
npm install --save vue-router
```

**main.js**

```javascript
import VueRouter from 'vue-router';
import { routes } from './router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
```

## Hash VS [History](https://router.vuejs.org/kr/essentials/history-mode.html)

```javascript
const router = new VueRouter({
  routes,
  mode: 'history' or 'hash(default)'
});
```

## Router link

```html
<template>
  <ul class="nav nav-pills">
    <li role="presentation"><router-link to="/">Home</router-link></li>
    <li role="presentation"><router-link to="/user">User</router-link></li>
  </ul>
</template>
```

## Styling active links

- `tag`
- `active-class`
- `exact`: 기본설정된 클래스 제거?

```html
<template>
  <ul class="nav nav-pills">
    <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/user" tag="li" active-class="active"><a>User</a></router-link>
  </ul>
</template>
```

## route parameters

**routes.js**
```javascript
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    }
  ]
})
```

**header.vue**
```html
<template>
  <ul class="nav nav-pills">
    <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/user/10" tag="li" active-class="active"><a>User</a></router-link>
  </ul>
</template>
```

**user.vue**
```html
<template>
  <div>
    <h1>The User Page</h1>
    <hr>
    <p>Loaded ID: {{ id }}</p>
    <button @click="navigateToHome">Go to home</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id
      }
    },
    methods: {
      navigateToHome() {
        this.$router.push('/');
      }
    }
  }
</script>
```

## Changes in Route parameters

**header.css**

```html
<template>
  <ul class="nav nav-pills">
    <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/user/1" tag="li" active-class="active"><a>User 1</a></router-link>
    <router-link to="/user/2" tag="li" active-class="active"><a>User 2</a></router-link>
  </ul>
</template>
```

위 코드를 실행하면 URL parameter가 변경되지 않는다.  
그래서 아래 코드 **watch** 부분 추가

```javascript
  export default {
    data() {
      return {
        id: this.$route.params.id
      }
    },
    watch: {
      '$route'(to, from) {
        this.id = to.params.id;
      }
    },
    methods: {
      navigateToHome() {
        this.$router.push('/');
      }
    }
  }
```

### [vue-router 2.2: Extract Route Params via "props"](https://router.vuejs.org/kr/essentials/passing-props.html)

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './Hello.vue'

Vue.use(VueRouter)

function dynamicPropsFn (route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Hello }, // No props, no nothing
    { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    { path: '/static', component: Hello, props: { name: 'world' }}, // static values
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn } // custom logic for mapping between route and props
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
```

## Setting up child Routes(Nested Routes)

- **router.js**: children 정의

```javascript
export const routes = {
  { path: '', component: Home },
  { path: '/user', component: User, children: [
    { path: '', component: UserStart },
    { path: ':id', component: UserDetail },
    { path: ':id/edit', component: UserEdit },
  ]}
}
```

- **User.vue**: children을 보여줄 router-view 추가

```html
<router-view></router-view>
```

- `/user` 페이지에 children으로 이동할 router-link 추가

```html
<ul class="list-group">
  <router-link tag="li" to="/user/1" class="list-group-item">User 1</router-link>
  <router-link tag="li" to="/user/2" class="list-group-item">User 2</router-link>
  <router-link tag="li" to="/user/3" class="list-group-item">User 3</router-link>
</ul>
```

- `/UserDetail` 페이지에서 id 출력해보기

```html
<p>User loaded has ID: {{ $route.params.id }}</p>
```

- `/UserDetail` 페이지에서 수정페이지로 이동 버튼 만들기
- [router-link 한글 문서](https://router.vuejs.org/kr/api/router-link.html)

```html
<router-link tag="button" :to="'/user/' + $route.params.id + '/edit'" class="btn btn-primary">Edit User</router-link>
```

### Router의 name 값으로 이동하기

- **router.js** 의 `name`을 정의

```javascript
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      props: true,
      children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail },
        { path: ':id/edit', component: UserEdit, name: 'userEdit' },
      ]
    }
  ]
})
```

- `/UserDetail` 페이지에서 수정 페이지로 이동하는 버튼 링크 변경하기

```html
<router-link tag="button" :to="{ name: 'userEdit', params: {id: $route.params.id} }" class="btn btn-primary">Edit User</router-link>
```
