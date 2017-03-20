# [Vue.js](https://kr.vuejs.org) 테스트하면서

## Build Setup

``` bash
$ npm install -g vue-cli
$ vue init <template-name> <project-name>
Settings...
$ npm run dev
```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](htt
p://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Template List

- webpack (recommendation)
- webapck-simple
- browserify
- browserify-simple
- simple

## npm version
npm 버전이 낮아서 다시 설치, 재부팅을 해야 제대로 적용되나 보다.

## warning
[stackoverflow - What does npm mean by 'Skipping failed optional dependency'?](http://stackoverflow.com/questions/35644708/what-does-npm-mean-by-skipping-failed-optional-dependency)  
fsevents 모듈의 warning에 대해 검색결과 에러가 아니고 optional dependency이 이므로
크게 신경쓰지 말라는 내용.

## parent -> child

### v-bind
동적 데이터를 자식 컴포넌트에 전달하고 싶다면 `v-bind` 디렉티브를 사용하면 된다. 이렇게 정수형, 실수형, 오브젝트, 배열 전부 전달이 가능하다.

## child -> parent

### v-on, $emit
부모 컴포넌트에 v-on 어떤 메서드를 받을지 명시,
그 후 자식 컴포넌트에서는 $emit을 통해 부모 컴포넌트에 이벤트를 전달할 수 있습니다.

## 사용자 지정 디렉티브

### 전역 디렉티브

```
// 전역 사용자 정의 디렉티브 v-focus 등록
Vue.directive('focus', {
    // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
    inserted: function () {
        // 엘리먼트에 포커스를 줍니다.
        el.focus()
    }
})
```

### 사용자 지정 디렉티브
전역이 아닌 지역, 즉 컴포넌트에만 할당할 수도 있습니다.

```
directive: {
    focus: {
        // 디렉티브 정의
    }
}
```

## Third-Party

- [vue-router](https://router.vuejs.org): SPA를 작성할 때 사용되는 라이브러리 입니다. route 기능, history 모드 제공, 뷰 전환 애니메이션 제공
- [vue-loader](https://vue-loader.vuejs.org): Vue.js를 위한 Webpack 로더 입니다. ES2015 지원, SASS, Jade와 같은 언어 설정 가능, 핫 리로딩 기능 지원, Lint 기능 지원, 유닛 테스트 지원
- [vue-resource](https://github.com/pagekit/vue-resource): Vue.js를 위한 HTTP 클라이언트 라이브러리 입니다. HTTP 통신 지원, Promise 지원
- [vuex](https://vuex.vuejs.org): Reduc와 유사한 Vue.js 용 상태 관리 패턴 라이브러리 입니다.
- [awesome vue](https://github.com/vuejs/awesome-vue): 라이브러리 모음
