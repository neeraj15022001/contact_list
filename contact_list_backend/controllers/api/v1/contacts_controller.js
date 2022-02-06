const Contact = require("../../../models/contact_schema")
module.exports.new = async (req, res) => {
    console.log(req.body);
    try {
        let contact = await Contact.create(req.body);
        return res.json(200, {
            message: "Successfully created contact",
            data: contact
        })
    } catch (e) {
        console.log("Error while creating contact", e);
        return res.json(500, {
            message: 'Error while creating contact',
            error: e
        });
    }
}
module.exports.delete = async (req, res) => {
    console.log(req.query.id);
    try {
        let contact = await Contact.findById(req.query.id);
        console.log(contact)
        if (contact.id === req.query.id) {
            let contactDeleted = await Contact.deleteOne({_id: req.query.id});
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