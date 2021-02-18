import * as dotenv from "dotenv";
dotenv.config();

const database = require('./database');
const logging = require('./logging');
const server = require('./server');

module.exports = {
	env: process.env.NODE_ENV,
	is_debug: process.env.DEBUG === 'true',

	server: server,
	logging: logging,
	database: database
}