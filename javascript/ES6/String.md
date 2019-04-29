# 字符串的扩展

## 字符串的`Unicode`表示法
```javascript
"\u0061"
// a
"\uD842\uDFB7"
// "𠮷"
"\u20BB7"
// "₻7"
// ES6加强了对Unicode的支持，允许采用 \uxxxx 形式表示一个字符，其中 xxxx 表示字符的 Unicode 码点。但是这种表示法只限与码点在 \u0000 ~ \uFFFF 之间的字符。超出这个范围的字符，必须用两个双字节的形式表示
```

## 字符串的遍历器接口
```javascript
for (let key of 'iterator') {
  console.log(key)
}
// i, t, e, r, a, t, o, r
```
`for...of`最大的优点是可以识别大于`0xFFFF`的码点，传统的`for`循环无法识别
```javascript
let text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
	console.log(text[i])
}
// �
// �
// text只包含一个字符，但for循环会认为它包含两个字符，且找不到对应字符
for (let key of text) {
	console.log(key)
}
// 𠮷
// for...of 可以正确打印
```

## 模板字符串
```javascript
// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
// ``可以当作普通字符串使用，也可以在其中嵌入变量
// ${} 大括号内部可以放入任意 javascript 表达式，可以进行运算以及引用对象属性

let x = 1;
let y = 2;
`${x} + ${y} = ${x + y}`

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`

// 在其中使用函数
function fn () {
	return 'hello world'
}
`yaya ${fn()}`
"yaya hello world"

// 如果大括号内部的值不是字符串，那么会按照规则将其转换为字符串
// 模板字符串可以嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```