function validate(name, description, file ) {
    if (!name || !description || !file) {
    return  {
        "Status": false,
        "Message":   
        `${!name ? "Name," : ""}${!description ? "Description," : ""}${
            !file ? "File" : ""
          } field(s) need to have a value `

    } 

}
      else {
        return {
            "Status": true,
        }
      }

    }
export{validate}