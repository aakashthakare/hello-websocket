const express = require('express')
const { WebSocketServer } = require('ws')

express()
    .use((req, res) => res.sendFile('/index.html', { root: __dirname }))
    .listen(3000)

const socketServer = new WebSocketServer({ port: 443 })

socketServer.on('connection', ws => {
    ws.send('<b style="color:green">Connection Established!</b>')

    ws.on('message', data => {
        socketServer.clients.forEach(client => {
            client.send(`${data}`)
        })
    })
})