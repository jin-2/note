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

## Router의 name 값으로 이동하기

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

## query parameters 붙이기

- 쿼리가 있으면 `/user/1/edit?locale=en&q=100` 링크 나온다.

```html
<template>
  <div>
    <h3>Some User Details</h3>
    <router-link
      tag="button"
      class="btn btn-primary"
      :to="{name: 'userEdit', params: {id: $route.params.id}, query: { locale: 'en', q: 100 }}">
      Go Edit Page</router-link>
  </div>
</template>
```

- 쿼리를 수정(edit)화면에 출력하는 방법

```html
<template>
    <div>
      <h3>Edit the User</h3>
      <p>Locale: {{ $route.query.locale }}</p>
      <p>Analytics: {{ $route.query.q }}</p>
    </div>
</template>
```

## `<router-view>`에 [이름 붙여](https://router.vuejs.org/en/essentials/passing-props.html) 여러개 사용하기

- `App.vue` 파일에 `<router-view>` 여러개 정의하고 `name` 붙인다.

```html
<template>
  <div id="app">
    <router-view name="header-top"></router-view>
    <router-view></router-view>
    <router-view name="header-bottom"></router-view>
  </div>
</template>
```

- `router.js`에 `components` 값을 정의한다.
- hello 페이지에서는 header가 위로, user 페이지에서는 header 밑으로 위치한다.

```javascript
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default: Hello,
        'header-top': Header
      }
    },
    {
      path: '/user',
      name: 'User',
      components: {
        default: User,
        'header-bottom': Header
      },
      children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail },
        { path: ':id/edit', component: UserEdit, name: 'userEdit' },
    ]
    }
  ]
})
```

## Redirecting

- `router.js` 파일에 아래 코드를 추가하고 `redirect` 속성을 통해서 이동시킨다.

```javascript
{ path: '/something', redirect: '/' }
```

- 물론, name 값으로 정의할 수 있다.

```javascript
{ path: '/something', redirect: { name: 'user' } }
```

- `/something` 페이지가 아닌 다른 페이지(/aaa)들도 이동시키고 싶다면

```javascript
{ path: '*', redirect: '/' }
```

## [scrollBehavior](https://router.vuejs.org/kr/advanced/scroll-behavior.html)
클라이언트 측 라우팅을 사용할 때 새로운 경로로 이동할 때 맨 위로 스크롤하거나
실제 페이지를 다시 로드하는 것처럼 컨텐츠 항목의 스크롤 위치를 유지할 수 있습니다.  
**참고: 이 기능은 HTML5 히스토리 모드에서만 작동합니다.**

**main.js**

```javascript
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})
```
## [Navigation Guards](https://router.vuejs.org/kr/advanced/navigation-guards.html)
네비게이션이 트리거될 때마다 가드가 작성 순서에 따라 호출되기 전의 모든 경우에
발생합니다. 가드는 비동기식으로 실행 될 수 있으며 네비게이션은 모든 훅이 해결되기
전까지 보류 중 으로 간주됩니다.

### 전역가드: BeforeEach

**항상 next 함수를 호출하십시오. 그렇지 않으면 훅이 절대 불러지지 않습니다.**

- main.js

```javascript
router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next();
})
```

### 라우터 별 가드: beforeEnter

beforeEnter 가드를 라우트의 설정 객체에 직접 정의 할 수 있습니다.

```javascript
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User,
      props: true,
      children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail, beforeEnter: (to, from, next) => {
          console.log('Inside router setup');
          next();
        } },
        { path: ':id/edit', component: UserEdit, name: 'userEdit' },
      ]
    }
  ]
})
```

### 컴포넌트 내부 가드

- beforeRouteEnter
  - 렌더링하는 라우터 앞에 호출합니다.
  - 이 가드가 생성될 때 아직 생성되지 않았기 때문에
  - `this` 컴포넌트 인스턴스에 접근할 수 없습니다.
- beforeRouteUpdate (2.2 버전에 추가)
- beforeRouteLeave
  - 이 컴포넌트를 렌더링하는 라우트가 이전으로 네이게이션 될 때 호출됩니다.
  - `this` 컴포넌트 인스턴에 접근할 수 있습니다.

#### `beforeRouteEnter`

```javascript
beforeRouteEnter(to, from, next) {
    if (true) {
        next();
    } else {
        next(false);
    }
}
```

- 콜백을 `next`에 전달하여 인스턴스에 액세스 할 수 있습니다.

```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // `vm`을 통한 컴포넌트 인스턴스 접근
  })
}
```

#### `beforeRouteLeave`
leave 가드는 일반적으로 사용자가 저장하지 않은 편집 내용을 두고 실수로 라우트를
떠나는 것을 방지하는데 사용됩니다.

```html
<template>
  <div>
    <h2>User Edit</h2>
    <button class="btn btn-primary" @click="confirmed = true">Confirm {{ confirmed }} </button>
    <div style="height: 700px;"></div>
    <p id="data">hash area</p>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          confirmed: false
        }
    },
    beforeRouteLeave(to, from, next) {
      if (this.confirmed) {
          next();
      } else {
          if (confirm('Are you sure?')) {
            next();
          } else {
            next(false);
          }
      }
    }
  }
</script>
```

## [Loading Routes Lazily](https://router.vuejs.org/kr/advanced/lazy-loading.html)
- 번들러를 이용하여 앱을 제작할 때 JavaScript 번들이 상당히 커져 페이지로드 시간에
영향을 줄 수 있습니다. 각 라우트의 컴포넌트를 별도의 단위로 분할하고 경로를
방문할 때 로드하는 것이 효율적일 것입니다.
- 크롬 개발자도구 네트워크 탭에서 확인할 수 있다.

**router.js**
- 라우트 컴포넌트를 비동기 컴포넌트로 정의
- 같은 묶음으로 그룹화

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import User from '@/components/user/User'
// import UserStart from '@/components/user/UserStart'
// import UserDetail from '@/components/user/UserDetail'
// import UserEdit from '@/components/user/UserEdit'

Vue.use(Router)

const User = resolve => {
  require.ensure(['@/components/user/User.vue'], () => {
    resolve(require('@/components/user/User.vue'));
  }, 'user');
};

const UserStart = resolve => {
  require.ensure(['@/components/user/UserStart.vue'], () => {
    resolve(require('@/components/user/UserStart.vue'));
  }, 'user');
};

const UserDetail= resolve => {
  require.ensure(['@/components/user/UserDetail.vue'], () => {
    resolve(require('@/components/user/UserDetail.vue'));
  }, 'user');
};

const UserEdit = resolve => {
  require.ensure(['@/components/user/UserEdit.vue'], () => {
    resolve(require('@/components/user/UserEdit.vue'));
  }, 'user');
};

export default new Router({
  // ...
})
```
