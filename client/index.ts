// @ts-ignore
const express = require('express');
const next = require('next');
const morgan = require('morgan');

const port = 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // log only 4xx and 5xx responses to console
  server.use(morgan('dev'));

  // @ts-ignore
  server.get('/title/:name', (req, res) => {
    console.log("i'm working", req.params.name);
    const actualPage = `/item/${req.params.name}/evgenii`;
    const queryParams = { id: req.params.name };
    app.render(req, res, actualPage, queryParams);
  });

  // @ts-ignore
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // @ts-ignore
  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.warn(`Ready on http://localhost:${port}`);
  });
});
