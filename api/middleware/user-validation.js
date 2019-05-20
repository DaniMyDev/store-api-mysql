module.exports = (req, res , next) => {
    console.log(true);
    try{
        if (req.body.phone.match(/^\d+$/) && 
            req.body.password.length >= 8 &&
            req.body.name.length > 0 &&
            req.body.lastname.length > 0) {
            console.log('valid password');
            console.log('valid phone');
            console.log(validateEmail(req.body.email));
            next();
        }else{
            return res.status(401).json({error: "User validation failed"})
        }
    }catch{
        return res.status(401).json({error: "User validation failed"})
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}