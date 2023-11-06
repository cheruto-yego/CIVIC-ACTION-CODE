const net = require("net");
const fs = require("fs");

const collections = {};

const port = 3000;
const hostname = "127.0.0.1";

const server = net.createServer();
server.listen(port, hostname, () => {
  console.log("listening on port", port);
});

server.on("connection", (sock) => {
  sock.on("data", (data) => {
    const jsonData = JSON.parse(data);
    const collection = getCollection(jsonData.collection);
    let response = "1";

    if (jsonData.insertOne) {
      const _id = new Date().getTime();

      collection[_id] = {
        ...jsonData.insertOne,
        _id
      }

      saveToFile(jsonData.collection)

      response = JSON.stringify({ insertedId: _id });
    }

    sock.write(response);
  });
});

function getCollection(collectionName) {
  if (!collections[collectionName]) {
    collections[collectionName] = {};
  }
  return collections[collectionName];
}

function saveToFile(collectionName) {
  fs.writeFileSync(`${collectionName}.json`, JSON.stringify(getCollection(collectionName)));
}