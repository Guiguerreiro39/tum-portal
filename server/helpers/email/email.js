const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_MAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

const sendVoteEmail = (data) => {
    readHTMLFile(__dirname + "/templates/new_vote.html", function (err, html) {
        if (err) {
            console.log(err);
            return;
        }

        var template = handlebars.compile(html);
        var replacements = {
            question: data.question,
            user: data.user,
            url: `${process.env.FRONTEND_ORIGIN}/vote`,
        };
        var htmlToSend = template(replacements);

        let mailOptions = {
            from: `${process.env.GMAIL_ACCOUNT_NAME} <${process.env.GMAIL_MAIL_ADDRESS}>`,
            to: "guiguerreiro10@hotmail.com",
            subject: "Nova votação!",
            html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail sent!");
            }
        });
    });
};

const sendGuideEmail = (data) => {
    readHTMLFile(__dirname + "/templates/new_guide.html", function (err, html) {
        if (err) {
            console.log(err);
            return;
        }

        var template = handlebars.compile(html);
        var replacements = {
            name: data.name,
            instrument: data.instrument,
            user: data.user,
            url: `${process.env.FRONTEND_ORIGIN}/guide`,
        };
        var htmlToSend = template(replacements);

        let mailOptions = {
            from: `${process.env.GMAIL_ACCOUNT_NAME} <${process.env.GMAIL_MAIL_ADDRESS}>`,
            to: "guiguerreiro10@hotmail.com",
            subject: "Nova Guia!",
            html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail sent!");
            }
        });
    });
};

module.exports = {
    sendVoteEmail,
    sendGuideEmail,
};
