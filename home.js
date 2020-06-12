var SignInButton = document.getElementById("login");
var SignUpButton = document.getElementById("signup");
var Button       = document.getElementById("btn");

function Signup(){
    SignInButton.style.left ="-400px";
    SignUpButton.style.left="50px"; 
    Button.style.left="110px";
}

function Login(){
    SignInButton.style.left ="500px";
    SignUpButton.style.left="450px"; 
    Button.style.left="0";
}