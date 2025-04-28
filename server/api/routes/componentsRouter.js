const Router = require("express");
const componentsController = require("../controllers/componentsController");
const router = new Router();

router.get("/", componentsController.getAll);
router.get("/:id", componentsController.getOne);

module.exports = router;
