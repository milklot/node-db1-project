const router = require('express').Router();
const db = require('./accounts-model');
const mw = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await db.getAll();
    res.status(200).json(accounts);
  }
  catch (err) {
    next(err);
  }
})

router.get('/:id', mw.checkAccountId ,async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await db.getById(req.params.id);
    res.status(200).json(account);
  }
  catch(err) {
    next(err);
  }
})

router.post('/', mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await db.create(req.body);
    res.status(201).json(newAccount);
  }
  catch(err) {
    next(err);
  }

})

router.put('/:id',mw.checkAccountPayload, mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await db.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  }
  catch (err) {
    next(err);
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await db.deleteById(req.params.id);
    res.status(204).json(deletedAccount);
  }
  catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({
    message: "something went wrong"
  })
})

module.exports = router;
