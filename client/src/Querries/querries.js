async function addDocuments(formData) {
    try {
      const response = await fetch("http://localhost:5000/docs", {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
       
       
        },
      });
      const result = await response.json();
      return result;


    //   handleClose();

    //   if (result) {
    //     if (result.Status == 400) {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "error"));
    //     } else {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "success"));
    //     }
    //     console.log(result);
    //   }
    } catch (error) {
      console.log("Error:", error);
    }
  }


  async function login(formData) {
    try {
      const response = await fetch("http://localhost:5000/auth", {
        method: "POST",
        body: formData,
        // headers: {
        //   Authorization:
        //     "Bearer " +
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
       
       
        // },
      });
      const result = await response.json();
      return result;


    //   handleClose();

    //   if (result) {
    //     if (result.Status == 400) {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "error"));
    //     } else {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "success"));
    //     }
    //     console.log(result);
    //   }
    } catch (error) {
      console.log("Error:", error);
    }
  }


  async function updateDocuments(formData) {
    try {
      const response = await fetch(`http://localhost:5000/docs`, {
        method: "PATCH",
        body:formData,
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
       
       
        },
      });
      const result = await response.json();
      return result;


    //   handleClose();

    //   if (result) {
    //     if (result.Status == 400) {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "error"));
    //     } else {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "success"));
    //     }
    //     console.log(result);
    //   }
    } catch (error) {
      console.log("Error:", error);
    }
  }


  async function deleteDocuments(id) {
    try {
      const response = await fetch(`http://localhost:5000/docs?id=${id}`, {
        method: "DELETE",
        // query: formData,
        //  body:{id: id },
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
       
       
        },
      });
      const result = await response.json();
      return result;


    //   handleClose();

    //   if (result) {
    //     if (result.Status == 400) {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "error"));
    //     } else {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "success"));
    //     }
    //     console.log(result);
    //   }
    } catch (error) {
      console.log("Error:", error);
    }
  }



  async function viewDocuments(id) {
    try {
      const response = await fetch(`http://localhost:5000/docs/views?id=${id}`, {
        method: "GET",
        // query: formData,
        //  body:{id: id },
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
       
       
        },
      });
      const result = await response.json();
      return result;


    //   handleClose();

    //   if (result) {
    //     if (result.Status == 400) {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "error"));
    //     } else {
    //       setTimeout(handleOpen(SlideTransition, result.Message, "success"));
    //     }
    //     console.log(result);
    //   }
    } catch (error) {
      console.log("Error:", error);
    }
  }




async function getAllDocuments() {
    try {
      const response = await fetch("http://localhost:5000/docs", {
        method: "GET",
        // body: formData,
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
        },
      });
      const result = await response.json();
      return result;
      // handleClose();

      // if (result) {
      //   if (result.Status == 400) {
      //     setTimeout(handleOpen(SlideTransition, result.Message, "error"));
      //   } else {
      //     setTimeout(handleOpen(SlideTransition, result.Message, "success"));
      //   }
      //   console.log(result);
      // }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  export{addDocuments,getAllDocuments, updateDocuments, deleteDocuments, viewDocuments, login}
