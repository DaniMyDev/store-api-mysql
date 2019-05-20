const emailCheck = require('email-check');

module.exports = (req, res, next) => {
    emailCheck(req.body.email)
        .then((bool) => {
            // Returns "true" if the email address exists, "false" if it doesn't.
            if (bool) {
                console.log('valid email');
                next();
                return;
            } else {
                console.log('invalid email');
                return res.send({ message: "invalid email" });
            }
        })
        .catch((err) => {
            return res.send(err);
        });
}