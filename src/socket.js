import { io } from 'socket.io-client';

const way = 'http://amarsik-games-node.herokuapp.com:3012';

export default io(way, { transports: ['websocket'] });
