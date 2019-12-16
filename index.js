import "./style.css"
function showsup(){
  document.getElementById("signin").style.visibility = "hidden";
  document.getElementById("signin").style.height = 0;
  document.getElementById("signin").style.margin = 0;
  document.getElementById("signin").style.padding = 0;

  document.getElementById("signup").style.visibility = "visible";


  //signup
  const signupform = document.querySelector('#sup');
  signupform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signupform["uname-up"].value;
    const password = signupform["pword-up"].value;
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });
}
function showsin(){
  document.getElementById("signup").style.visibility = "hidden";
  document.getElementById("signin").style.visibility = "visible";
  document.getElementById("signin").style.height = "auto";
  document.getElementById("signin").style.padding = 10;
  document.getElementById("signin").style.margin = "auto";
  
}
document.getElementById("bin").addEventListener("click", showsup);
document.getElementById("bup").addEventListener("click", showsin);

