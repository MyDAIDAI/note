

function requestPool(urls, maxCount, cb) {
  let count = maxCount;
  let index = 0;
  const results = []
  function next() {
    let url = urls[index];
    request(url, index, cb);
    index++;
    while (count > 0) {
      next()
    }
  }
  
  function request(url, index, cb) {
    count--;
    fetch(url).then(response => {
      results[index] =response 
    }).catch(err => {
      results[index] = err  
    }).finally(() => {
      if(count <=maxCount && count > 0) {
        next()
      }
      if(urls.length - 1 === index) {
        cb(urls, results)
      }
      count++
    })
  }
}