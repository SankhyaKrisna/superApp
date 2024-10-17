const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

module.exports = function (req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        jwt.verify(token, JWT_SECRET, (error, decode) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' })
            } else {
                req.user = decode.user;
                next()
            }
        })
    } catch (err) {
        console.error('Something wrong with auth middlewate')
        res.status(500).json({ msg: 'Server Error' })
    }
}