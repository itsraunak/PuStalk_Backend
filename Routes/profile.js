const express = require("express");
const router = express.Router();
const User = require("../schema/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");



router.get("/profile", middleware.issAuthorized, (req, res) => {
    User.findById(req.user, (err, doc) => {
        if (err) {
            console.error(err)
            res.status(500).send("there is some issue please try again after some time!");
        }
        else
            if (!doc) res.status(401).send('Unauthorized Access')
            else {
                const profile = {
                    name: doc.name,
                    email: doc.email,
                    date: doc.date,
                    phone: doc.phoneNumber
                }
                res.status(200).json({ success: true, profile: JSON.stringify(profile) })
            }
    });
});

router.patch("/profile", middleware.issAuthorized, async (req, res) => {
    let email = "",
        name = "",
        phone = ""
    const password = req.body.password;
    if (req.body.email) {
        email = req.body.email;
    }
    if (req.body.name) {
        name = req.body.name;
    }
    if (req.body.phone) {
        phone = req.body.phone;
    }


    await User.findById(req.user, (err, doc) => {
        if (err) {
            res.status(500).send("there is some issue please try again after some time!");
        }
        if (!doc) {

            res.status(404).send("account not found!");
        }

        bcrypt.compare(password, doc.password, (err, same) => {
            if (err) {
                res.status(500).send("there is some issue please try again after some time!");
            }

            if (!same) {
                res.status(401).send("oops! password mismatch ");
            }

            if (email != "" && doc.email != email)
                doc.email = email;
            if (name != "" && doc.name != name)
                doc.name = name;
            if (phone != "" && doc.phoneNumber != phone)
                doc.phoneNumber = phone;


            doc.save((err) => {
                if (err) {
                    res.status(500).send("there is some issue please try again after some time!");
                }

                res.status(200).send("your account has successfully been updated! ");
            });
        });



    })
});


router.delete("/profile", middleware.issAuthorized, (req, res) => {
    const password = req.body.password;
    User.findById(req.user, (err, doc) => {
        if (err) {
            res.status(500).send("there is some issue please try again after some time!");
        }
        if (!doc) {
            res.status(404).send("account not found!");
        }

        bcrypt.compare(password, doc.password, (err, same) => {
            if (err)
                res.status(500).send("there is some issue please try again after some time!");

            if (!same)
                res.status(401).send("oops! password mismatch ");

            User.deleteOne({ _id: req.user }, (err) => {
                if (err)
                    res.status(500).send("there is some issue please try again after some time!");
                /* after deletion sending server response */
                res.status(200).send("your account has successfully been deleted ");
            })
        })
    })
})

module.exports = router;
