import { io } from 'socket.io-client';

const way = 'amarsik-games-node.herokuapp.com';

export default io(way, { transports: ['websocket'] });
