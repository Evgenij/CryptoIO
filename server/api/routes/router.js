const Router = require("express");
const router = new Router();

const usersRouter = require("./usersRouter");
const typesRouter = require("./typesRouter");

router.use("/users", usersRouter);
router.use("/types", typesRouter);

module.exports = router;
