const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const User = require("../../models/user_schema");

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

const send = function (options) {
    transporter.sendMail(options, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Mail sent!");
        }
    });
};

const sendVoteEmail = (data) => {
    readHTMLFile(
        __dirname + "/templates/new_vote.html",
        async function (err, html) {
            if (err) {
                console.log(err);
                return;
            }

            try {
                const users = await User.find({
                    "configurations.email.voteCreate": true,
                });

                var template = handlebars.compile(html);
                var replacements = {
                    question: data.question,
                    user: data.user,
                    url: `${process.env.FRONTEND_ORIGIN}/vote`,
                };
                var htmlToSend = template(replacements);

                let mailOptions = {
                    from: `${process.env.GMAIL_ACCOUNT_NAME} <${process.env.GMAIL_MAIL_ADDRESS}>`,
                    to: users.map((u) => u.email),
                    subject: "Nova votação!",
                    html: htmlToSend,
                };

                send(mailOptions);
            } catch (err) {
                console.log(err);
            }
        }
    );
};

const sendGuideEmail = (data) => {
    readHTMLFile(
        __dirname + "/templates/new_guide.html",
        async function (err, html) {
            if (err) {
                console.log(err);
                return;
            }

            try {
                const users = await User.find({
                    "configurations.email.guideCreate": true,
                });

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
                    to: users.map((u) => u.email),
                    subject: "Nova Guia!",
                    html: htmlToSend,
                };

                send(mailOptions);
            } catch (err) {
                console.log(err);
            }
        }
    );
};

module.exports = {
    sendVoteEmail,
    sendGuideEmail,
};
