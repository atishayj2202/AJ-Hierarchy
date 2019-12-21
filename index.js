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
        
        firebase.database().ref("Users/" + userid).set({
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
            if(approval==0){
              make_admin();
            }
            console.log("document Written")
            showafterin();
          }
        })
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

function make_admin(){
  var user = firebase.auth().currentUser;
  if(user){
    var cnt = 0;
    var cuid = user.uid;
    var yname = user.displayName;
    console.log(cuid + yname);
    firebase.database().ref("super").on('value', function(snapshot){
      cnt = snapshot.val();
      cnt = cnt + 1;
    })
    console.log(cnt);
    firebase.database().ref().set({
      "super":cnt
    }, function(error){
      console.log("In");
      if(error){
        console.log("Error");
        console.log(error.message);
      }
      else{
        console.log("changed super");
      }
    })

    //firebase.database().ref("Users/" + userid).set()
    console.log("Done Writing Aprovals");


  }
  else{
    console.log("Error");
  }
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
    if(snapshot.child("memberType").val() == "admin"){
      if(snapshot.child("aprove").val() == 1){
        document.getElementById("in-explain").innerHTML = "You are Admin(Approved).";
      }
      else{
        document.getElementById("in-explain").innerHTML = "You are Admin(Unapproved).";
      }
    }
    else if(snapshot.child("memberType").val() == "member"){
      document.getElementById("in-explain").innerHTML = "You are Member.";
    }
    else{
      document.getElementById("in-explain").innerHTML = "You are Super Admin.";
    }
    document.getElementById("top").innerHTML = "Hi,  " + snapshot.child("Name").val();
    document.getElementById("userid").innerHTML = "User Id : " + snapshot.child("id").val();
    console.log("Done");
    document.getElementById("sout").addEventListener("click", signout);
  }
  )
}


document.getElementById("bin").addEventListener("click", showsup);
document.getElementById("bup").addEventListener("click", showsin);