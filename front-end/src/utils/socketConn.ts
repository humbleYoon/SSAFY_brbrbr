import io from 'socket.io-client'

const SOCKET_HOST = 'http://localhost:8181'

const socket = io.connect(SOCKET_HOST)

export default socket