// Import user model
User = require('./userModel');

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: users
        });
    });
};

// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({email:req.body.email},function(err,existingUser){
        if(err) return next(err);
        if(existingUser){

                res.json({
                    message: 'Account with that email already exisits.',
                    data: user
                });

        }else{
             // save the contact and check for errors
                user.save(function (err) {
                    // if (err)
                    //     res.json(err);

                    res.json({
                        message: 'New user created!',
                        data: user
                    });
                });
        }
    })
   
};


// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: user
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {

    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);

        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};


// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};