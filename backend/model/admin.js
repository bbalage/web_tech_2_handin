const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
});

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;