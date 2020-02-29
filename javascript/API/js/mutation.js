function callbackFn(mutationList, observer) {
  mutationList.forEach(mutation => {
    console.log(mutation.type, mutation)
  })
}

let targetNode = document.querySelector('#list')
let observerOptions = {
  childList: true,
  attributes: true,
  subtree: true
}
let observer = new MutationObserver(callbackFn)
observer.observe(targetNode, observerOptions)