import React from 'react';
import './login.css';

var callBackendAPI = async () => {
    var user = document.getElementById('uname').value;
    var password = document.getElementById('psw').value;
    const responce = await fetch('/register?user=' + user + '&password=' + password);
    const body = await responce.text();

    if (responce.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

function create() {
    callBackendAPI().then(res => {
        if (res === "done") {
            //really unsecure but whatever
            localStorage.setItem("username", document.getElementById('uname').value);
            localStorage.setItem("password", document.getElementById('psw').value);
            window.location = "/";
        } else {
            document.getElementById("incorrect").style.visibility = "visible";
            document.getElementById("incorrect").innerHTML = res;
        }
    });
}

export default function Register() {
    return (
        <main>
            <div className="content">
                <div className="login">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" id="uname" name="uname"
                           required/>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" id="psw" name="psw" required/>
                    <p id="incorrect"></p>
                    <button type="submit" onClick={create}>Create Account</button>
                </div>
            </div>
        </main>
    );
}
