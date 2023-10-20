import { JSONQueryWithAutoRefresh, MULTIPARTQueryWithAutoRefresh} from "./AutoRefresh";


const url = 'http://10.10.10.125:5000'

async function addDocuments(formData,token,refresh) {
  const res = await MULTIPARTQueryWithAutoRefresh(`${url}/docs`,
    "POST", 
    token,
     refresh,
      formData
  );

  return res;

  }


async function login(user,pass) {
    try {
      const response = await fetch(`${url}/auth`, {
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
    const res = JSONQueryWithAutoRefresh(`${url}/docs`, 
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

    const res = MULTIPARTQueryWithAutoRefresh(`${url}/docs?id=${id}`,"DELETE", token, refresh, null);

    return res;
   
  }


async function logout(id, refresh) {
    try {
      const response = await fetch(`${url}/auth/logout?id=${id}&refreshtoken=${refresh}`, {
        method: "DELETE",
      });
      const result = await response.json();
      return result;


    } catch (error) {
      console.log("Error:", error);
    }
  }



async function viewDocuments(id,token, refresh) {
    const res = await JSONQueryWithAutoRefresh(`${url}/docs/views`,
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

 const res = await JSONQueryWithAutoRefresh(`${url}/docs`,
 "GET", 
 token,
 refresh,null);

 return res;

  }

async function findDocument(search, token, refresh) {

const res = JSONQueryWithAutoRefresh(`${url}/docs/search`,
    "POST",
    token, 
    refresh,
    JSON.stringify({
      "search": search,
  }));

  return res;
   
  }



  export{addDocuments,getAllDocuments, updateDocuments, deleteDocuments, viewDocuments, login, findDocument, logout}
