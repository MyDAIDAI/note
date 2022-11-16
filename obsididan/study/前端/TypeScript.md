
## typeof

`typeof`可以将`javaScript`的值转换为类型`types`
```typescript
// 将对象转为类型
const fnObj = {  
  name: 'name1',  
  age: 2  
}

// Initial type: {name: string, age: number} =》 interface类型
type fnObjType = typeof fnObj;

function fn() {  
  return {  
    name: 'name',  
    age: 1,  
  }  
}

// Initial type: () => {name: string, age: number} =》 function类型
type fnType1 = typeof fn;
// Initial type: {name: string, age: number} =》interface类型
type fnType1 = ReturnType<typeof fn>;

```


