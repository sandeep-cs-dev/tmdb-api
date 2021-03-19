import app from "./app";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});


const shutDown = ()=> {
   // graceful shutdown here
   server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
    });
  }
  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);

export default server;
