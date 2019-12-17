import "./style.css"
var userid;
function siout(){
  console.log("In Out");
  firebase.auth().signOut().then(function() {
    console.log("Out");
  }).catch(function(error) {
    alert(error.message);
  });
}
function showsup(){
  hidesignin();
  showsignup();
  //signup
  const signupform = document.querySelector('#sup');
  signupform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signupform["uname-up"].value;
    const password = signupform["pword-up"].value;
    const dname = signupform["name-up"].value;
    const memtype = document.getElementById("memt").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      alert(errorMessage);
    }).then(cred => {
      console.log(cred);
      if(checker() == 1){
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: dname
        }).then(function(){
          alert("Hello " + user.displayName);
        }).catch(function(error){
          var errorMessage = error.message;
          alert(errorMessage);
        });
        userid = user.uid;
        var approval = 0;
        if(memtype == "member"){
          approval = 1;
        }
        db.collection("Users").doc(user.uid).set({
            Name: dname,
            id: user.uid,
            aprove : approval,
            memberType : memtype, 
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        userid = user.uid;
        console.log(userid);
        hidesignup();
      }
    });
  });
}
function checker(){
  var user = firebase.auth().currentUser;
  if(user != null){
    return 1;
  }
  else{
    return 0;
  }
}
function showsignin(){
  document.getElementById("signin").style.visibility = "visible";
  document.getElementById("signin").style.height = "auto";
  document.getElementById("signin").style.padding = 10;
  document.getElementById("signin").style.margin = "auto";
}
function showsignup(){
  document.getElementById("signup").style.visibility = "visible";
  document.getElementById("signup").style.height = "auto";
  document.getElementById("signup").style.padding = 10;
  document.getElementById("signup").style.margin = "auto";  
}
function hidesignup(){
  document.getElementById("signup").style.visibility = "hidden";
  document.getElementById("signup").style.height = 0;
  document.getElementById("signup").style.padding = 0;
  document.getElementById("signup").style.margin = 0;   
}
function hidesignin(){
  document.getElementById("signin").style.visibility = "hidden";
  document.getElementById("signin").style.height = 0;
  document.getElementById("signin").style.padding = 0;
  document.getElementById("signin").style.margin = 0;   
}
function showsin(){
  showsignin();
  hidesignup();
  if(checker == 1){
    hidesignin();
  }
  
}
const signinform = document.querySelector('#sin');
signinform.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("listening");
  const email = signinform["uname-in"].value;
  const password = signinform["pword-in"].value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
})

function showafterin(){
  var user = firebase.auth().currentUser;
  userid = user.uid;
  console.log(userid);
  document.getElementById("last").style.visibility == "visible";
}

document.getElementById("bin").addEventListener("click", showsup);
document.getElementById("bup").addEventListener("click", showsin);

document.getElementById("main").addEventListener("load", siout());