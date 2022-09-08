export function log<T>(str:T): T {
  console.log(str)
  return str
}

const lo1 = log('123')

function name(params: string): string {
  return params
}
let n: string = name('123')

interface IdFunc<Type> {
  myname: (value: Type) => Type[],
  ids: () => Type[]
}
let obj: IdFunc<string> = {
  myname: (value: string) => [value],
  ids: () =>  ['1']
}

const str = ['1', '2', '3']
str.forEach()
const num = [1, 2, 2]
num.forEach