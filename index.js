const config = require('./config.json')
const mqtt = require('mqtt')
var client = mqtt.connect(config.mqtt.host)

const say = require('say')

client.on('connect', function () {
  client.subscribe(config.mqtt.topic, function (err) {
    if (err) {
      console.error(err)
    }
  })
})

client.on('message', function (topic, message) {
  let json = JSON.parse(message.toString())
  if (json.type === 'text') {
    say.speak(json.content, config.voice, 1.0)
  }
})