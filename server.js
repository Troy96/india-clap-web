const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/india-clap-web'));

app.use((req, res, next)=>{
    if(req.header['x-forwarded-proto'] !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    }
    else next();
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/india-clap-web/index.html'));
});

app.listen(process.env.PORT || 8000);