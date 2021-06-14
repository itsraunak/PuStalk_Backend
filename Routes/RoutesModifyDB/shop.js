const express = require("express");
const router = express.Router();


const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const Shop = require("../../schema/Shops/Shop");

router.get("/shop", async (req, res) => {
    const shops = await Shop.find({});

    if (!shops.length)
        res.status(404).send("can't find the book you're looking for");
    else
        res.status(200).send(shops);

});

router.post("/shop", async (req, res) => {
    const { shopName,
        email,
        location,
        regNo,
        GSTIN,
        locationOnGMap,
        address,
        phoneNo,
        bussinessWhatsappNo } = req.body;

    await Shop.findOne({ shopName: shopName }, async (err, doc) => {
        if (err)
            res.status(500).send("there is some issue please try again after some time!");
        if (doc)
            res.status(409).send("user already exists!");

        const newShop = new Shop({
            shopName: shopName.toString(),
            email: email.toString(),
            location: location.toString(),
            regNo: regNo.toString(),
            GSTIN: GSTIN.toString(),
            locationOnGMap: locationOnGMap.toString(),
            address: address.toString(),
            phoneNo: phoneNo.toString(),
            bussinessWhatsappNo: bussinessWhatsappNo.toString()
        });

        await newShop.save((err) => {
            if (err)
                res.status(500).send("there is some issue please try again after some time!");

            res.status(200).send("the Shop is now successfully uploaded!");

        });
    });
})

router.patch("/shop", async (req, res) => {
    const { id } = req.body;

    let shopName = "",
        email = "",
        location = "",
        regNo = "",
        GSTIN = "",
        locationOnGMap = "",
        address = "",
        phoneNo = "",
        bussinessWhatsappNo = "";


    if (req.body.shopName)
        shopName = req.body.shopName.toString();
    if (req.body.email)
        email = req.body.email.toString();
    if (req.body.location)
        location = req.body.location.toString();
    if (req.body.regNo)
        regNo = req.body.regNo.toString();
    if (req.body.GSTIN)
        GSTIN = req.body.GSTIN.toString();
    if (req.body.locationOnGMap)
        locationOnGMap = req.body.locationOnGMap.toString();
    if (req.body.address)
        address = req.body.address.toString();
    if (req.body.phoneNo)
        phoneNo = req.body.phoneNo.toString();
    if (req.body.bussinessWhatsappNo)
        bussinessWhatsappNo = req.body.bussinessWhatsappNo.toString();


    await Shop.findById(id, async (err, doc) => {
        if (err)
            res.status(500).send("there is some issue please try again after some time!");
        if (!doc)
            res.status(404).send("can't find the shop you're looking for");


        if (shopName != "" && shopName != doc.shopName)
            doc.shopName = shopName;
        if (email != "" && email != doc.email)
            doc.email = email;
        if (location != "" && location != doc.location)
            doc.location = location;
        if (regNo != "" && regNo != doc.regNo)
            doc.regNo = regNo;
        if (GSTIN != "" && GSTIN != doc.GSTIN)
            doc.GSTIN = GSTIN;
        if (locationOnGMap != "" && locationOnGMap != doc.locationOnGMap)
            doc.locationOnGMap = locationOnGMap;
        if (address != "" && address != doc.address)
            doc.address = address;
        if (phoneNo != "" && phoneNo != doc.phoneNo)
            doc.phoneNo = phoneNo;
        if (bussinessWhatsappNo != "" && bussinessWhatsappNo != doc.bussinessWhatsappNo)
            doc.bussinessWhatsappNo = req.body.bussinessWhatsappNo;


        await doc.save((err) => {
            if (err)
                res.status(500).send("there is some issue please try again after some time!");

            res.status(200).send("shop data has successfully been updated! ");
        })
    })


});

router.delete("/shop", async (req, res) => {
    const { id } = req.body;

    await Shop.deleteOne({ _id: id }, (err) => {
        if (err)
            res.status(500).send("there is some issue please try again after some time!");
        res.status(200).send("shop data has successfully been deleted! ");
    })
})
module.exports = router;