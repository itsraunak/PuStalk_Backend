const express = require("express");
const router = express.Router();
const User = require("../schema/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Publisher = require("../schema/Publisher");
/* router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); */

router.post("/signup", async (req, res) => {
    const { name,
        email,
        phone,
        password
    } = req.body;

    await User.findOne({ email: email }, (err, document) => {
        if (err) {
            res.status(500).send("there is some issue please try again after some time!");

        }
        if (document) {
            res.status(409).send("user already exists!");
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    res.status(500).send("there is some issue please try again after some time!");

                }

                bcrypt.hash(password, salt, async (err, hashedPassword) => {
                    if (err) {
                        res.status(500).send("there is some issue please try again after some time!");

                    }

                    const user = new User({
                        name: name,
                        email: email,
                        phoneNumber: phone,
                        password: hashedPassword
                    });

                    await user.save((err, doc) => {
                        if (err) {
                            res.status(500).send("there is some issue please try again after some time!");

                        }

                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

                        res.status(200).json({ token: "Bearer " + token });

                    });
                })
            })
        }
    })

});


router.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    User.findOne({ email: email }, (err, doc) => {
        if (err) {
            res.status(500).send("there is some issue please try again after some time!");
        }
        if (!doc) {
            res.status(404).send("account not found!");
        } else {
            bcrypt.compare(password, doc.password, (err) => {
                if (err) {
                    res.status(401).send("oops! password mismatch ");
                }

                const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET);

                res.status(200).json({ token: "Bearer " + token });
            })
        }
    })
});


router.post("/business/signup", async (req, res) => {
    const { id, shopName, phone, address, isPublisher, password } = req.body;
    await Publisher.findOne({ id: id }, (err, doc) => {
        if (err) {
            console.error(err)
            res.status(500).send("there is some issue please try again after some time!");
        }
        else {
            if (doc) {
                res.status(409).send("user already exists! try a diffrent user ID");
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send("there is some issue please try again after some time!");
                    }
                    else {
                        bcrypt.hash(password, salt, async (err, hashedPassword) => {
                            if (err) {
                                console.error(err)
                                res.status(500).send("there is some issue please try again after some time!");
                            }
                            else {
                                const user = new Publisher({
                                    id: id,
                                    shopName: shopName || 'N/A',
                                    phone: phone,
                                    address: address,
                                    isPublisher: isPublisher,
                                    password: hashedPassword
                                });

                                user.save((err, doc) => {
                                    if (err) {
                                        console.error(err)
                                        res.status(500).send("there is some issue please try again after some time!");
                                    }
                                    else {
                                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                                        res.status(200).json({ token: "Bearer " + token });
                                    }
                                })
                            }

                        })
                    }
                })
            }
        }
    })
});


router.post("/business/signin", async (req, res) => {
    const { id, password } = req.body;

    Publisher.findOne({ id: id }, (err, doc) => {
        if (err) {
            console.error(`!issue ${err}`)
            res.status(500).send("there is some issue please try again after some time!");
        }
        else {
            if (!doc) {
                console.log(`user with '${id}' not found or may have deleted their account`)
                res.status(500).send("there is some issue please try again after some time!");
            }
            else {
                bcrypt.compare(password, doc.password, (err) => {
                    if (err) {
                        res.status(401).send("oops! password mismatch ");
                    }

                    const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET);

                    res.status(200).json({ token: "Bearer " + token });
                })
            }
        }
    })
});

router.post("/business/verify-id", (req, res) => {
    const { id } = req.body;

    Publisher.findOne({ id: id }, (err, doc) => {
        if (err) {
            res.status(500).send("there is some issue please try again after some time!");
        } else {
            if (doc) {
                //console.log(`" ${id} " is already registered`);
                res.json({ 'granted': false });
            } else {
                //console.log(`" ${id} " is not already registered`);
                res.json({ 'granted': true });
            }
        }
    })
})

module.exports = router;