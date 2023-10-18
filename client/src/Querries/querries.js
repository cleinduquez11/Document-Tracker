import { JSONQueryWithAutoRefresh, MULTIPARTQueryWithAutoRefresh} from "./AutoRefresh";




async function addDocuments(formData,token,refresh) {
  const res = await MULTIPARTQueryWithAutoRefresh("http://localhost:5000/docs",
    "POST", 
    token,
     refresh,
      formData
  );

  return res;

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


async function updateDocuments(id, name, description, token, refresh) {
    const res = JSONQueryWithAutoRefresh(`http://localhost:5000/docs`, 
    "PATCH",
    token,
     refresh,
     JSON.stringify({
      "ItemID":id,
      "Name": name,
    "Description":description
    }));

    return res;
   
  }


  async function deleteDocuments(id, token,refresh) {

    const res = MULTIPARTQueryWithAutoRefresh(`http://localhost:5000/docs?id=${id}`,"DELETE", token, refresh, null);

    return res;
   
  }


async function logout(id) {
    try {
      const response = await fetch(`http://localhost:5000/auth/logout?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      return result;


    } catch (error) {
      console.log("Error:", error);
    }
  }



async function viewDocuments(id,token, refresh) {
    const res = await JSONQueryWithAutoRefresh("http://localhost:5000/docs/views",
    "POST", 
    token,
     refresh,
     JSON.stringify({
      "id": id
  }),

 
  );
  return res;
   
  }




async function getAllDocuments(token, refresh) {

 const res = await JSONQueryWithAutoRefresh("http://localhost:5000/docs",
 "GET", 
 token,
 refresh,null);

 return res;

  }

async function findDocument(search, token, refresh) {

const res = JSONQueryWithAutoRefresh("http://localhost:5000/docs/search",
    "POST",
    token, 
    refresh,
    JSON.stringify({
      "search": search,
  }));

  return res;
   
  }



  export{addDocuments,getAllDocuments, updateDocuments, deleteDocuments, viewDocuments, login, findDocument, logout}
