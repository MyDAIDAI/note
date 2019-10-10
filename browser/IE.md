# `IE`浏览器兼容问题总结

## 对`vue`框架的兼容

- 不兼容`this.$router.push()`方法
  - 兼容办法：监听`hashchange`事件
  
  ```javascript
  function checkIE () {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }

    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  ```

## 对`css`的兼容

- `IE`下的`display`没有`inline-block`属性，某些情况下可以使用`inline-table`代替

## 对`js`的兼容

- `checkbox`的`click`事件的返回值与`chrome`不同
  - `chrome`返回点击事件之前的值
  
  - `IE`返回点击事件之后的值

- 跨域时`Access-Control-Expose-Headers`在`IE`下不能设置为通配符`*`，必须设置为具体字段

- `IE`下的`URL`对于中文会转为乱码，必须使用`encodeURI`方法进行转码

- 文件下载
  
  ```javascript
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(res.data, 'filename') // for IE
    } else {
      let url = window.URL.createObjectURL(res.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName || '案件信息.zip')
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    }
  ```
