/* We'll centralize our routes imports to this file to keep our code clean */

const router = require('express').Router();
const usersRoutes = require('./users');
const messageRoutes = require('./messages');
const familyRoutes = require('./family');

router.get('/', (req, res) => {
  res.send('This is home');
});

router.use('/api/auth', usersRoutes);
router.use('/api/family', familyRoutes);
router.use('/api', messageRoutes);

module.exports = router;
