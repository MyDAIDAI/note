var anotherObject = {
  a: 2
}
// Object.defineProperty(anotherObject, 'a', {
//   value: 2,
//   writable: true
// })
var b = Object.create(anotherObject)
b.a++
console.log(b.a, anotherObject.a)