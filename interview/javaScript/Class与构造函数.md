# Class与构造函数

- `javaScript`构造函数

  ```javascript
  function MathHandler(x, y) {
      this.x = x
      this.y = y
  }
  MathHandler.prototype.add = function () {
      return this.x + this.y
  }
  const m = new MathHandler(2, 3)
  console.log(m.add()) // 5
  ```

- `Class`基本语法

  ```javascript
  class MathHandlerClass {
      construtor (x, y) {
          this.x = x
          this.y = y
      }
      add () {
          return this.x + this.y
      }
  }
  let m1 = new MathHandlerClass(2, 3)
  console.log(m.add()) // 5
  ```

- 语法糖

  - `class`为构造函数的语法糖，只是为了方便学习
  - `typeof MathHandlerClass` --> `function`
  - `MathHandlerClass === MathHandlerClass.prototype.constructor`  --> `true`
  - `m1.__proto__` === `MathHandlerClass.prototype` --> `true`

- 继承

  - 构造函数继承

    - 借用构造函数
    - 组合继承
    - 原型式继承
    - 寄生式继承
    - 寄生组合式继承

  - `class`继承

    ```javascript
    class subType extends superType {
        constructor() {
            super()    // 必须先调用父类构造函数
        }
    }
    ```
