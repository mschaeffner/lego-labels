var http = require("http")
var pdf = require('html-pdf')
var express = require('express')
var app = express()

var pageConfig = {
  "format": "A4",
  "orientation": "portrait",
  "border": {
    "top": "0.5cm",
    "right": "0.5cm",
    "bottom": "0.5cm",
    "left": "0.5cm"
  }
}

app.get('/', function (req, res) {

  var url = 'http://localhost:3000/?printMode=true&selectedImagesIndexes=' + req.query.selectedImagesIndexes
  http.get(url, function(response) {

    response.setEncoding('utf8')
    var html = ''

    response.on('data', function(chunk) {
      html += chunk
    })

    response.on('end', function() {
      pdf.create(html, pageConfig).toBuffer(function(err, buffer) {
        res.set({'Content-Disposition': 'attachment; filename="lego.pdf"'})
        res.send(buffer)
      })
    })

  })

})

app.listen(4000)
