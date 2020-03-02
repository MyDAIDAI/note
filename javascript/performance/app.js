const express = require('express');
const app = express();

app.get('/jsonp', function (req, res) {
  res.jsonp({ user: 'tobi' })
});

app.listen(3000, function() {
  console.log('example app listening on port 3000!')
})