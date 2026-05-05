const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = 'database.txt';

// 1. مسار إنشاء حساب جديد
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const userData = `${email}:${password}\n`;
    
    fs.appendFile(DB_FILE, userData, (err) => {
        if (err) return res.status(500).send("خطأ في الحفظ");
        res.status(200).send("تم إنشاء الحساب");
    });
});

// 2. مسار تسجيل الدخول والتحقق
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!fs.existsSync(DB_FILE)) {
        return res.status(404).send("أنشئ حساب أولاً");
    }

    const fileContent = fs.readFileSync(DB_FILE, 'utf8');
    const lines = fileContent.split('\n');
    
    const userExists = lines.some(line => line.split(':')[0] === email);
    const authorized = lines.some(line => line === `${email}:${password}`);

    if (!userExists) {
        return res.status(404).send("أنشئ حساب أولاً");
    } else if (!authorized) {
        return res.status(401).send("كلمة المرور خاطئة");
    } else {
        res.status(200).send("مقبول");
    }
});

app.listen(3000, () => console.log('السيرفر شغال على البورت 3000'));
