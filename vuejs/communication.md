# Communicating between Components

## Composing Components(컴포넌트의 조작)
Vue.js에서 부모-자식 컴포넌트 관계는 **props는 아래로, events 위로** 라고 요약할 수
있습니다. 부모는 props를 통해 자식에게 데이터를 전달하고, 자식은 events를 통해
부모에게 메시지를 보냅니다.

```html
<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my Name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :myName="name"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        },
        data: function() {
            return {
                name: 'Bem'
            }
        },
        methods: {
            changeName() {
                this.name = 'anna';
            }
        }
    }
</script>
```

```html
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ switchName() }}</p>
    </div>
</template>

<script>
    export default {
        props: ['myName'],
        methods: {
            switchName() {
                return this.myName.split('').reverse().join('');
            }
        }
    }
</script>
```

## [Validating "props"](https://kr.vuejs.org/v2/guide/components.html#Prop-검증)
컴포넌트가 받는 중인 prop에 대한 요구사항을 지정할 수 있습니다. 요구사항이 충족 되지 않으면 Vue에서 경고를 내보냅니다. 이 기능은 다른 사용자가 사용할 컴포넌트를 제작할 때 특히 유용합니다.

```javascript
Vue.component('example', {
  props: {
    // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
    propA: Number,
    // 여러개의 가능한 타입
    propB: [String, Number],
    // 문자열이며 꼭 필요합니다
    propC: {
      type: String,
      required: true
    },
    // 숫자이며 기본 값을 가집니다
    propD: {
      type: Number,
      default: 100
    },
    // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 사용자 정의 유효성 검사 가능
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
