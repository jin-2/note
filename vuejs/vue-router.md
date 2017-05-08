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
