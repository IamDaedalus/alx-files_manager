const express = require('express');
const routes = require('./routes/index.js')

const port = process.env.PORT || 5000;
const app = express();

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
