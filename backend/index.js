const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

// Set up body parsing middleware
app.use(koaBody());

// Add all routes
const bsGameSystemsRouter = require('./battlescribe-game-systems.js')
const bsCataloguesRouter = require('./battlescribe-catalogues.js')
app.use(bsGameSystemsRouter.routes());
app.use(bsCataloguesRouter.routes());

app.listen(3000);