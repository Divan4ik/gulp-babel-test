import os from 'os';
import fs from 'fs';
import http from 'http';
import express from 'express';
import compression from 'compression';

const staticOptions = {
      maxAge: 0
    };

export default class Server {
	constructor(port) {
		this._app = express();
		this.post = port;
    this._appServer = http.createServer(this._app);
    this._app.use(compression());
		this._app.get('/', (request, response) => {
      response.send('ok');
		});
    this._app.use('/js', express.static('../public/js', staticOptions));
    this._app.use('/css', express.static('../public/css', staticOptions));
    this._app.use('/i', express.static('../public/i', staticOptions));    
	}

	listen() {
    // для сокетов
    // this._exposedServer.listen(this._port, _ => {
    //   console.log("Server listening at localhost:" + this._port);
    // });

      this._appServer.listen();
      console.log(this._appServer);
  }
}