let maincontainer = document.getElementById("main");
//let inputname=document.getElementById('inputname');
//let formname = document.getElementById('name');
let phonenumber = document.getElementById('mobilenumber');
let btn = document.getElementById('btn');
let alert = document.getElementById('alert');
let main = document.getElementById('main');
//let logintext = document.getElementById('logintext');
let heading = document.getElementById('htext');
let regexName = /^[a-zA-Z ]{4,30}$/;
let regexnumber = /^[0-9]{10}$/;
let baseUrl = 'http://localhost:3000/';
let messsage = "";
let dt = "";

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (phonenumber.value == "") {
        messsage = "PhoneNumber Required";
        FormValidation(messsage);
    }
    else if (regexnumber.test(phonenumber.value) != true) {
        messsage = "PhoneNumber 10 character Required";
        FormValidation(messsage);
    }
    else {
        let mob = parseInt(phonenumber.value);
        if (isNaN(mob)) {
            alert("cheack your number");
        }
        else {
            btn.classList.add('disabled');
            document.getElementById('spiner').classList.remove('d-none');
            localStorage.setItem("mobileNumber", mob);
            const response = await sendVerificationCode(mob);
            //this is for twilio
            /*if(response.status==='pending')
            {
                localStorage.setItem("name", formname.value);
                localStorage.setItem("mobileNumber", phonenumber.value);
                localStorage.setItem("signin", "approved");
                formname.value = "";
                phonenumber.value = "";
                window.document.location = `/otp`;
            }*/

            //this is for 2 factor authentication

            if (response.Status == 'Success') {
                phonenumber.value = "";
                localStorage.setItem("Details", response.Details);
                window.document.location = '/otp';
            }
        }
    }

});

function FormValidation(messsage) {

    if (btn.innerText == "SUBMIT") {
        alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:15px">${" " + messsage}`;
        alert.style.display = "block";
        main.style.height = "27rem";
        setTimeout(() => {
            alert.style.display = "none";
            main.style.height = "25rem";
        }, 2000);
    }
    else {
        alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:15px">${" " + messsage}`;
        alert.style.display = "block";
        main.style.height = "20rem";
        setTimeout(() => {
            alert.style.display = "none";
            main.style.height = "19rem";
        }, 2000);
    }
}

//send verification code to phone number
/*async function sendVerificationCode(mob) {

    const res = await axios.post(baseUrl + `send-verifaction-otp`, { mob });

    if (res.status === 200) {
        return res.data.verification;
    }
    else {
        return res.data;
    }
}*/

//2 factor authentication
async function sendVerificationCode(mob) {

    let api_key = '3fb42b07-fc66-11ec-9c12-0200cd936042';
    let url = `https://2factor.in/API/V1/${api_key}/SMS/${mob}/AUTOGEN`;

    let response = await fetch(url)
    const myJson = await response.json();
    return myJson;
}

/*async function searching() {
    let url = '/api/searching';
    let data = {
        "mobileNumber": phonenumber.value
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, params)
    const myJson = await response.json();
    return myJson;
}*/