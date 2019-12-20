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
        
        firebase.database().ref("Users/").set({
          "Name": dname, 
          "id": user.uid, 
          "aprove" : approval, 
          "memberType" : memtype,
        }, function(error){
          console.log("In");
          if(error){
            console.log("Error");
            console.log(error.message);
          }
          else{
            if(approval==1){
              // make admin()
            }
            showafterin();
          }
        })
        userid = user.uid;
        console.log(userid);
        hidesignup();
      }
    });
  });
}
function signout(){
  firebase.auth().signOut().then(function(){
    console.log("Signed Out");
  }).catch(function(error){
    alert(error.message);
  })
  showsin();
}
/*
function make_admin(){
  var user = firebase.auth().currentUser;
  if(user){
    var cnt = 0;
    var cuid = user.uid;
    var yname = user.displayName;
    console.log(cuid + yname);
    db.collection("Users").doc("super").get().then(function(doc){
      cnt = doc.data().No;
      cnt = cnt + 1;

    })
  
    
    db.collection("Users").doc("super").update({
      "No" : cnt,
    });
    console.log("Done Writing Super " + cnt);
    db.collection("Aprovals").doc(cnt).set({
      "name" : yname,
      "id" : cuid
    });
    console.log("Done Writing Aprovals");


  }
  else{
    console.log("Error");
  }
}
*/
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
  database.ref("Users/"+ userid).once('value').then(function(error){
    if(error){
      console.log(error.message);
    }
    else{
      if(snapshot.val().memberType == "admin"){
        if(snapshot.val().aprove == 1){
          document.getElementById("in-explain").innerHTML = "You are Admin(Approved).";
        }
        else{
          document.getElementById("in-explain").innerHTML = "You are Admin(Approved).";
        }
      }
      else if(snapshot.val().memberType == "member"){
        document.getElementById("in-explain").innerHTML = "You are Member.";
      }
      else{
        document.getElementById("in-explain").innerHTML = "You are Super Admin.";
      }
      document.getElementById("top").innerHTML = "Hi,  " + snapshot.val().Name;
      document.getElementById("userid").innerHTML = "User Id : " + snapshot.val().id;
      document.getElementById("sout").addEventListener("click", signout);
    }
  })
}


document.getElementById("bin").addEventListener("click", showsup);
document.getElementById("bup").addEventListener("click", showsin);