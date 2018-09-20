'use strict';
const nodemailer = require('nodemailer');

exports.invite = (req, res, next) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'theweddingunicorn@gmail.com',
            pass: 'Almafa12'
        }
    });

    const mailOptions = {
        from: 'theweddingunicorn@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Wedding invitation', // Subject line
        html: `<p><b>Dear ${req.body.name},</b> <br> 
                    you are invited to a wedding! <br>
                    <a href="https://wedding-unicorn.herokuapp.com/${req.params.weddingName}">See the details...</a>
                    </p>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            res.status(500).json({err: err.message});
        else {
            next();
        }
    });
};