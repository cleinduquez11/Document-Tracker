
async function JSONQueryWithAutoRefresh(url, method, token,refresh,body) {
    try {
        const response = await fetch(url, {
          method: method,
          body:body,
          headers:   {
            Authorization:
              "Bearer " +
              token,
            'Content-Type': 'application/json' ,
        
          },
        });
        const result = await response.json();
  

         console.log(result);
        if (result.status===403) {
             console.log("Error 403");
          try {
            const response = await fetch("http://localhost:5000/auth/refresh", {
              method: "POST",
              body: JSON.stringify({
                "refreshtoken":refresh 
              }),
              headers: {
                'Content-Type': 'application/json',
  
               
              },
            });
  
            const res = await response.json();
             console.log(res);
           localStorage.setItem("token", res.AccessToken);
  
           try {
            const response = await fetch(url, {
              method: method,
              body:body,
              headers: {
               
                Authorization:
                  "Bearer " +
                  res.AccessToken,
                  'Content-Type':  'application/json' 
                  
              },
            });
            const final = await response.json();
            return final;
           } catch (error) {
            
           }
  
          } catch (error) {
            
          }
          
        }
        else {
          return result;
        }
       
  
      } catch (error) {
        console.log("Error:", error);
      }
}

async function MULTIPARTQueryWithAutoRefresh(url, method, token,refresh, body) {
    try {
        const response = await fetch(url, {
          method: method,
          body:body,
          headers: {
               
            Authorization:
              "Bearer " +
              token,
              
          },
        });
        const result = await response.json();
  

         console.log(result);
        if (result.status===403) {
             console.log("Error 403");
          try {
            const response = await fetch("http://localhost:5000/auth/refresh", {
              method: "POST",
              body: JSON.stringify({
                "refreshtoken":refresh 
              }),
              headers: {
                'Content-Type': 'application/json',
  
               
              },
            });
  
            const res = await response.json();
             console.log(res);
           localStorage.setItem("token", res.AccessToken);
  
           try {
            const response = await fetch(url, {
              method: method,
              body:body,
              headers: {
               
                Authorization:
                  "Bearer " +
                  res.AccessToken,
                  
              },
            });
            const final = await response.json();
            return final;
           } catch (error) {
            
           }
  
          } catch (error) {
            
          }
          
        }
        else {
          return result;
        }
       
  
      } catch (error) {
        console.log("Error:", error);
      }
}


export{JSONQueryWithAutoRefresh, MULTIPARTQueryWithAutoRefresh}