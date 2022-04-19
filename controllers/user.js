let User = require('../models/user');
let passport = require('passport');

let jwt = require('jsonwebtoken');

let config = require('../config/config');

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };



module.exports.signup = function(req, res, next) {
    
      //
      //console.log(req.body);
  
      let user = new User(req.body);

      //console.log(user.username);
  
      user.save((err) => {
        if (err) {
          let message = getErrorMessage(err);
  
          // req.flash('error', message);
          // // return res.redirect('/users/signup');
          // return res.render('auth/signup', {
          //   title: 'Sign-up Form',
          //   messages: req.flash('error'),
          //   user: user
          // });
          return res.status(400).json(
            {
              success: false, 
              message: message
            }
          );
        }
        // req.login(user, (err) => {
        //   if (err) return next(err);
        //   return res.redirect('/');
        // });
        return res.json(
          {
            success: true, 
            message: 'User created successfully!'
          }
        );

      });
   
  };



module.exports.signin = function(req, res, next){
  passport.authenticate(
    //'local',
    'login', 
    // {   
    // successRedirect: req.session.url || '/',
    // failureRedirect: '/users/signin',
    // failureFlash: true
    // }
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400).json(
              { 
                success: false, 
                message: err || info.message
              }
            );
        }
    
        req.login(
            user,
            { session: false },
            async (error) => {
              if (error) {
                return next(error);
              }
              const payload = { 
                
                id: user._id, 
                username: user.username 
              };// change to user.username
              const token = jwt.sign(
                { 
                  payload: payload
                }, 
                config.SECRETKEY, 
                { 
                  algorithm: 'HS512', 
                  expiresIn: "20min"
                }
              );
      
              return res.json(
                { 
                  success: true, 
                  token: token 
                }
              );
            }
          );
        } catch (error) {
          // return next(error);
          console.log(error);
          return res.status(400).json({ success: false, message: error});
        }
      }
    )(req, res, next);
  //delete req.session.url;
    
} 

module.exports.processEditProfile = (req, res, next) => {
  let username = User.username

  let updatedItem = User({
      ///_id: req.body.id,
      _id: id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password

  });

   console.log(updatedItem);

  User.updateOne({ username: username }, updatedItem, (err) => {
      if (err) {
          console.log(err);
          //res.end(err);
          return res.status(400).json(///
              { 
                success: false, 
                message: getErrorMessage(err)
              }
          );

      }
      else {
          console.log(req.body);
          return res.status(200).json(///
              { 
                  success: true, 
                  message: 'profile updated successfully.'
              }
          );
      }
  });
}


// module.exports.signout = function(req, res, next) {
//     req.logout();
//     res.redirect('/');
// }; 