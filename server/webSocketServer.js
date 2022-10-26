const socket = require("socket.io")

let io

module.exports = {
    initSocketServer: (httpServer) => {
        io = new socket.Server(httpServer)
        io.on("connection", (socket) => {
            console.log('user connected to socket')
            socket.on('disconnect', () => {
                console.log('user disconnected from socket')
            })
        })

        return io
    },
    getSocketServer: () => {
        return io
    }
}