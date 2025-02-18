const Router = require("express");
const userControllers = require("../controllers/userControllers");
const { body } = require("express-validator");

const router = new Router();

router.get("/", userControllers.get);
router.post(
	"/registration",
	body("email").isEmail().withMessage("Not a valid e-mail address"),
	body("password")
		.isLength({ min: 4, max: 32 })
		.withMessage("Password is incorrect"),
	body("nickname")
		.isLength({ min: 4, max: 32 })
		.withMessage("Nickname is incorrect"),
	userControllers.registration
);
router.post("/login", userControllers.login);
router.get("/activate/:link", userControllers.activateToken);

module.exports = router;
