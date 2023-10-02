const  Validate = (req, res, next) => {
    const {Name, Description, uploaded } = req.body;
    const {UNIQUESUFFIX} = req;
    console.log(req)
    if(!Name || !Description || !uploaded ){
        // const fields = {
        //     name: Name,
        //     description: Description,
        //     file: UNIQUESUFFIX
        // }
        res.json({
            "Status": 400,
            "Message": `${!Name? "Name,": ""}${!Description? "Description,":""}${!uploaded? "File":""} field(s) need to have values `,
        });
    }
    else {
        res.status(200).json({
            "Status": 200,
            "Message": `${UNIQUESUFFIX} Uploaded Successfully`,
        });
        next();
    }
    
    
}

module.exports = Validate;