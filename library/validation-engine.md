# [jQuery.validationEngine v2.6.2](https://github.com/posabsolute/jQuery-Validation-Engine)

## [A jQuery inline form validation, because validation is a mess](http://www.position-absolute.com/articles/jquery-form-validator-because-form-validation-is-a-mess/)

### hide

```javascript
$('#formID1').validationEngine('hide')
```

### hideAll

```javascript
$('#formID1').validationEngine('hideAll');
```

### promptPosition
Where should the prompt show ? Possible values are “topLeft”, “topRight”, “bottomLeft”, “centerRight”, “bottomRight”. Defaults to *”topRight”*.

```html
<input value="" class="validate[required] text-input" type="text" name="req" id="req" data-prompt-position="bottomLeft" />

<input value="too many spaces obviously" class="validate[required,custom[onlyLetterNumber]]" type="text" name="special" id="special" data-prompt-position="bottomRight:-100,3" />
```

## 벨리데이션 툴팁 지우기

```javascript
setTimeout(function(){
    $("#app_placement__tbody .formError").fadeOut( "slow" );
}, 2000);
```
