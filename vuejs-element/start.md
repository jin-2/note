# [Vuejs Element](http://element.eleme.io/#/en-US/component/installation)

- [import 순서가 중요하다.](https://github.com/eslint/eslint/issues/5583)
- 언어설정 `en`만 불러서 한다.

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'; // 언어 가져오기
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
```

## Sass

- [Sass 따로 설치](https://vuejs-kr.github.io/jekyll/update/2017/01/17/vuejs-external-css-library/) 후 적용해야 한다.

```
$ npm install sass-loader node-sass --save-dev
```

- `*.vue` 파일의 스타일 블럭에 `lang='scss'` 속성을 추가한다.

## Custom theme

1. 테마 설치

```
npm i element-theme -g
```

2. 기본 테마 설치

```
npm i element-theme-default -D
```

3. 초기화(변수 파일 생성 - element-variables.css)

```
et -i
```

4. `element-variables.css`파일을 수정 후 [적용](http://element.eleme.io/#/en-US/component/custom-theme#build-theme)
`/theme` 디렉토리가 생기며 파일 생성

```
// once
et

// watch
et -w
```
