import express from 'express';
let app = express();

app.get('/', (req,res) => 'Hello, world!');

app.listen(3000);
