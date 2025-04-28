const Router = require("express");
const router = new Router();

const usersRouter = require("./usersRouter");
const typesRouter = require("./typesRouter");
const componentsRouter = require("./componentsRouter");

router.use("/users", usersRouter);
router.use("/types", typesRouter);
router.use("/components", componentsRouter);

module.exports = router;
