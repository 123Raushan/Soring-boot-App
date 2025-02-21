window.addEventListener('DOMContentLoaded', function (event) {
    //Password
    const password = document.getElementById('signInPassword');
    const toggleButton = this.document.getElementById('toggleButton');
    const signIntab = this.document.getElementById('signIn-tab');
    let emailVerified = false;
    let otpVerified = false;
    const localhostEmail=localStorage.getItem('email');
    const localhostUserName=this.localStorage.getItem('name');
    const av=document.getElementById('profileAvatar');
    if(localhostEmail!=null){
        av.innerHTML=localhostUserName.charAt(0);
        this.document.getElementById('emailProfile').innerHTML=localhostEmail;
        this.document.getElementById('UserNameProfile').innerHTML=localhostUserName;
    }
    
    toggleButton.addEventListener('click', () => {
        if (password.type === 'password') {
            password.type = 'text';
            toggleButton.textContent = 'Hide';
        }
        else {
            password.type = 'password';
            toggleButton.textContent = 'Show';
        }
    })
    //SiginUp ka password
    const signUpInPassword = document.getElementById('signUpInPassword');
    const stoggleButton = this.document.getElementById('stoggleButton');
    stoggleButton.addEventListener('click', () => {
        console.log(signUpInPassword.textContent);

        if (signUpInPassword.type === 'password') {
            signUpInPassword.type = 'text';
            stoggleButton.textContent = 'Hide';
        }
        else {
            signUpInPassword.type = 'password';
            stoggleButton.textContent = 'Show';
        }
    })

    function startQuiz(topic) {
        alert(`Starting quiz on ${topic}!`);
    }
    async function sendOtp() {
        // //event.preventDefault(); // Page reload prevent karega
        // Show response message
    }
    const verifyButton = document.getElementById('verifyButton');
    const otpContainer = document.getElementById('otpContainer');
    const otpBoxes = document.getElementById('otpBoxes');
    var timerElement = document.getElementById('timer');
    const verifyOtpButton = document.getElementById('verifyOtpButton');

    let timer; // Variable to store the timer interval

    verifyButton.addEventListener('click', async function () {
        //send Otp
        const email = document.getElementById("signUpEmail").value;
        verifyButton.disabled=true;
        document.getElementById('signUpEmail').readOnly=true
        try{
            const response = await fetch("https://quiz-server-production-71dd.up.railway.app/apiEmail/sendOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `email=${encodeURIComponent(email)}`,
            });
            const result = await response.text();
            alert(result)
            if (result === "Email Allready Exist") {
                alert("Email Allready Exist")
                document.getElementById('signUpEmail').readOnly=false
                verifyButton.disabled=false;

            }
            else {
                document.getElementById("message").innerText = result;
                // Show the OTP container
    
                otpContainer.style.display = 'block';
    
                // Clear any existing OTP boxes
                otpBoxes.innerHTML = '';
    
                // Generate 6 OTP input boxes
                for (let i = 0; i < 6; i++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.required = true;
                    input.maxLength = '1';
                    input.className = 'form-control text-center otpInputs';
                    input.style.width = '40px';
                    otpBoxes.appendChild(input);
    
                    // Auto-focus on the next input
                    input.addEventListener('input', function () {
                        if (input.value.length === 1 && input.nextElementSibling) {
                            input.nextElementSibling.focus();
                        }
                    });
                }
                // Start the 60-second timer
                startTimer(60);
            }
        }
        catch(error){
            //alert(error)
            console.log(error);
            
            alert("Network error, try again later.");
        }

    });

    function startTimer(duration) {
        let timeRemaining = duration;
        timerElement.textContent = `${timeRemaining}s`;

        // Clear any existing timer
        if (timer) clearInterval(timer);

        // Update the timer every second
        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = `${timeRemaining}s`;

            // Stop the timer when it reaches 0
            if (timeRemaining <= 0) {
                clearInterval(timer);
                timerElement.textContent = 'Expired';
                verifyOtpButton.disabled = true; // Disable the verify button
            }
        }, 1000);

        // Enable the verify button
        verifyOtpButton.disabled = false;
    }
    verifyOtpButton.addEventListener('click', async function () {
        const otpInputs = document.getElementsByClassName('otpInputs');
        let otpValue = '';
        for (const element of otpInputs) {
            otpValue += element.value;
        }
        console.log(otpValue);
        const email = document.getElementById("signUpEmail").value;
        const otp = otpValue;

        const response = await fetch("https://quiz-server-production-71dd.up.railway.app/apiEmail/verifyOtp", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
        });

        const result = await response.text();
        document.getElementById("message").innerText = result;
        const signUpButton = document.getElementById('signUpButton');
        if (result === "OTP verified successfully!") {
            const email = document.getElementById("signUpEmail");
            email.readonly =true
                signUpButton.disabled = false;
            clearInterval(timer);
            var timerElement = document.getElementById('timer');
            timerElement.textContent = 'Verified';
            console.log(timerElement);

            otpVerified = true
            verifyOtpButton.disabled = true
        }
        else {
            signUpButton.disabled = true;
            otpVerified = false
        }
    })
    signUpButton.addEventListener('click', async function () {
        event.preventDefault();
        let isValid = true;
        var signUpFName = document.getElementById('signUpFName').value.trim();

        var signUpLName = document.getElementById('signUpLName').value.trim();
        var Email = document.getElementById('signUpEmail').value.trim()
        var pwrd = document.getElementById('signUpInPassword').value.trim();
        if (!otpVerified) {
            alert("Verified Email And Otp");
        }
        else if (signUpFName === '' || signUpLName === '' || Email === '' || pwrd === '') {
            isValid = false;
            alert("Fill the All input Field requird");
        }
        else {
            var fullName = signUpFName.trim() + ' ' + signUpLName.trim();
            const jsonuser = {
                "fullName": fullName,
                "email": Email,
                "pwrd": pwrd
            }
            try {
                const response = await fetch(`https://quiz-server-production-71dd.up.railway.app/saveUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonuser)
                });
                if (response.ok) {
                    const data = await response.text();
                    console.log('Registration saved successfully:', data);
                    signIntab.click();
                } else {
                    console.error('Error:', response.statusText);
                    alert("Error saving the question");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Network error, try again later.");
            }
        }
    })
    const SiginInButton = this.document.getElementById('SiginInButton');
    SiginInButton.addEventListener('click', async () => {
        event.preventDefault();
        try {
            var signInEmail = this.document.getElementById('signInEmail').value;
            var password = this.document.getElementById('signInPassword').value;
            const jsonUser = {
                "email": signInEmail,
                "pwrd": password
            }
            const response = await fetch(`https://quiz-server-production-71dd.up.railway.app/apiEmail/LoginUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonUser)
            });

            if (response.ok) {
                const data = await response.text();
                console.log("hello");
                const namePart = data.split("Login succesfull")[1]?.trim(); // Trim Extra Spaces
                if (namePart && namePart.length > 0) {
                    const firstChar = namePart.charAt(0).toUpperCase(); // First Letter Capital
                    const av=document.getElementById('profileAvatar');
                    av.innerHTML=firstChar;
                    localStorage.setItem("email", signInEmail);
                    localStorage.setItem("name", namePart);
                    document.getElementById('signInEmail').value='';
                    document.getElementById('signInPassword').value='';
                    
                } else {
                    console.error("Name extract nahi ho paya!");
                }
                this.alert(data)

            } else {
                console.error('Error:', response.statusText);
                alert("Error saving the question");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Network error, try again later.");
        }
    })
    const logoutBtn=this.document.getElementById('logoutBtn');
   logoutBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        console.log("logout");
        av.innerHTML='';
        this.document.getElementById('emailProfile').innerHTML='';
        this.document.getElementById('UserNameProfile').innerHTML='';
        this.localStorage.clear();
   })

   

})
