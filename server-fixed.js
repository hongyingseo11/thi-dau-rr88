
const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

const injectFont = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');
    * {
      font-family: 'Lexend', sans-serif !important;
    }
    body, html {
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      overflow-x: hidden !important;
    }
    table {
      margin: 0 auto !important;
    }
    img {
      max-width: 100%;
      height: auto;
      image-rendering: -webkit-optimize-contrast;
    }
  </style>
`;

app.get('/live', (req, res) => {
  const targetUrl = 'https://www.rougetomatenyc.com/iframe/truc-tiep';
  request(targetUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let modifiedBody = body
        .replace(/<head>/i, `<head>${injectFont}`)
        .replace(/src="\/images/g, 'src="https://www.rougetomatenyc.com/images')  // fix ảnh
        .replace(/src='\/images/g, "src='https://www.rougetomatenyc.com/images"); // fix ảnh dạng khác
      res.send(modifiedBody);
    } else {
      res.status(500).send('Lỗi khi tải nội dung proxy.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Proxy đang chạy tại http://localhost:${PORT}`);
});
