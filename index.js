import "./style.css"

function getin(){
  firebase.auth().signInWithEmailAndPassword(document.getElementById("uname").Value, document.getElementById("pword").Value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}