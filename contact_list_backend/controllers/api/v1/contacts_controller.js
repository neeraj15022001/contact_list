const Contact = require("../../../models/contact_schema")
module.exports.create = async (req, res) => {
    // console.log(req.body);
    try {
        //check if contact with same email and mobile number
        let contactSearched = await Contact.findOne({email: req.body.email, mobile: req.body.mobile})
        if (contactSearched) {
            return res.json(409, {
                message: "User Already Exist",
                data: contactSearched
            })
        }
        //Creating Contact
        let contact = await Contact.create(req.body);
        //Sending contact to user after creating
        return res.json(200, {
            message: "Successfully created contact",
            data: contact
        })
    } catch (e) {
        // console.log("Error while creating contact", e);
        //Sending error to user
        return res.json(500, {
            message: 'Error while creating contact',
            error: e
        });
    }
}
module.exports.read = async (req, res) => {
    try {
        let contacts = await Contact.find({});
        return res.json(200, {
            message: "Successfully Retrieved Contacts",
            data: contacts
        })
    } catch (e) {
        return res.json(500, {
            message: "Error While Retrieving Users"
        })
    }
}
module.exports.delete = async (req, res) => {
    // console.log(req.query.id);
    try {
        //Finding if contact to be deleted is in database
        let contact = await Contact.findById(req.query.id);
        // console.log(contact)
        //checking againg with user id. Can be skipped
        if (contact.id === req.query.id) {
            //deleting contact
            let contactDeleted = await Contact.deleteOne({_id: req.query.id});
            //Sending success response to user
            return res.json(200, {
                message: "Successfully Deleted Contact",
                data: contactDeleted
            })
        } else {
            return res.json(401, {
                message: "Unauthorized Request"
            })
        }
    } catch (e) {
        console.log('Error while deleting contact', e);
        return res.json(500, {
            message: 'Error while deleting contact',
            error: e
        })
    }
}
module.exports.update = async (req, res) => {
    console.log(req.query);
    try {
//        check if user with requested email and mobile already exists
        let options = {}
        if (req.query.name) {
            options.name = req.query.name;
        }
        //Checking if email is requested to be updated
        if (req.query.email) {
            options.email = req.query.email;
        }
        //    Checking if mobile is requested to be updated
        if (req.query.mobile) {
            options.mobile = req.query.mobile;
        }
        let contactSearched = await Contact.findOne(options);
        if (contactSearched) {
            return res.json(409, {
                message: "User Already Exist",
                data: contactSearched
            })
        }
//    find if user to update exist in db
        let contact = await Contact.findById(req.query.id);
        console.log("contact", contact)
        if (contact) {
            //    user found, now update it
            //    Checking if name is requested to be updated
            if (req.query.name) {
                contact.name = req.query.name;
            }
            //Checking if email is requested to be updated
            if (req.query.email) {
                contact.email = req.query.email;
            }
            //    Checking if mobile is requested to be updated
            if (req.query.mobile) {
                contact.mobile = req.query.mobile;
            }
            //    saving contact after updating
            await contact.save();
            return res.json(200, {
                message: "Contact Updated Successfully",
                data: contact
            })
        } else {
            return res.json(404, {
                message: "No User Found"
            })
        }
    } catch (e) {
        return res.json(500, {
            error: e
        })
    }
}