const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let participants = []; // 用於存儲用戶數據

app.use(express.static('public')); // 提供靜態資源
app.use(bodyParser.json());

// 提交用戶信息
app.post('/api/register', (req, res) => {
    const { name, id } = req.body;
    if (name && id) {
        participants.push({ name, id });
        res.status(200).send({ message: '成功提交' });
    } else {
        res.status(400).send({ message: '無效輸入' });
    }
});

// 抽獎 API
app.get('/api/draw', (req, res) => {
    const winners = [];
    const uniqueParticipants = [...new Set(participants)];
    while (winners.length < 20 && uniqueParticipants.length > 0) {
        const index = Math.floor(Math.random() * uniqueParticipants.length);
        winners.push(uniqueParticipants.splice(index, 1)[0]);
    }
    res.json(winners);
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`抽獎機器伺服器運行於 http://localhost:${port}`);
});
