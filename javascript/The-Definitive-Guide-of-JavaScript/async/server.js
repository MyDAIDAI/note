//首先加载express
const express = require('express')
const app = express()
//端口号
const port = 3000

//这里仅列举发送GET请求
app.get('/api/test1',(req,res) =>{
  res.send('test1')
})

app.get('/api/test2',(req,res) =>{
  res.send('test2')
})

app.get('/api/test3',(req,res) =>{
  res.send('test3')
})


app.listen(port,() => console.log('server is start,port is', port))

