import "./style.css"
function showsup(){
  document.getElementById("signin").style.visibility = "hidden";
  document.getElementById("signup").style.visibility = "visible";
}
function showsin(){
  document.getElementById("signup").style.visibility = "hidden";
  document.getElementById("signin").style.visibility = "visible";
}
document.getElementById("bin").addEventListener("click",showsup);