// 1. Merging with smaller auxiliary array. 
// Suppose that the subarray 𝚊[𝟶] to 𝚊[𝚗−𝟷] is sorted and the subarray 𝚊[𝚗] to 𝚊[𝟸∗𝚗−𝟷] is sorted. 
// How can you merge the two subarrays so that 𝚊[𝟶] to 𝚊[𝟸∗𝚗−𝟷] is sorted using an auxiliary array of length n (instead of 2n)?
function mergeWithSmallerAuxiliaryArray (arr) {
  let N = Math.floor(arr.length / 2)
  let aux = []
  for (let index = 0; index < N; index++) {
    let item = arr[index];
    aux[index] = item
  }
  let i = 0; 
  let j = N;
  let k = 0
  while (i < N && j < 2 * N) {
    if (aux[i] < arr[j]) {
      arr[k++] = aux[i++]
    } else if(aux[i] > arr[j]) {
      arr[k++] = arr[j++]
    }
  }
  if (i >= N) {
    arr[k++] = arr[j++]
  } else if (j >= 2 * N){
    arr[k++] = arr[i++]
  }
}

let arr = [1, 2, 5, 8, 9, 3, 6, 7, 10, 20]
console.log(mergeWithSmallerAuxiliaryArray(arr, 0, arr.length - 1))

// 2. Counting inversions. 
// An inversion in an array a[\,]a[] is a pair of entries a[i]a[i] and a[j]a[j] such that i < ji<j but a[i] > a[j]a[i]>a[j]. 
// Given an array, design a linearithmic algorithm to count the number of inversions.


// 3. Shuffling a linked list.
//  Given a singly-linked list containing nn items, 
// rearrange the items uniformly at random. 
// Your algorithm should consume a logarithmic (or constant) amount of extra memory and run in time proportional to n \log nnlogn in the worst case.