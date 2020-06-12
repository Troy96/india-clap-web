const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/india-clap-web'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/india-clap-web/index.html'));
});

app.listen(process.env.PORT || 8000);