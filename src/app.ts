const config = require("./config")
import express, {Express, Request, Response, NextFunction,} from "express";
import morgan from "morgan";
import * as bodyParser from 'body-parser';
import cors from "cors";

const database = require("./api/provider/database");
const logger = require("./api/provider/logging");
import todoRoutes from "./routes";

const app: Express = express();

app.get("/", (req, res) => {
	return res.status(200).send("Server running");
});

// Log requests to console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(todoRoutes);

app.use((err: { status: number; }, req: Request, res: Response, next: NextFunction) => {
	// This check makes sure this is a JSON parsing issue, but it might be
	// coming from any middleware, not just body-parser:
	
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		console.error(err);
		res.status(400); // Bad request
	}
	
	next();
});

// database.connection();
database
  	.connection()
  	.then(() => {
		app.listen(config.server.port, config.server.host, () => {
			logger.info(`Server running on http://${config.server.host}:${config.server.port}`)
		});
	})
  	.catch((error: any) => {
    	logger.error(error) 
	});
	  