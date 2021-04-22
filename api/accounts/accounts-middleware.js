const db = require('./accounts-model');

exports.checkAccountPayload = () => { 
    return  async (req, res, next) => {
      // DO YOUR MAGIC
      const name = req.body.name;
      const budget = req.body.budget;

      if (!name || !budget) {
        res.status(400).json({
          message: "name and budget are required"
        })
      }
      else if (typeof name !== 'string') {
        res.status(400).json({
          message: "name of account must be a string"
        })
      }
      else if (name.trim() < 3 || name.trim() > 100) {
        res.status(400).json({
          message: "name of account must be between 3 and 100"
        })
      }
      else if (typeof budget !== 'number') {
        res.status(400).json({
          message: "budget of account must be a number"
        })
      }
      else if (budget < 0 || budget > 1000000) {
        res.status(400).json({
          message: "budget of account is too large or too small"
        })
      }
      next();
}
}

exports.checkAccountNameUnique = () => {
  return async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const accounts = await db.getAll();
      const currentAccount = req.body.name.trim();
      const data = accounts.filter(account => {
        if (account.currentAccount === currentAccount) {
          return account
        }
      })
      if (data.length > 0) {
        res.status(400).json({
          message: "that name is taken"
        })
      }
      else {
        next();
      }
    }
    catch (err) {
      next(err);
    }
  }
}

exports.checkAccountId = () => {
  return async (req, res, next) => {
    // DO YOUR MAGIC
    const currentId = await db.getById(req.params.id);
    if (!currentId) {
      res.status(404).json({
        message: "account not found"
      })
    }
    else {
      next();
    }
  }
}
