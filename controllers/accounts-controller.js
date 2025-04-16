const AccountsModel = require("../models/accounts-model");

const getAccounts = (req, res) => {
  AccountsModel.getAccounts().then((result) => {
    res.send(result);
  });
};

const getAccount = (req, res) => {
  AccountsModel.getAccount(req.params.id).then((result) => {
    if (!result) return res.status(404).send("Account with given id not found");
    res.send(result);
  });
};

const insertAccount = (req, res) => {
  AccountsModel.insertAccount(
    req.body.name,
    req.body.userId,
    req.body.isDefault
  ).then((result) => {
    res.send(result);
  });
};

const updateAccount = (req, res) => {
  AccountsModel.updateAccount(5, req.body.name, req.body.isDefault).then(
    (result) => {
      res.send(result);
    }
  );
};

const deleteAccount = (req, res) => {
  AccountsModel.deleteAccount(req.params.id).then((result) => {
    res.send(result);
  });
};
module.exports = {
  getAccounts,
  getAccount,
  insertAccount,
  updateAccount,
  deleteAccount,
};
