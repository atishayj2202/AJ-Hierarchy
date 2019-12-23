import "./style.css"
var userid;

function showsupadm(){
  hidesignin();
  showsignup();
  hideafterin();
  
  document.getElementById("HelloName").innerHTML = "Make For Admin";
  firebase.auth().signOut().then(function(){
    console.log("Signed Out");
  }).catch(function(error){
    alert(error.message);
  })
  //signup
  const signupform = document.querySelector('#sup');
  signupform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signupform["uname-up"].value;
    const password = signupform["pword-up"].value;
    const dname = signupform["name-up"].value;
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
        console.clear();
        console.log(dname, "    ",user.uid);
        firebase.database().ref("Users/"+userid).set({
          Name: dname, 
          Id : user.uid,
          MemberType : "admin"
        }, function(error){
          showafterin();
          document.getElementById("Just_admin").style.visibility = "visible";

        })
        console.log(userid);
        hidesignup();
      }
    })
  })
}

function showsupmem(){
  hidesignin();
  showsignup();
  hideafterin();
  //signup
  document.getElementById("HelloName").innerHTML = "Sign Up For Member";
  const signupform = document.querySelector('#sup');
  signupform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signupform["uname-up"].value;
    const password = signupform["pword-up"].value;
    const dname = signupform["name-up"].value;
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
        console.clear();
        console.log(dname, "    ",user.uid);
        firebase.database().ref("Users/"+userid).set({
          Name: dname, 
          Id : user.uid, 
          MemberType : "member"
        }, function(error){
          showafterin();
        })
        console.log(userid);
        hidesignup();
      }
    })
  })
}

function signout(){
  firebase.auth().signOut().then(function(){
    console.log("Signed Out");
  }).catch(function(error){
    alert(error.message);
  })
  showsin();
}



function hideafterin(){
  document.getElementById("last").style.visibility = "hidden";
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
  hideafterin();
  
}
const signinform = document.querySelector('#sin');
signinform.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("listening");
  const email = signinform["uname-in"].value;
  const password = signinform["pword-in"].value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    showafterin();
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
})

function showafterin(){

  document.getElementById("allow").style.visibility = "hidden";
  hidesignin();
  hidesignup();
  console.log("Closed Everyting")
  var user = firebase.auth().currentUser;
  userid = user.uid;
  console.log(userid);
  document.getElementById("last").style.visibility = "visible";
  firebase.database().ref("Users/"+ userid).on('value', function(snapshot){
    if(snapshot.child("MemberType").val() == "admin"){
      document.getElementById("in-explain").innerHTML = "You are Admin(Approved).";
    }
    else if(snapshot.child("MemberType").val() == "member"){
      document.getElementById("in-explain").innerHTML = "You are Member.";
      document.getElementById("Just_admin").style.visibility = "hidden";
    }
    else{
      document.getElementById("in-explain").innerHTML = "You are Super Admin.";
      document.getElementById("allow").style.visibility = "visible";
      document.getElementById("allow").addEventListener("click", showsupadm);
      document.getElementById("Just_admin").style.visibility = "hidden";
    }
    document.getElementById("top").innerHTML = "Hi,  " + snapshot.child("Name").val();
    document.getElementById("userid").innerHTML = "User Id : " + snapshot.child("Id").val();
    console.log("Done");
    document.getElementById("sout").addEventListener("click", signout);
  }
  )
  return;
}


document.getElementById("bin").addEventListener("click", showsupmem);
document.getElementById("bup").addEventListener("click", showsin);