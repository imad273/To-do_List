var addBtn = document.querySelector("#addBtn");
var input = document.querySelector("#input");
var list = document.querySelector("#list");


var tasksArray = [];

// Check if theres tasks in localStorage
if (localStorage.getItem("tasks")) {
   let data = JSON.parse(localStorage.getItem("tasks"));
   tasksArray = data;
   addItemsToList(data);
}

addBtn.addEventListener("click", () => {
   if(input.value !== "") {
      addItemsToArray(input.value);
   }
});

// Add items to the tasksArray
function addItemsToArray(value){
   var task = {
      id: Date.now(),
      content: value
   }
   // Add task to array
   tasksArray.push(task);
   // Add Task to the list
   addItemsToList(tasksArray);
   // Add Task To LocalStorage
   addItemsToLocalStorage(tasksArray);
}

function addItemsToList(array) {
   list.innerHTML = "";
   array.forEach(tesk => {
      var item = document.createElement("li");
      item.setAttribute("data-id", tesk.id);
      var remBtn = document.createElement("button");
      remBtn.innerHTML = "<i class='bx bxs-trash'></i>Delete";
      remBtn.className = "btn";
      var text = document.createTextNode(tesk.content);
      item.appendChild(text);
      item.appendChild(remBtn);
      list.appendChild(item);
      input.value = "";
   });
}

if(tasksArray.length == 0) {
   list.innerHTML = "<span class='no-sh'>No Tasks</span>";
}

// Add items to local storage
function addItemsToLocalStorage(array) {
   localStorage.setItem("tasks", JSON.stringify(array));
}

// Delete From list
document.addEventListener("click", (e) => {
   if(e.target.className == "btn"){
      e.target.parentNode.remove();
      deleteFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
   }
})

//Delete From LocalStorage
function deleteFromLocalStorage(taskid) {
   // Delete the item from the tasksArray With filter the array
   tasksArray = tasksArray.filter(task => task.id != taskid);
   // Add existing items after deleting the intended item
   addItemsToLocalStorage(tasksArray);
   if(tasksArray.length == 0) {
      list.innerHTML = "<span class='no-sh'>No Tasks</span>";
   }
}