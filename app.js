const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js App!');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
/ /   t r i g g e r  
 / /   c h a n g e  
 