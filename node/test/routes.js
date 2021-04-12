const router = require('express').Router();


router.get("/", (req, res) => {
    res.send("hello world2");
});

router.get("/hello", (req, res) => {
    res.send("holder..");
});

module.exports = router;