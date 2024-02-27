const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // PORT 환경 변수가 설정되어 있으면 그 값을 사용하고, 그렇지 않으면 포트 80을 사용합니다.
const cors = require('cors');
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.html');
});

app.get('/animals/:name', (req, res) => {
    const { name } = req.params;
    if (name === 'dog') {
        res.json({ 'sound': 'bark' });
    } else if (name === 'cat') {
        res.json({ 'sound': 'miyo' });
    }
});
