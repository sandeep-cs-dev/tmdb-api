import express, { NextFunction, Request, Response } from "express";
import { loadEnv } from './config/env'
import { router as routes } from './routes'
// Create Express server
const app = express();
// Express configuration
const NODE_ENV = process.env.NODE_ENV ?? "development"

if (NODE_ENV === 'development') {
   loadEnv()
}

app.set("port", process.env.PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes)

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
   // handle error here
   console.log(err)
   res.status(400).json({ "msg": "Oops! cant fetch data due to some error" })

});

export default app;
