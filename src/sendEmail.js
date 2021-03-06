
'use strict';
const nodemailer = require('nodemailer');

function sendEmail(senderConfig = {}, receivers = '', contentObj = {}) {
    const { service, user, pass, userName, port = 465 } = senderConfig;

    const transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service, // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port, // 默认 465 SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user,
            // 设置 端口 对应的授权码
            pass,
        },
    });

    const { title, html } = contentObj;
    const mailOptions = {
        from: `"${userName}" ${user}`, // sender address
        to: receivers, // list of receivers
        subject: title, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html, // html body
    };

    return new Promise((resolve, reject) => {
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
                return;
            }
            console.log('Message sent: %s', info.messageId);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            resolve(info);
        });
    });
}

module.exports = sendEmail;