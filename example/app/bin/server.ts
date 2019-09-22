import * as http from "http";
import app from "../app";

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(value: any): number {
    const port = parseInt(value);
    if (isNaN(port)) {
        return value;
    } else if (port >= 0) {
        return port;
    } else {
        throw new Error("Invalid port");
    }
}

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string"
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
        case "EACCES": 
            console.error(`${bind} requires elevated privileges`);
            process.exit(-1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(-1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}
