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
async function addDocument(req, res) {
    const {Name, Description } = req.body;
    const {UNIQUESUFFIX} = req;
    console.log(req);

    const FileLink = path.join(__dirname, '../', "storage", String(UNIQUESUFFIX));
    if(!Name || !Description || !UNIQUESUFFIX ){
        res.status(400).json({
            "Status": 400,
            "Message": `${!Name? "Name,": ""}${!Description? "Description,":""}${!UNIQUESUFFIX? "File":""} field(s) need to have values `,
        });
    }
    else {
        // Async Await Approach
        try {
            const newUser = await Document.create({
                docName:Name,
                docDescription:Description,
                fileName: UNIQUESUFFIX,
                fileLink:FileLink
            });
    
            if(newUser){
                res.status(200).json({
                    "Status": 200,
                    "Message": `${Name} Added Successfully`,
                });
            }
    
        } catch (error) {
            res.status(400).json({
                "Status": 400,
                "Message": `${error.message}`,
            });
        }

    //Promise Based Approach  
        // Document.create({
        //     docName: Name,
        //     docDescription: Description,
        //     fileName: UNIQUESUFFIX,
        //     fileLink: FileLink

        // }).then(()=> {
        //     res.status(200).json({
        //         "Status": 200,
        //         "Message": `${Name} Added Successfully`,
        //     });
        // })
        // .catch((e)=> {
        //     res.status(400).json({
        //         "Status": 400,
        //         "Message": `${e.message}`,
        //     });
        // })
         
    }   
}

//Get all the Documents
//Route GET /docs
async function getAllDocuments(req, res) {

    // Async Await Approach
    try {
        const docs = await Document.find({}).sort({
            createdAt:'desc'
        });

        if(docs){
            res.status(200).json(docs);
        }
    } catch (error) {
        res.status(404).json({'Message': `${error.message}`})
    }
    // Promise Based Approach
    // Document.find({}).sort({ createdAt: 'desc' }).then((doc)=>{
    //     res.status(200).json(doc);

    // }).catch((e)=>{
    //     res.status(404).json({'Message': `${e.message}`})
    // })


}


//Find a Document
//Route GET /docs/search
async function findDocument(req, res) {
    const {search} = req.body;

    // Async Await based Approach
    try {
        const foundDocument = await Document.where(
            {
                docName: search
            }
        ).sort({
            createdAt: 'desc'
        });

        if (foundDocument) {
            res.status(200).json(foundDocument);
            
        }
    } catch (error) {
        res.status(404).json({'Message': `${error.message}`})
    }
  

    // Promise Based Approach
    // Document.find({docName: search}).sort({ createdAt: 'desc' }).then((doc)=>{
    
    //         res.status(200).json(doc);
    

       

    // }).catch((e)=>{
    //     res.status(404).json({'Message': `${e.message}`})
    // })

}

//Update a Document
//Route PATCH /docs
async function updateDocument(req, res) {
    const{ItemID, Name, Description} = req.body;
    // Async Await Approach
    try {
        const updatedDoc = await Document.findByIdAndUpdate( ItemID, {
            docName: Name,
            docDescription: Description

        });

        if (updatedDoc) {
            res.status(200).json({'Message': "Updated"});
        }
    } catch (error) {
        res.status(404).json({'Message': `${error.message}`})
    }

    // Promise Based Approach
    // Document.findByIdAndUpdate(ItemID,
        
        
    //     { 
    //         docName: Name,
    //         docDescription: Description

        
    //     }).then(()=>{
    //     res.status(200).json({'Message': "Updated"});

    // }).catch((e)=>{
    //     res.status(404).json({'Message': `${e.message}`})
    // })

}


//Delete a Document
//Route DELETE /docs
async function deleteDocument(req, res) {
    const{id} = req.query;

    //Async await based Approach
    try {
        const {fileLink, _id} = await Document.findById(id);

        if(fileLink){
           fs.unlink(fileLink, function (err) {
                if (err) throw err;
              
                // console.log('File deleted!');
              }); 
           
            const {docName} = await Document.findByIdAndDelete(_id??id);
            // console.log(deletedDoc);
            res.status(200).json({'Message': "Deleted", "DocName": docName});
        }
        
    } catch (error) {
        res.status(404).json({'Message': `${error.message}`});
    }

    //Promise based Approach

    // Document.findById(id).then((doc)=>
    // fs.unlink(doc.fileLink, function (err) {
    //     if (err) throw err;
    //     console.log('File deleted!');
    //   })
    
    // ).catch((e)=>{
    //     res.status(404).json({'Message': `${e}`})
    // });
    // Document.findByIdAndDelete(id).then(()=>{
    //     res.status(200).json({'Message': "Deleted",
    // });

    // }).catch((e)=>{
    //     res.status(404).json({'Message': `${e.message}`})
    // })

}

//View a Document
//Route GET /docs/views
async function viewDocument(req, res) {
    const{id} = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]; 

    //async await based approach
    try {
      const user = await Document.findById(id);
      res.status(200).json({'FileLink': `http://10.10.10.125:5000/static/${user.fileName}?authToken=${token}`});


    } catch (error) {
        // console.log(error.message);
        res.status(404).json({'Message': `${error.message}`});
    }

    //Promise based approach
    // Document.findById(id).then((d)=>{
    //      res.status(200).json({'FileLink': `http://10.10.10.125:5000/static/${d.fileName}?authToken=${token}`});

    // }).catch((e)=>{
    //     res.status(404).json({'Message': `${e.message}`})
    // })

  
}

module.exports = {addDocument, getAllDocuments, updateDocument, deleteDocument, viewDocument, findDocument}