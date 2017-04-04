# [Handling User Input with Forms](https://kr.vuejs.org/v2/guide/forms.html)

## Form Input Bindings - Modifiers

### .lazy
.lazy 수식어를 추가하여 change 이벤트 이후에 동기화 할 수 있습니다.
(포커스를 잃을 때)

```html
<input v-model.lazy="userData.password" />
```

### .number
사용자 입력이 자동으로 숫자로 형변환 (type="number"를 사용하는 경우에도 HTML 입력 엘리먼트의 값은 항상 문자열을 반환하기 때문에)

```html
<input v-model.number="age" type="number">
```

### .trim
v-model이 관리하는 input을 자동으로 trim

```html
<input v-model.trim="msg">
```

## Textarea
아래처럼 값을 전달하게 되면 줄바꿈을 했어도 출력되는 내용은 한 줄로 나온다.

```html
<textarea
  id="message"
  rows="5"
  class="form-control"
  v-model="userData.message"></textarea>

<p>Message: {{ userData.message }}</p>
```

### 멀티라인 나와랏!

```html
<p style="white-space: pre;">Message: {{ userData.message }}</p>
```

## Checkbox
- 하나의 체크박스는 단일 boolean 값을 가집니다.  
- 여러개의 체크박스는 같은 배열을 바인딩 할 수 있습니다.  
- (true, false했을 때의 값을 array로 전달한다.)

**sendMail을 빈 배열로 지정했다.**
```javascript
export default {
    data() {
        return {
            sendMail: []
        }
    }
}
```

**v-model로 받은 배열값을 list로 보여준다.**
```html
<div class="form-group">
    <label for="sendmail">
        <input
                type="checkbox"
                id="sendmail"
                value="SendMail"
                v-model="sendMail"> Send Mail
    </label>
    <label for="sendInfomail">
        <input
                type="checkbox"
                id="sendInfomail"
                value="SendInfoMail"
                v-model="sendMail"> Send Infomail
    </label>
</div>

<ul>
    <li v-for="item in sendMail">{{item}}</li>
</ul>
```

## Radio
- 라디오 버튼은 같은 v-model을 사용하게 되면 그룹지어진다.  
- `{{ gender }}` value 값을 출력한다.

```html
<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
    <label for="male">
        <input
                type="radio"
                id="male"
                value="Male"
                v-model="gender"> Male
    </label>
    <label for="female">
        <input
                type="radio"
                id="female"
                value="Female"
                v-model="gender"> Female
    </label>
</div>

<p>Gender: {{ gender }}</p>
```

```javascript
export default {
  data() {
      return {
          gender: 'Male'
      }
  }
}
```

## Select
- `:selected="priority == 'Medium'"` 기본값으로 선택된 대상을 선택할 수 있다.
- `v-model="selectedPriority"`값으로 위에서 정의한 값은 덮여진다.

```html
<select
        id="priority"
        class="form-control"
        v-model="selectedPriority">
    <option
            v-for="priority in priorities"
            :selected="priority == 'Medium'">{{ priority }}</option>
</select>
```

```javascript
export default {
    data() {
        return {
            priorities: ['High', 'Medium', 'Low']
        }
    }
}
```

## What v-model does and How to Create a Custom Control

**v-model**

```html
<input
  type="text"
  id="email"
  class="form-control"
  v-model.lazy="userData.email"
>
```

**Custom control**
@input = @change ??

```html
<input
  type="text"
  id="email"
  class="form-control"
  :value="userData.email"
  @input="userData.email = $event.target.value">
```
