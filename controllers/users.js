var User = require('../models/users.js');


var userController = {


      locate: function (req, res) {
          var data = req.body;
          console.log("still got here", data);
          var date = new Date();
          var username = req.user.username;


          User.findOne({username:username}, function(err, user) {
            if (err) return handleErr(err);

            find = {
              coordinates: [data.latitude, data.longitude],
              datetime: date
            };

            user.location = find;
            user.save();

          });

      }

      
}


module.exports = userController;