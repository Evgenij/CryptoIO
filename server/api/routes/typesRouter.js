const Router = require("express");
const typesController = require("../controllers/typesController");
const { body } = require("express-validator");
const router = new Router();

router.post(
	"/create",
	body("name").isEmpty().withMessage("Name is required"),
	typesController.create
);
router.get("/", typesController.getAll);

module.exports = router;
