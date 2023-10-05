require('dotenv').config()
const json = require('json')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const path = require('path');
const secret_key = process.env.SECRET_ACCESS_TOKEN;
const Document = require('../models/docModel');
const fs = require('fs');


//Add The Name, Description, File, Filename in the Database
//Route POST /docs
function Add(req, res) {
    const {Name, Description } = req.body;
    const {UNIQUESUFFIX} = req;

    const FileLink = path.join(__dirname, '../', "storage", String(UNIQUESUFFIX));
    if(!Name || !Description || !UNIQUESUFFIX ){
        res.status(400).json({
            "Status": 400,
            "Message": `${!Name? "Name,": ""}${!Description? "Description,":""}${!UNIQUESUFFIX? "File":""} field(s) need to have values `,
        });
    }
    else {
        Document.create({
            docName: Name,
            docDescription: Description,
            fileName: UNIQUESUFFIX,
            fileLink: FileLink

        }).then(()=> {
            res.status(200).json({
                "Status": 200,
                "Message": `${Name} Added Successfully`,
            });
        })
        .catch((e)=> {
            res.status(400).json({
                "Status": 400,
                "Message": `${e}`,
            });
        })
        
   
    }
    
    
}

//Get all the Documents
//Route GET /docs
function GetAllDocuments(req, res) {
    Document.find({}).then((doc)=>{
        res.status(200).json(doc);

    }).catch((e)=>{
        res.status(404).json({'Message': `${e}`})
    })

  


}

function UpdateDocument(req, res) {
    const{ItemID, Name, Description, fileName} = req.body;
    const{UNIQUESUFFIX} = req;
    const FileLink = path.join(__dirname, '../', "storage", String(UNIQUESUFFIX));
    console.log(req)
if (!UNIQUESUFFIX) {
        return;
}
else {
    Document.findById(ItemID).then((doc)=>
    fs.unlink(doc.fileLink, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      })
    
    ).catch((e)=>{
        res.status(404).json({'Message': `${e}`})
    });
}
 
    Document.findByIdAndUpdate(ItemID,
        
        
        { 
            docName: Name,
            docDescription: Description,
            fileName: UNIQUESUFFIX,
            fileLink:FileLink
        
        }).then(()=>{
        res.status(200).json({'Message': "Updated"});

    }).catch((e)=>{
        res.status(404).json({'Message': `${e}`})
    })

  


}


function deleteDocument(req, res) {
    const{id} = req.query;

    Document.findById(id).then((doc)=>
    fs.unlink(doc.fileLink, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      })
    
    ).catch((e)=>{
        res.status(404).json({'Message': `${e}`})
    });
    Document.findByIdAndDelete(id).then(()=>{
        res.status(200).json({'Message': "Deleted",
    });

    }).catch((e)=>{
        res.status(404).json({'Message': `${e}`})
    })

  


}

function viewDocument(req, res) {
    const{id} = req.query;
    Document.findById(id).then((d)=>{
        // res.sendFile(path.join(__dirname + '../' + '/storage/' + d.fileName));
         res.status(200).json({'FileLink': `http://localhost:5000/static/${d.fileName}?authToken=123`});

    }).catch((e)=>{
        res.status(404).json({'Message': `${e}`})
    })

  


}

module.exports = {Add, GetAllDocuments, UpdateDocument, deleteDocument, viewDocument}