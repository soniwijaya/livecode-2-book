const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

module.exports = {

    registerUser ( req , res ){
        const {
            fullname,
            email,
            password
        } = req.body

        User.create(
            {
                fullname,
                email,
                password
            }
        )
        .then(userCreate => {
            res.status(200).json({
                message: 'Success registration',
                data: userCreate
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed register',
                data: err
            })
        })

    },

    loginManual ( req , res ){
        const {
            email,
            password
        } = req.body

            User.findOne(
                {
                    email
                }
            )
            .then(user => {
                if(user){

                    const payload = {
                        id: user._id,
                    }

                    bcrypt.compare(password,user.password)
                    .then(sign =>{
                        if(sign){
                            let token = jwt.sign(payload, process.env.JWTSECRET)
                            res.status(200).json({
                                message: 'Success login',
                                id: user._id,
                                fullname: user.fullname,
                                access: token,
                            })
                        }else{
                            res.status(400).json({
                                message: 'Email and Password doesnt match'
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Login Failed'
                })
            })
    }

}