exports.home = function(req, res, next) {
    // res.render('index', { 
    //   title: 'Home',
    //   userName: req.user ? req.user.username : '' 
    //  });
    res.redirect('/survey/list_attend');
  }

  

