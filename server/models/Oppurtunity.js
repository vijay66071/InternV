const mongoose = require('mongoose');

const OppurtunitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    profile_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    stipend: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

const Oppurtunity = mongoose.model('Opportunity', OppurtunitySchema);

module.exports = Oppurtunity;