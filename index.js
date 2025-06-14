import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, "message.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error reading file");
        } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        }
    });
});

// Listen on port 5000 and bind to all interfaces (0.0.0.0)
server.listen(5000, '0.0.0.0', () => {
    console.log("Server is running on port 5000");
});
