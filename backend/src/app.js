const app = require("express")();
const server = require("http").createServer(app);

const config = require("./config");
const logger = require("./libs/log")(module);

app.set('io', require('./libs/socket')(server));
// -----------------------------------------

require("./middleware/default")(app, module);
require("./routes")(app);
app.use('/', (req, res) => {
	res.end();
});
require("./middleware/error")(app);

server.listen(config.get("port"), () => {
	console.log(`Сервер запущен на порту ${config.get("port")}`);
	/* logger.info(`Сервер запущен на порту ${config.get('port')}`); */
});
