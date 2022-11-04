const socketIO = require("socket.io")

let io

module.exports = {
    initSocketServer: (httpServer) => {
        io = new socketIO.Server(httpServer)
        io.on("connection", (socket) => {
            console.log('user connected to socket')
            socket.on('disconnect', () => {
                console.log('user disconnected from socket')
            })

            socket.on('join room', (room) => {
                console.log('user joined room', room)
                socket.join(room)
            })
        })

        return io
    },
    getSocketServer: () => {
        return io
    }
}