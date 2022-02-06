const mongoose = require("mongoose");
const contactsSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    mobile: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true});

const Contact = mongoose.model("contacts", contactsSchema);
module.exports = Contact;
