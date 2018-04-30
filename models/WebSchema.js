let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var webSchema = mongoose.Schema({
    templatetype: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    bgColor: {
        type: String
    },
    bgImg: {
        type: String
    },
    bodyAboutTitle: {
        type: String
    },
    bodyAboutContent: {
        type: String
    },
    bodysections: [],
    hnavlists: [],
    footerTitle: {
        type: String
    },
    footerData: {
        type: String
    },
    userhref: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    hbrandname: {
        type: String
    },
    hpgTitle: {
        type: String
    },
    hpgDescription:{
        type: String
    },
    hnavigations: [],
    hbgColor: {
        type: String
    },
    hbgImg: {
        type: String
    }
});

module.exports = mongoose.model('PageData', webSchema);
