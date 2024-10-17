const User = require('../models/User')

exports.register = async(req, res) => {
    try {
        const user = await User.create(req.body)
        const token = user.getSignedJwtToken()
        res.status(200).json({
            message: "success",
            token
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')       
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide an email and password"
            })
        }

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({
                message: "Invalid credential"
            })
        }

        const isMatch = await user.matchPassword(password)
        
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credential"
            })
        }

        const token = user.getSignedJwtToken()

        res.status(200).json({
            message: "success",
            token
        })
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}