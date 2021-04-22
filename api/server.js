const express = require("express");
const accountsRouter = require("./accounts/accounts-router");
const server = express();

server.use(express.json());
server.use(accountsRouter);

server.use((err, req, res, next) => { // eslint-disable-line
	// DO YOUR MAGIC
	res.status(500).json({
		message: "something went wrong"
	})
  })

  
module.exports = server;
