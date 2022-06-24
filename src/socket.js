import { io } from 'socket.io-client';

const way = 'amarsik-games-node.herokuapp.com:3012';

export default io(way, { transports: ['websocket'] });
