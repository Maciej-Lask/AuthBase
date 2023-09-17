const express = require('express');
const router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/user/no-permission'); 
  }
}

// router.get('/logged', checkAuthentication, (req, res) => {
//   const user = req.user;
//     console.log(user);
//   res.render('logged', { user });
// });

router.get('/logged', checkAuthentication, (req, res) => {
  res.render('logged', {
    name: req.user.displayName,
    avatar: req.user.photos[0].value,
  });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

// Zabezpieczone ścieżki
router.get('/profile', checkAuthentication, (req, res) => {
  res.render('userProfile');
});

router.get('/profile/settings', checkAuthentication, (req, res) => {
  res.render('userProfileSettings');
});

module.exports = router;
