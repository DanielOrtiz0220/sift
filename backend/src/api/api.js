const express = require('express');
const app = express();
const PORT = 3000;

app.get('/search/:query', (req, res) => {
    const { query } = req.params;
    res.send(`Searching for: ${query}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
