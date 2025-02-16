document.getElementById('signup-form').addEventListener("submit", async (event)=>{
    event.preventDefault();

    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()
    const passwordConfirm = document.getElementById('passwordConfirm').value.trim()

    const formData = {
        firstName,
        lastName,
        userName,
        email,
        password,
        passwordConfirm
    }
    console.log("formData:", formData)

    try{
        const response = await fetch("http://localhost:7070/auth/signup",{
            method:"POST",
            headers:{
              "content-type":"application/json", 
            },
            body: JSON.stringify(formData)
        })

        if(response.ok){
            const data = await response.json()
            alert(`sign up successful! ${formData.firstName}` );
            window.location.href = 'loggin.html'
        } else{
            const errorData = await response.json();
            alert("error:" + errorData.message)
        }
    }catch(err){
        console.log('error signing up:', err)
        alert('an error occured please try again.')
    }
})