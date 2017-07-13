# [Axios](https://github.com/mzabriskie/axios)

## [express와 vue를 이용한 개발 환경 구성 살펴보기](https://vuejs-kr.github.io/2017/02/05/express-with-vue/)

```javascript

// main.js 설정
Vue.prototype.$http = axios;

// 값 받아서 movies에 주기
export default {
  created () {
    this.$http.get('/api/movies')
    .then((response) => {
      this.movies = response.data
    })
  },
  data () {
    return {
      movies: []
    }
  }
}

// params 던지기
export default {
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/movies/${id}`)
    .then((response) => {
      this.movie = response.data
    })
  },
  data: function () {
    return {
      movie: {}
    }
  }
}

```

## [Vue.js REST API Consumption with Axios](https://alligator.io/vuejs/rest-api-axios/)

### Pushing Data with a POST Request

```html
<template>
  <input type="text" v-model="postBody" @change="postPost()"/>
  <ul v-if="errors && errors.length">
    <li v-for="error of errors">
      {{error.message}}
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    postBody: '',
    errors: []
  }),

  // Pushes posts to the server when called.
  postPost() {
    axios.post(`http://jsonplaceholder.typicode.com/posts`, {
      body: this.postBody
    })
    .then(response => {})
    .catch(e => {
      this.errors.push(e)
    })

    // async / await version (postPost() becomes async postPost())
    //
    // try {
    //   await axios.post(`http://jsonplaceholder.typicode.com/posts`, {
    //     body: this.postBody
    //   })
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
}
</script>
```

### A Common Base Instance([Axios github page](https://github.com/mzabriskie/axios#creating-an-instance))

> 공통 기본 URL 및 구성을 공유 할 수 있도록 기본 인스턴스를 생성하는 기능을 제공합니다.

http-common.js

```javascript
import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
```

위의 내용 사용

```javascript
import {HTTP} from './http-common';

export default {
  data: () => ({
    posts: [],
    errors: []
  }),

  created() {
    HTTP.get(`posts`)
    .then(response => {
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
```

## [How to Use Axios as Your HTTP Client](http://codeheaven.io/how-to-use-axios-as-your-http-client/)

### Sending custom headers with axios

```javascript
var config = {
  headers: {'X-My-Custom-Header': 'Header-Value'}
};

axios.get('https://api.github.com/users/codeheaven-io', config);
axios.post('/save', { firstName: 'Marlon' }, config);
```
