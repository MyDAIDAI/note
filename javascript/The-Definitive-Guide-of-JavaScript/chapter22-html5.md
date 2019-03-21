# `HTML5 API`
## 地理位置
地址位置`api`允许`javascript`程序向浏览器询问用户真实的地理位置。

在支持地理位置`API`的浏览器中会定义`navigator.geolocation`属性，该属性有下面一些方法
- `navigator.geolocation.getCurrentPosition()`: 获取用户当前位置
- `navigator.geolocation.watchPosition()`: 获取当前位置，同时不断地监视当前位置，一旦用户位置发生更改，会调用指定的回调函数
- `navigator.geolocation.clearWatch()`: 停止监视用户位置。传递给这个方法的参数应该是调用`watchPosition()`方法的返回值

这些地理位置相关的技术都包含通过网络的数据交换或者和多个卫星之间的通信，因此这个方法都是异步的，`getCurrentPosition`与`watchPosition`方法需要传递回调函数作为参数。会向回调函数中传入位置对象，该对象中包含获取到的地理位置信息以及精度值等信息

```javascript
function getMap () {
  if (!navigator.geolocation) throw "Geolocation not supported"

  var image = document.createElement('img')
  navigator.geolocation.getCurrentPosition(setMapUrl)
  return image;
  function setMapUrl(pos) {
    var latitude = pos.coords.latitude
    var longtitude = pos.coords.longtitude
    var accuracy = pos.coords.accuracy

    var url = "http://maps.google.com/maps/api/staticmap" +
        "?center=" + latitude + "," + longtitude + "&size=640x640&sensor=true"

    var zoomlevel = 20
    if (accuracy > 80) {
        zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2)
    }
    url += "&zoom=" + zoomlevel
    image.src = url
  }
}
```
传入`getCurrentPosition()`与`watchPosition()`方法的参数：
- 第一个参数，获取地理位置成功之后的回调函数
- 第二个参数，获取地理位置失败之后的回调函数
- 第三个参数，配置对象，该对象的属性指定了是否需要高精度的位置信息，过期时间以及允许系统在多长时间内获取位置信息

最后，传入回调函数的参数对象，除了包含地理位置，精度等信息之外，可能还包含海拔、速度和航向之类的额外信息

