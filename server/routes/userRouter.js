const Router = require("express");
const userControllers = require("../controllers/userControllers");

const router = new Router();

router.get("/", userControllers.get);
router.get("/create", userControllers.create);

module.exports = router;
