const express = require('express');
const app = express();
const port = 3003;

// 루트 경로에 대한 응답
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 3000 포트에서 앱 실행
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
