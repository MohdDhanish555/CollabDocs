import { io, Socket } from "socket.io-client";

const socket: Socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  autoConnect: true,
});

export default socket;
