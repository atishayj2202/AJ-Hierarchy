import "./style.css"
var userid;

function showsup(){
  hidesignin();
  showsignup();
  hideafterin();
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
        console.clear();
        console.log(dname, "    ",user.uid, "    ",approval, "    ",memtype, "    ",);
        firebase.database().ref("Users/"+userid).set({
          Name: dname, 
          Id : user.uid, 
          Aprove : approval, 
          MemberType : memtype
        }, function(error){
          showafterin();
          if(approval == 0){
            var cnt;
            firebase.database().ref("super").once('value').then(function(snapshot){
              cnt = snapshot.val();
              cnt = cnt + 1;
              console.clear();
              console.log("Reading Super");
              console.log(cnt);
              firebase.database().ref("super").set(cnt);
            })
          }
          
          
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
  hidesignin();
  hidesignup();
  console.log("Closed Everyting")
  var user = firebase.auth().currentUser;
  userid = user.uid;
  console.log(userid);
  document.getElementById("last").style.visibility = "visible";
  firebase.database().ref("Users/"+ userid).on('value', function(snapshot){
    if(snapshot.child("MemberType").val() == "admin"){
      if(snapshot.child("aprove").val() == 1){
        document.getElementById("in-explain").innerHTML = "You are Admin(Approved).";
      }
      else{
        document.getElementById("in-explain").innerHTML = "You are Admin(Unapproved).";
      }
    }
    else if(snapshot.child("MemberType").val() == "member"){
      document.getElementById("in-explain").innerHTML = "You are Member.";
    }
    else{
      document.getElementById("in-explain").innerHTML = "You are Super Admin.";
    }
    document.getElementById("top").innerHTML = "Hi,  " + snapshot.child("Name").val();
    document.getElementById("userid").innerHTML = "User Id : " + snapshot.child("Id").val();
    console.log("Done");
    document.getElementById("sout").addEventListener("click", signout);
  }
  )
  return;
}


document.getElementById("bin").addEventListener("click", showsup);
document.getElementById("bup").addEventListener("click", showsin);