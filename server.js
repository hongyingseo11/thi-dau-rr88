
// File: server.js - Proxy độc quyền cho RR88

const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Font Lexend sẽ được inject vào HTML trả về
const injectFont = `\n  <style>@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap'); body, html, * { font-family: 'Lexend', sans-serif !important; }</style>\n`;

// Proxy nội dung từ trang đích và inject font
app.get('/live', (req, res) => {
  const targetUrl = 'https://www.rougetomatenyc.com/iframe/truc-tiep';
  request(targetUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Inject font vào sau <head>
      const modifiedBody = body.replace(/<head>/i, `<head>${injectFont}`);
      res.send(modifiedBody);
    } else {
      res.status(500).send('Lỗi khi tải nội dung proxy.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Proxy đang chạy tại http://localhost:${PORT}`);
});
