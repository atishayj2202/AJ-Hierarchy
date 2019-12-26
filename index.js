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
          var i;
          firebase.database().ref('cnt').once('value').then(function(snapshot){
            i = snapshot.val();
            i = i+1;
            firebase.database().ref("xyz/" + i).set(userid, function(error){
              firebase.database().ref("cnt").set(i);
            });
          })
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
          var i;
          firebase.database().ref('cnt').once('value').then(function(snapshot){
            i = snapshot.val();
            i = i+1;
            firebase.database().ref("xyz/" + i).set(userid, function(error){
              firebase.database().ref("cnt").set(i);
            });
          })
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
    document.getElementById("Just_admin").style.visibility = "hidden";
  }).catch(function(error){
    alert(error.message);
  })
  showsin();
}



function hideafterin(){
  document.getElementById("last").style.visibility = "hidden";
  document.getElementById("last").style.height = 0;
  document.getElementById("last").style.padding = 0;
  document.getElementById("last").style.margin = 0;   
  document.getElementById("allow").style.visibility = "hidden";
  document.getElementById("deny").style.visibility = "hidden";
  document.getElementById("Just_admin").style.visibility = "hidden";

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
  document.getElementById("last").style.height = "auto";
  document.getElementById("last").style.padding = 10;
  document.getElementById("last").style.margin = "auto";
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
      document.getElementById("deny").style.visibility = "visible";
      document.getElementById("allow").addEventListener("click", showsupadm);
      document.getElementById("deny").addEventListener("click", showlist);
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
function showlist(){
  hideafterin();
  document.getElementById("denydiv").style.visibility = "visible";
  document.getElementById("backer").style.visibility = "visible";
  
  var data = null;
  var ingt;
  firebase.database().ref("cnt").once('value').then(function(snapshot){
    ingt = snapshot.val(); 
    var i = 1;
    var xid;
    while(i <= ingt){
      firebase.database().ref('xyz/'+i).once('value').then(function(snapshot){
        xid = snapshot.val();
        firebase.database().ref("Users/"+xid).once('value').then(function(snapshot){
          data = data + "<dt>" + snapshot.child("Name").val() + "</dt><dd>ID :" +  snapshot.child("Email").val() + "</dd><dd>Member Type : " + snapshot.child("MemberType").val() + "</dd>";
        });
      })
    }
    document.getElementById("denylist").innerHTML = data;
  })
}

document.getElementById("bin").addEventListener("click", showsupmem);
document.getElementById("bup").addEventListener("click", showsin);
