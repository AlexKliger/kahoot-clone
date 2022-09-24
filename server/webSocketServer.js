const ws = require('ws')

let wsServer

module.exports = {
    initSocketServer: (server) => {
        // Start websocket server with http server and cache.
        wsServer = new ws.WebSocketServer({server: server})
        wsServer.on('connection', (ws, req) => {
            console.log('connection made with socket:', req.socket.remoteAddress)
            ws.on('message', (message) => {
                console.log('message received:', message)
            })
        })
    
        return wsServer
    },
    getSocketServer: () => {
        // Return previously cached server.
        return wsServer
    }
}