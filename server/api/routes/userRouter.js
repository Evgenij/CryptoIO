const Router = require("express");
const userControllers = require("../controllers/userControllers");
const { body } = require("express-validator");
const AuthMiddleware = require("../middleware/AuthMiddleware");

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
router.post("/logout", userControllers.logout);
router.get("/activate/:link", userControllers.activate);
router.get("/refresh", userControllers.refreshToken);
router.get("/get", AuthMiddleware, userControllers.getAllUsers); // TODO: For testing middleware of authorization

module.exports = router;
