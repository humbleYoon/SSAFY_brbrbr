import io from 'socket.io-client'

const socket = io.connect(process.env.REACT_APP_SOCKET_HOST!)
console.log(process.env.REACT_APP_SOCKET_HOST)

export default socket
