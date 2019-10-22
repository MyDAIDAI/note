// 常规数据类型遍历
let myFavouriteAuthors = [
  'nameA',
  'nameB',
  'nameC'
]
for (let index = 0; index < myFavouriteAuthors.length; index++) {
  console.log(myFavouriteAuthors[index])
}
let i = 0
while(i < myFavouriteAuthors.length) {
  console.log(myFavouriteAuthors[i])
  i++
}
for (const value of myFavouriteAuthors) {
  console.log(value)
}

// 将 myFavouriteAuthors 的数据结构变复杂一些

myFavouriteAuthors = {
  authors: {
    fiction: [
      'nameA',
      'nameB',
      'nameC'
    ],
    fantasy: [
      'nameD',
      'nameE',
      'nameF'
    ],
    science: [
      'nameG',
      'nameH',
      'nameI'
    ]
  }
}

// 如果我们要获取里面数组的所有值，按照常规的方法就需要进行多次
function getAllAuthors (myFavouriteAuthors) {
  const authors = []
  for (const value of myFavouriteAuthors.authors.fiction) {
    authors.push(value)
  }
  for (const value of myFavouriteAuthors.authors.fantasy) {
    authors.push(value)
  }
  for (const value of myFavouriteAuthors.authors.science) {
    authors.push(value)
  }
  return authors
}
console.log(getAllAuthors(myFavouriteAuthors))

// 使用 Iterator ，将其添加在 myFavouriteAuthors 对象上

myFavouriteAuthors = {
  authors: {
    fiction: [
      'nameA',
      'nameB',
      'nameC'
    ],
    fantasy: [
      'nameD',
      'nameE',
      'nameF'
    ],
    science: [
      'nameG',
      'nameH',
      'nameI'
    ]
  },
  [Symbol.iterator]() {
    let currentAuthorIndex = 0
    let currentGenresIndex = 0
    const genres = Object.values(this.authors)
    return {
      next () {
        const authors = genres[currentGenresIndex]
        if (!(currentAuthorIndex < authors.length) ) {
          currentGenresIndex++
          currentAuthorIndex = 0
        }
        if (!currentGenresIndex < genres.length) {
          return {
            value: undefined,
            done: true
          }
        }
        return {
          value: this.authors[currentGenresIndex][currentAuthorIndex],
          done: false
        }
      }
    }
  }
}
for (let value of myFavouriteAuthors) {
  console.log('value', value)
}

// Iterator 的小demo
let Iterator = {
  [Symbol.iterator] () {
    let step = 0
    return {
      next () {
        if (step < 5) {
          return {
            value: step++,
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}
var iterator = Iterator[Symbol.iterator]()
console.log(iterator.next().value)
console.log(iterator.next().value)
console.log(iterator.next().value)

let array = ['a', 'b', 'c', 'd']
let arrayIterator = array[Symbol.iterator]()
console.log(arrayIterator.next().value)
console.log(arrayIterator.next().value)
console.log(arrayIterator.next().value)
console.log(arrayIterator.next().value)
console.log(arrayIterator.next().value) // 值为undefined, 遍历结束

const myMap = new Map()
myMap.set('0', 'foo')
myMap.set(1, 'bar')
myMap.set({}, 'baz')
let mapIterator = myMap[Symbol.iterator]()
console.log(mapIterator.next().value)
console.log(mapIterator.next().value)
console.log(mapIterator.next().value)
console.log(mapIterator.next().value)
// 参考 https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e

const mySet = new Set(['a', 'b', 1, 'f'])
let mySetIterator = mySet[Symbol.iterator]()
console.log(mySetIterator.next().value)
console.log(mySetIterator.next().value)
console.log(mySetIterator.next().value)