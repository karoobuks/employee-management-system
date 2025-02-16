document.getElementById('signup-form').addEventListener('submit', async (event)=>{
    event.preventDefault();

    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()

    const formData = {
        email,
        password
    }

    console.log("formData:", formData)

    try{
        const response = await fetch("http://localhost:7070/auth/login", {
           method:"POST",
           headers:{
            "content-type":"application/json",
           },
           body:JSON.stringify(formData)
        })
        if(response.ok){
          const data = await response.json()
          alert('successfully logged in')
          window.location.href = 'dashboard.html'  
        }
        else{
            const errorData = await response.json()
            alert("error" + errorData.message)
        }
    }catch(error){
       console.log('an error logging in', error)
       alert('An error occured please try again.') 
    }
})