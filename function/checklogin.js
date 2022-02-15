//jwt
var jwt = require('jsonwebtoken')
const AccountModel = require('../models/account')

const checklogin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const tokenUser = jwt.verify(token, 'mk')

        const User = await AccountModel.findOne({ _id: tokenUser.userId })

        //check account in DB
        if (!User) {
            return res.redirect('/login')
        }
        //all good
        next()
    } catch (error) {
        return res.redirect('/login')
    }
}

module.exports = checklogin