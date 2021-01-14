const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const { Ticket } = require('./ticket');

const app = new Koa();
const tickets = [];

app.use(koaBody({
  urlencoded: true,
}));

app.use(async (ctx) => {
  // const { method } = ctx.request.querystring;
  const { body } = ctx.request;
  const methodArr = ctx.request.url.split('&');
  const method = decodeURIComponent(ctx.request.url).replace('/?method=', '');
  // eslint-disable-next-line no-console
  console.log(`method=${method}`);

  switch (method) {
    case 'allTickets':
      ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
      ctx.response.body = tickets;
      // eslint-disable-next-line no-console
      // console.log('allTickets');
      return;
      // eslint-disable-next-line indent
    // TODO: обработка остальных методов

    case 'ticketById':
      // eslint-disable-next-line no-case-declarations
      const id = methodArr[1].replace('id=', '');
      // eslint-disable-next-line no-console
      console.log(id);
      return;

    case 'createTicket':
      // eslint-disable-next-line no-console
      console.log(body);
      ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
      // eslint-disable-next-line no-case-declarations
      const ticket = new Ticket({
        name: body.name,
        description: body.description,
      });
      tickets.push(ticket);
      ctx.response.body = ticket;
      return;

    // eslint-disable-next-line no-fallthrough
    default:
      ctx.response.status = 404;
  }
});

// eslint-disable-next-line no-unused-vars
let port;
if (Object.keys(process.env).includes('PORT')) {
  port = process.env.PORT;
} else {
  port = 7070;
}

// app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
const server = http.createServer(app.callback()).listen(port);
