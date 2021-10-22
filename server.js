const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));
app.listen(port);

console.log(`Node start on http://localhost:${port}`)
