# 浏览器缓存机制

使用良好的缓存策略可以降低资源的重复加载，以此来提高网页的加载速度。浏览器缓存分为强缓存与协商缓存

## 强缓存
强缓存通过`Expires`以及`Cache-Control`来实现，优先级`Cache-Control`更高
- `Expires`: 表示资源的过期时间，其值为绝对时间，由服务器返回。该值受限于本地时间，如果修改了本地时间，可能会造成缓存失效
```javaScript
Expires: Wed, 11 May 2018 07:20:00 GMT
```
- `Cache-Control`: 优先级高于`Expires`，表示的是相对时间
```javaScript
Cache-Control: max-age=315360000
```

## 协商缓存
当浏览器没有配置强缓存，则会发送一个请求到服务器，判断是否从本地缓存中读取还是从服务器返回最新资源。这种询问服务器的方式就叫做协商缓存。如果命中了协商缓存，那么请求响应的`http`状态码返回为`304`

协商缓存的协商机制主要是通过`If-Modified-Since`、`Last-Modified`以及`If-None-Match`、`Etag`来进行协商的

- `If-Modified-Since`与`Last-Modified`
浏览器会在请求头中添加`If-Modified-Since`(值为上次服务器返回`Last-Modified`的值)头部，询问服务器在该时间之后是否有更新，如果有更新，则发送最新资源，否则返回`304`

// TODO: 具体修改场景以及原因 ？
但是如果在本地打开缓存文件，就会造成 Last-Modified 被修改，所以在 HTTP / 1.1 出现了 ETag

- `If-None-Match`与`Etag`
`Etag`类似一个标识，资源的变化会导致`Etag`变化，与资源的修改时间没有关系，`Etag`可以保证每一个资源的唯一性

浏览器在请求时会在请求头中添加`If-None-Match`(值为上次返回的`Etag`)字段，服务器会让该字段与当前资源的字段进行比较，如果值不一致，则将新资源返回，否则返回304

> 注意: `Etag`的优先级高于`Last-Modified`

使用`Etag`的原因：
- 某些文件会周期性的更改，会导致修改时间改变，但其本身内容并没有修改，这个时候并不希望重新获取资源
- `If-Modified-Since`只能检测到秒级的时间改变，如果在1秒内进行了多次改变，不能探测到
- 某些服务器不能准确得到文件的最后修改时间
 
## 浏览器缓存流程
- 浏览器会首先检测强缓存类型(`Cache-Control`或者`Expires`)是否有效
- 强缓存有效，则从本地缓存中获取资源
- 强缓存无效，则浏览器会进行协商缓存，发送请求(请求头中添加相应字段进行验证)到服务器，服务器根据客户端发送的头部字段进行验证，如果协商缓存有效，服务器返回304，否则返回最新资源

## 不会缓存的情况
- `HTTP`头部包含`Cache-Control: no-store`或者`Cache-Control: max-age=0`
- 需要根据`cookie`等认证信息的动态请求不能被缓存
- 经过`HTTPS`安全加密的请求
- `POST`请求无法被缓存
- `HTTP`响应头中不包含`Last-Modified/Etag`字段也不包含`Control-Cache/Expires`字段


参考
- [缓存（二）——浏览器缓存机制：强缓存、协商缓存](https://github.com/amandakelake/blog/issues/41)
- [聊一聊浏览器缓存机制](http://jartto.wang/2019/02/14/web-cache/)