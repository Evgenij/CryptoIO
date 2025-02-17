const Router = require("express");
const userControllers = require("../controllers/userControllers");

const router = new Router();

router.get("/", userControllers.get);
router.post("/registration", userControllers.registration);

module.exports = router;
