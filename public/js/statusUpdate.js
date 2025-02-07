const ws = new WebSocket("ws://localhost:1880/ws/test4");

 function updateStatusMessage(content, color) {
   document.getElementById('status-message').innerHTML = content;
   document.getElementById('status-message').style.color = color;
 }


 ws.onmessage = function (event) {
   const data = JSON.parse(event.data);

   if (data.status === "success") {

     updateStatusMessage(
       `<div style="font-size: 50px;">SCAN SUCCESS</div>`,
       "greenyellow"
     );
{/* <div style="font-size: 50px;"><i class="bi bi-check-circle"></i></div> */}

     setTimeout(() => {
       updateStatusMessage(
         `<div style="font-size: 50px;">WAIT FOR SCAN...</div>`,
         "yellow"
       );
     }, 2000);
   }
 };

//  <div style="font-size: 50px;"><i class="bi bi-hourglass"></i></div>