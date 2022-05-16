document.getElementById("delet").style.display= "none";
document.getElementById("edit").addEventListener("click", editbooking);
document.getElementById("edit").addEventListener("click", changeText);
function editbooking()
 {
   document.getElementById("Rname").removeAttribute("disabled");
   document.getElementById("Rlocation").removeAttribute("disabled");
   document.getElementById("Rcapacity").removeAttribute("disabled");
   document.getElementById("Rprice").removeAttribute("disabled");
   document.getElementById("Rdate").removeAttribute("disabled");
   document.getElementById("RsT").removeAttribute("disabled");
   document.getElementById("ReT").removeAttribute("disabled");
   document.getElementById("Rprom").removeAttribute("disabled");
   document.getElementById("Ramm").removeAttribute("disabled");
   document.getElementById("delet").style.display= "block"
   
 }

 function changeText(){
   let element1 = document.getElementById("edit");
   if (element1.value=="Edit") 
     element1.value = "Finish";
     element1.id = "fin"

     let element2 = document.getElementById("Rd");
   if (element2.innerHTML=="Room Details") 
     element2.innerHTML = "Edit Room";
     element2.id = "ed"
   }

document.getElementById("back").addEventListener("click", back);
document.getElementById("back").addEventListener("click", backchangeText);
 function back()
 {
   document.getElementById("Rname").setAttribute("disabled", true);
   document.getElementById("Rlocation").setAttribute("disabled", true);
   document.getElementById("Rcapacity").setAttribute("disabled", true);
   document.getElementById("Rprice").setAttribute("disabled", true);
   document.getElementById("Rdate").setAttribute("disabled", true);
   document.getElementById("RsT").setAttribute("disabled", true);
   document.getElementById("ReT").setAttribute("disabled", true);
   document.getElementById("Rprom").setAttribute("disabled", true);
   document.getElementById("Ramm").setAttribute("disabled", true);
   document.getElementById("delet").style.display= "none";
 }
 function backchangeText(){
   let element1 = document.getElementById("fin");
   if (element1.value=="Finish") 
     element1.value = "Edit";
     element1.id = "edit"

     let element2 = document.getElementById("ed");
   if (element2.innerHTML=="Edit Room") 
     element2.innerHTML = "Room Details";
     element2.id = "Rd"
   }