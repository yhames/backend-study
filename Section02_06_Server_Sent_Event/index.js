/**
 * Client Side
 * let sse = new EventSource("http://localhost:8080/stream");
 * sse.onmessage = console.log;
 */
const app = require("express")();

app.get("/", (req, res) => res.send("hello!"));

app.get("/stream", (req, res) => {
    // Set Content-Type for using Server Sent Event
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
});

const port = process.env.PORT || 8080;

let i = 0;
function send(res) {
    res.write("data: " + `hello from server ---- [${i++}]\n\n`);
    setTimeout(() => send(res), 1000);
}

app.listen(port);
console.log(`Server is listening on port ${port}`);