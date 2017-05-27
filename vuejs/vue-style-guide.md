# [Vue.js 컴포넌트 스타일 가이드](https://vuejs-kr.github.io/jekyll/update/2017/03/13/vuejs-component-style-guide/)

## Vue 컴포넌트 이름
- 발음 가능한: 컴포넌트에 대해 이야기 할 수 있어야 한다.
- `app-` 네임스페이스: 매우 일반적이고 한 단어라면 다른 프로젝트에서 쉽게 재사용할 수 있습니다.

## 컴포넌트 (인라인) 표현식을 단순하게 사용하기
methods, computed 속성 사용하기

### 왜?
- 복잡한 인라인 표현식은 읽기 어렵다.
- 인라인 표현식은 다른 곳에서 재사용할 수 없다.
- IDE에서 자동완성과 유효성 검사를 할 수 없다.

## 컴포넌트 props를 원시 자료형으로 사용하기
JavaScript 원시 값 및 함수만을 사용하고 복잡한 Object는 피하는게 좋다.

## 컴포넌트 props를 잘 사용하기
- props에 기본 값을 사용
- 값을 validate하기 위해 type 옵션을 사용
- 중복된 props가 있는지 확인

## `this`를 `component`에 지정하기
Vue.js 컴포넌트 엘리먼트의 컨텍스트 내에서 `this`는 컴포넌트 인스턴스에 바인딩된다. 더이상 `const self = this;`와 같은 코드를 사용하지 마라.

## 컴포넌트 구조
생각에 순서에 따라 컴포넌트 구조를 만들자. 아래 템플릿을 참고하자.

```html
<template lang="html">
	<div class="Ranger__Wrapper">
		<!-- ... -->
	</div>
</template>

<script type="text/javascript">
  export default {
		// 이름 적는 것을 잊지마세요
    name: 'RangeSlider',
    // compose new components
    extends: {},
    // 컴포넌트 어트리뷰트 그룹
    props: {
			bar: {}, // 알파벳순으로 정렬합니다
			foo: {},
			fooBar: {},
		},
    // 컴포넌트 변수 그룹
    data() {},
    computed: {},
    // 컴포넌트가 다른 컴포넌트를 사용할 경우
    components: {},
    // 컴포넌트 메서드 그룹
    watch: {},
    methods: {},
    // 컴포넌트 라이프사이클 메서드 그룹
    beforeCreate() {},
    mounted() {},
};
</script>

<style scoped>
  .Ranger__Wrapper { /* ... */ }
</style>
```

## 컴포넌트 이벤트 이름
- 이벤트 이름은 하이픈으로 구분???

## `this.$parent` 피하기
- 어트리뷰트/프로퍼티를 사용하여 부모에서 자식 컴포넌트로 값 전달
- 어트리뷰트 표현식에서 콜백을 사용하여 부모 컴포넌트에 정의된 메소드를 자식 컴포넌트로 전달
- 자식 컴포넌트에서 이벤트를 emit하여 부모 컴포넌트에서 이벤트 발생

### 왜?
- Vue 컴포넌트는 다른 모든 컴포넌트와 마찬가지로 독립적으로 작동해야 한다.
- 컴포넌트가 부모에 접근하는 경우 다른 곳에서 재사용할 수 없습니다.

## `this.$refs`를 주의하여 사용하기
Vue.js는 컴포넌트가 ref 어트리뷰트를 통해 다른 컴포넌트와 기본 HTML 엘리먼트에 접근 할 수 있도록 지원합니다.

## 범위 스타일에 컴포넌트 이름 사용하기
- `scoped`를 사용하면 외부에 스타일이 적용되지 않으므로 예측 가능성이 향상한다.
- 컴포넌트와 스타일의 루트 이름을 모듈 디렉토리와 동일한 이름으로 사용하면 개발자가 이해하기 좀 더 쉽다.

## 컴포넌트 API를 문서화 하기
- 다른 개발자가 컴포넌트를 사용하는 경우 이러한 사용자 지정 어트리뷰트를 README.md 파일에 문서화해야 한다.
- README.md 파일에서 모듈의 기능 및 사용법을 적느다.

## 컴포넌트 예제 추가하기
index.html 파일을 추가하여 컴포넌트의 사용 방법을 보여준다.

## 컴포넌트 파일을 Lint하기
Lint는 코드 일관성을 개선하고 구문 오류를 추적하는 것을 도와준다.
