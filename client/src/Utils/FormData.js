

function formdata(name, description,file,filename) {
     const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    // console.log(name);
    formData.append("uploaded", file);
    formData.append("fileName", filename);

return formData;
    }

    function loginformdata(user, pass) {
        const formData = new FormData();
       formData.append("user", user);
       formData.append("pass", pass);
       // console.log(name);

   
   return formData;
       }
   


    

function updateformdata(id,name, description,file,filename) {
    const formData = new FormData();
    formData.append("ItemID", id);
   formData.append("Name", name);
   formData.append("Description", description);
   // console.log(name);
   formData.append("uploaded", file);
   formData.append("fileName", filename);

return formData;
   }


function deleteformdata(id) {
    const formData = new FormData();
    formData.append("ItemID", id);

return formData;
   }


   export{formdata, updateformdata, deleteformdata, loginformdata}


