let express = require('express');
let app = express();

app.get('/', (req,res) => {
	res.send('123');
});

app.listen(3000);
