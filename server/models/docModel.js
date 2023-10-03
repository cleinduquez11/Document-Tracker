const mongoose = require('mongoose');
const Schema = mongoose.Schema


const DocSchema = new Schema(
    
{
docName: {
    type: String,
    required: true,
    
},
docDescription:{
    type: String,
    required: true,
},
fileName:{
    type: String,
    required: true,
},
fileLink:{
    type: String
}

},
{
    timestamps:true
}


);

const Document = mongoose.model('Docs',DocSchema);

module.exports = Document;
