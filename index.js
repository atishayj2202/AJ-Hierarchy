import "./style.css"
function showsup(){
  document.getElementById("signin").style.visibility = "hidden";
  document.getElementById("signin").style.height = 0;
  document.getElementById("signin").style.margin = 0;
  document.getElementById("signin").style.padding = 0;

  document.getElementById("signup").style.visibility = "visible";
}
function showsin(){
  document.getElementById("signup").style.visibility = "hidden";
  document.getElementById("signin").style.visibility = "visible";
  document.getElementById("signin").style.height = auto;
  document.getElementById("signin").style.padding = 10;
}
document.getElementById("bin").addEventListener("click", showsup);
document.getElementById("bup").addEventListener("click", showsin);