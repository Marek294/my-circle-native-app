import io from "socket.io-client/dist/socket.io.js";

import config from './config';

var socket = io(config.baseUrl, { jsonp: false, transports: ['websocket'] });

export default socket;
