document.getElementById("delet").style.display= "none";
document.getElementById("edit").addEventListener("click", editbooking);
document.getElementById("edit").addEventListener("click", changeText);
function editbooking()
 {
   document.getElementById("Rdate").removeAttribute("disabled");
   document.getElementById("RsT").removeAttribute("disabled");
   document.getElementById("ReT").removeAttribute("disabled");
   document.getElementById("Rprom").removeAttribute("disabled");
   document.getElementById("delet").style.display= "block"
   
 }

 function changeText(){
   let element = document.getElementById("edit");
   if (element.value=="Edit") 
     element.value = "Procced";
     element.id = "procced"
   }

document.getElementById("back").addEventListener("click", back);
document.getElementById("back").addEventListener("click", backchangeText);
 function back()
 {
   document.getElementById("Rdate").setAttribute("disabled", true);
   document.getElementById("RsT").setAttribute("disabled", true);
   document.getElementById("ReT").setAttribute("disabled", true);
   document.getElementById("Rprom").setAttribute("disabled", true);
   document.getElementById("delet").style.display= "none";
 }
 function backchangeText(){
   let element = document.getElementById("procced");
   if (element.value=="Procced") 
     element.value = "Edit";
     element.id = "edit"
   }
