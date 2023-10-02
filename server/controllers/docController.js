require('dotenv').config()
const json = require('json')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const path = require('path');
const secret_key = process.env.SECRET_ACCESS_TOKEN;


function Add(req, res) {
    const {Name, Description } = req.body;
    const {UNIQUESUFFIX} = req;
    if(!Name || !Description || !UNIQUESUFFIX ){
        const fields = {
            name: Name,
            description: Description,
            file: UNIQUESUFFIX
        }
        res.status(400).json({
            "Status": 400,
            "Message": `${!Name? "Name,": ""}${!Description? "Description,":""}${!UNIQUESUFFIX? "File":""} field(s) need to have values `,
        });
    }
    else {
        res.status(200).json({
            "Status": 200,
            "Message": `${UNIQUESUFFIX} Uploaded Successfully`,
        });
    }
    
    
}


module.exports = {Add}