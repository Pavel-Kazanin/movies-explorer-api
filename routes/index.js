const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
