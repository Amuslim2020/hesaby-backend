const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accounts-controller");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", accountsController.getAccounts);
router.get("/:id", accountsController.getAccount);
router.post("/", accountsController.insertAccount);
router.put("/:id", accountsController.updateAccount);
router.delete("/:id", accountsController.deleteAccount);

module.exports = router;
