require('dotenv').config()
const json = require('json')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const path = require('path');
const secret_key = process.env.SECRET_ACCESS_TOKEN;


function Add(req, res) {
    const {Name, Description } = req.body;
    const {UNIQUESUFFIX} = req;
    console.log(UNIQUESUFFIX)
    res.json({
        "Name": Name,
        "Description": Description,
        "filename": UNIQUESUFFIX});
    
}


module.exports = {Add}