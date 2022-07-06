const jwt = require('jsonwebtoken');

exports.generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload,
            process.env.JWT_SECRET, {
                expiresIn: '24h'
            },
            (err, token) => {

                if (err) {
                    console.log(token);
                    reject('could not generate JWT')
                }else{
                    resolve(token)
                }

            }
        )

    })

}


