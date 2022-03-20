const openpopupButtons = document.querySelectorAll('[data-popup-target]')
const closepopupButtons = document.querySelectorAll('[close-popup]')
const poverlay = document.getElementById('popup-overlay')
const pendingTasksNumb = document.querySelector(".pendingTasks");
var crossing;
var remcount=0;
var x=0;


pendingTasksNumb.textContent = remcount;

// Used to get present date and set it as min. date required for deadline
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("dt").setAttribute("min", today);

// For Pop-up when clicked on '+'
openpopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = document.querySelector(button.dataset.popupTarget)
    openpopup(popup)
  })
})

poverlay.addEventListener('click', () => {
  const popup = document.querySelectorAll('.popup.active')
  popup.forEach(popup => {
    closepopup(popup)
  })
})



closepopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup')
    closepopup(popup)
  })
})

function openpopup(popup) {
  if (popup == null) return
  popup.classList.add('active')
  poverlay.classList.add('active')
}

function closepopup(popup) {
  if (popup == null) return
  popup.classList.remove('active')
  poverlay.classList.remove('active')
}

// Adding new To-Do

document.querySelector('#AddToDo').onclick = function(){
    if(document.querySelector('#tt').value.length == 0){
        alert("Title cannot be empty")
    }
    else{
      //Set description as none & date to today if not given.
      var taskdescdat = document.querySelector('.popup .popup-body .td').value;
      if (taskdescdat.length==0){taskdescdat= "None";}
      var taskdatedat = document.querySelector('.popup .popup-body .dt').value;
      if (taskdatedat.length==0){taskdatedat= today;}

      remcount=remcount+1;
        document.querySelector('#ToDoList').innerHTML +=
        `
            <div class="ToDos" id="ToDos">
            <span id="title" class="title">
                ${document.querySelector('.popup .popup-body .tt').value}
            </span>
            <details class="details">
            <summary class="detailsdec">...</summary>
            <ul>
            <span id="de" class="de"> <span>Description:</span>
                ${taskdescdat}
            </span> <br> <br>
            <span id="dat" class="dat"> <span> Deadline: </span>
                ${taskdatedat}
            </span>
            </ul>
            </details>
            <button class="DelToDo">&times</button>
            </div>
            
        `;

        //To Delete a task

        var ClearToDo = document.querySelectorAll(".DelToDo")

        for(var i=0;i<ClearToDo.length;i++){
            ClearToDo[i].onclick = function (){
                this.parentNode.remove();
                remcount=remcount-1;
                pendingTasksNumb.textContent = remcount;
            }
            
        }

        //Cross out a task if clicked on its title as completed

        crossing = document.querySelectorAll(".ToDos .title");
        for(var i=0;i<crossing.length;i++){
          crossing[i].onclick = function(){
            this.classList.toggle('completed');
            if(x==0){
            remcount=remcount-1;
                pendingTasksNumb.textContent = remcount;
                x=1;
              }
            else{
                remcount=remcount+1;
                pendingTasksNumb.textContent = remcount;
                x=0;
              }
          }
        }
        //Return No. of remaining tasks.
        const pendingTasksNumb = document.querySelector(".pendingTasks");
        pendingTasksNumb.textContent = remcount; 

        //After saving the data from popup clear its data and close popup
        document.querySelector('#tt').value = "";
        document.querySelector('#td').value = "";
        document.querySelector('#dt').value = "";

        closepopup(popup)
        }
} 

// Clear all tasks
function clearContent(){
        let confirmation = confirm("All your To-Do data will be erased");
        if (confirmation) {
          document.getElementById('ToDoList').innerHTML = ' ';
          remcount=0;
          const pendingTasksNumb = document.querySelector(".pendingTasks");
          pendingTasksNumb.textContent = remcount;
        }  
      }
