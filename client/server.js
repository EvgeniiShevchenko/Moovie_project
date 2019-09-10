const express = require( 'express' );
const proxyMiddleware = require('http-proxy-middleware')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const next = require( 'next' );
const morgan = require( 'morgan' );
const fs = require('fs');
const path = require('path');
const db = require('./config/key');

const port = 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next( {dev: dev} );

// console.log(app);
// const handler = routes.getRequestHandler(app);
const handle = app.getRequestHandler();


const devProxy = {
  "/api": {
    target: "http://localhost:5000/api/",
    pathRewrite: { "^/api": "/" },
    changeOrigin: true
  }
};

//DB connect
mongoose.connect(db.MongoURI, {useNewUrlParser: true})
    .then(() => console.log("You are connected to Mongodb database !"))
    .catch(err => console.log(err))


app.prepare()
	.then( () => {
    const server = express();
    
    // server.use(bodyParser.json());
    // server.use(bodyParser.urlencoded({extended: true}));
    
    // log only 4xx and 5xx responses to console
    server.use(morgan('dev'));
    
    // log all requests to access.log
    server.use(morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    }))

    if (dev && devProxy) {
        const proxyMiddleware = require('http-proxy-middleware')
        Object.keys(devProxy).forEach(function (context) {
          server.use(proxyMiddleware(context, devProxy[context]))
        })
    }

    // server.use(handler);
    
    server.get('*', (req, res) => {
      return handle(req, res)
    });
    // server.get( '*', ( req, res ) => {
		// 	return handler( req, res );
		// } );

		server.listen( port, ( err ) => {
			if ( err ) {
				throw err;
			}
			console.warn( `Ready on http://localhost:${port}` );
		} );
	} );