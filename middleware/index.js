const express = require("express")
const jwt = require("jsonwebtoken")

exports.issAuthorized = (req, res, next) => {
    const token = req.headers.authorization
    if (token)
        jwt.verify(token.toString().slice(7), process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err)
                res.status(500).send("there is some issue please try again after some time!");
            }
            else
                if (!decoded) {
                    res.status(500).send("there is some issue please try again after some time!");
                } else {
                    req.user = decoded.id;
                    next();
                }
        })
    else res.status(401).send('Unauthorized Access')
}

exports.isAlreadyloggedin = (req, res, next) => {
    const token = req.headers.authorization
    if (token)
        jwt.verify(token.toString().slice(7), process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err)
                res.status(500).send("there is some issue please try again after some time!")
            }
            else
                if (!decoded) next()
                else res.status(200).json({ success: true })
        })
    else {
        next()
    }
}

