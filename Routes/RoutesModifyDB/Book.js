/* one route is left here
 the route to get the list of the all the books , 
 */

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const Book = require("../../schema/Books/Book");
const mongoose = require("mongoose");

router.get("/books", async (req,res)=>{
    
    const books = await Book.find({});

    if (!books.length)
        res.status(404).send("can't find the book you're looking for");
    else
        res.status(200).send(books);


});



router.post("/books", async (req, res) => {
    const { bookName, author, isbn, mrp, publisher, pages,catagory,imageUrl,coverType} = req.body; // collecting important information from the req

    await Book.findOne({ bookName: bookName }, async (err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).send("there is some issue please try again after some time!");
        }

        if (doc) {
            res.status(409).send("Book already exists!");
        }

        const newBook = new Book({
            bookName: bookName.toString(),
            author: author.toString(),
            isbn: isbn.toString(),
            mrp: mrp.toString(),
            publisher: publisher.toString(),
            pages: pages.toString(),
            catagory: catagory.toString(),
            imageUrl: imageUrl,
            coverType: coverType.toString(),

        });

        await newBook.save((error) => {
            if (error) {
                res.status(500).send("there is some issue please try again after some time!");
            }else{
                res.status(200).send("the book has successfully been uploaded");
            }
        })
    })


});



router.patch("/books", async (req, res) => {
    const { id, shop } = req.body;

    let bookName = "",
        author = "",
        isbn = "",
        mrp = "",
        publisher = "",
        pages = "";
    // -----------------------------------------------
    if (req.body.bookName)
        bookName = req.body.bookName.toString();
    if (req.body.author)
        author = req.body.author.toString();
    if (req.body.isbn)
        isbn = req.body.isbn.toString();
    if (req.body.mrp)                                   /* checking  */
        mrp = req.body.mrp.toString();
    if (req.body.publisher)
        publisher = req.body.publisher.toString();
    if (req.body.pages)
        pages = req.body.pages.toString();
    // -----------------------------------------------
    await Book.findById(id, async (err, doc) => {
        if (err)
            res.status(500).send("there is some issue please try again after some time!");
        if (!doc)
            res.status(404).send("can't find the book you're looking for");

        if (bookName != "" && bookName != doc.bookName)
            doc.bookName = bookName;
        if (author != "" && author != doc.author)
            doc.author = author;
        if (isbn != "" && isbn != doc.isbn)
            doc.isbn = isbn;
        if (mrp != "" && mrp != doc.mrp)
            doc.mrp = mrp;
        if (pages != "" && pages != doc.pages)
            doc.pages = pages;
        if (shop != null)
            doc.shop.push(mongoose.Types.ObjectId(shop));

        await doc.save((err) => {
            if (err)
                res.status(500).send("there is some issue please try again after some time!");

            /* if successfully upadted  */
            res.status(200).send("the book has successfully been updated");
        })
    })

});

router.delete("/books", async (req, res) => {
    const { id } = req.body;

    Book.deleteOne({ _id: id }, (err) => {
        if (err)
            res.status(500).send("there is some issue please try again after some time!");

        res.status(200).send("the book has successfully been deleted");
    })


});

module.exports = router;