const express = require('express');
const app = express();
const port = 3000;

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
