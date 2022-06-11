import { io } from 'socket.io-client';

const way = 'http://192.168.31.150:3012';

export default io(way, { transports: ['websocket'] });
