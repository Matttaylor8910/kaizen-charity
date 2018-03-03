
'use strict'

const express = require('express')
const proxy = require('express-http-proxy')
const bodyParser = require('body-parser')
const _ = require('lodash')
const config = require('./config')

let app = express()

if (config('PROXY_URI')) {
  app.use(proxy(config('PROXY_URI'), {
    forwardPath: (req, res) => { return require('url').parse(req.url).path }
  }))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.send('\n 👋 🌍 \n') })

app.post('/donate', (payload, res) => {
  // let data = {
  //   response_type: 'in_channel', // public to the channel
  //   text: '302: Found',
  //   attachments: [{
  //     image_url: 'https://http.cat/302.jpg'
  //   }]
  // };

  let data = {
    response_type: 'in_channel',
    text: JSON.parse(payload)
  }

  res.set('content-type', 'application/json')
  res.status(200).json(msg)

  res.json(data);
})
