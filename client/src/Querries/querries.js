async function addDocuments(formData, token) {
    try {
      const response = await fetch("http://localhost:5000/docs", {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer " +
            token,
       
       
        },
      });
      const result = await response.json();
      return result;

    } catch (error) {
      console.log("Error:", error);
    }
  }


  async function login(user,pass) {
    try {
      const response = await fetch("http://localhost:5000/auth", {

        method: "POST",
        
        body: JSON.stringify({
          "user": user,
          "pass": pass
      
      }),
        headers: {
          'Content-Type': 'application/json',
      
        },
      });
      const result = await response.json();
      return result;

    } catch (error) {
      console.log("Error:", error);
    }
  }


  async function updateDocuments(formData, token) {
    try {
      const response = await fetch(`http://localhost:5000/docs`, {
        method: "PATCH",
        body:formData,
        headers: {
          Authorization:
            "Bearer " +
            token,
       
       
        },
      });
      const result = await response.json();
      return result;



    } catch (error) {
      console.log("Error:", error);
    }
  }


  async function deleteDocuments(id, token) {
    try {
      const response = await fetch(`http://localhost:5000/docs?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " +
            token,
       
       
        },
      });
      const result = await response.json();
      return result;


    } catch (error) {
      console.log("Error:", error);
    }
  }



  async function viewDocuments(id,token) {
    try {
      const response = await fetch(`http://localhost:5000/docs/views`, {
        method: "POST",
        body: JSON.stringify({
          "id": id,
          "token": token
      
      }),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " +
            token,
       
       
        },
      });
      const result = await response.json();
      return result;



    } catch (error) {
      console.log("Error:", error);
    }
  }




async function getAllDocuments(token) {
    try {
      const response = await fetch("http://localhost:5000/docs", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            token,
        },
      });
      const result = await response.json();
      return result;

    } catch (error) {
      console.log("Error:", error);
    }
  }

  export{addDocuments,getAllDocuments, updateDocuments, deleteDocuments, viewDocuments, login}
