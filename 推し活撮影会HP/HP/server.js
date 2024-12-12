const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// ボディパーサー設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailerの設定（メール送信用）
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // 送信元のGmailアドレス
    pass: 'your-email-password',   // 送信元のGmailアドレスのパスワード
  },
});

// 予約フォーム送信を処理するエンドポイント
app.post('/send-mail', (req, res) => {
  const { talent, date, time, full_name, nickname, phone, address } = req.body;

  // メール内容
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'osikatsu.photosession@gmail.com', // 受信先のメールアドレス
    subject: '新しい予約がありました',
    text: `
      新しい予約がありました：

      タレント: ${talent}
      日付: ${date}
      時間帯: ${time}

      本名: ${full_name}
      ニックネーム: ${nickname}
      電話番号: ${phone}
      住所: ${address}
    `,
  };

  // メール送信
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('メール送信に失敗しました: ', error);
      return res.status(500).send('予約の送信に失敗しました');
    }
    console.log('メール送信成功: ', info.response);
    res.status(200).send('予約が確定しました！');
  });
});

// 静的ファイルの提供 (HTMLやCSSファイル)
app.use(express.static('public'));

// サーバーの起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で稼働中です`);
});
