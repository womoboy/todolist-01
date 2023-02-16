let currId = '';
var tasks = [],
  taskListELe = document.getElementById("task-list"),
  massageBox = {
    emptyList: "This list is empty!",
  };

//when page loaded, create list of tasks
window.onload = () => {
  if (tasks.length < 1) {
    taskListELe.innerHTML = `<p class="empty-massage">${massageBox.emptyList}</p>`;
  } else {
    createTasks(tasks);
  }
};

//this function make task elements from data
function createTasks(arr) {
  clearElement(taskListELe);
  Array.prototype.map.call(arr, (item) => {
    const itemId = `${item.id}`;
    const task = 
      `<li class="task ${item.done === true ? "disable" : ""}">
          <div class="title">
             <span>-</span>
              <span>
                  <span class="todo-title">${item.title}</span>
              </span>
          </div>
          <div class="btn-frame">
              <button class="green" onclick="handleDone('${item.id}')">Done</button>
              <button class="gray" onclick="handleUpdate('${item.id}')">Edit</button>
              <button class="red" onclick="handleDelete('${item.id}')">Delete</button>
          </div>
        </li>`;

    taskListELe.innerHTML += task;
  });
}

//clear list of elements
function clearElement(ele) {
  ele.innerHTML = "";
}

//get date
function getDate() {
  const dt = new Date();
  return dt.getFullYear() + "." + dt.getMonth() + "." + dt.getDate();
}

//get time
function getTime() {
  const dt = new Date();
  return dt.getHours() + ":" + dt.getMinutes();
}

//create id
const getId = function () {
  return "xxxx-xxxx-4xxx-yxxx-xxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    return r.toString(16);
  });
};

//create new object for array
function createObj(id, title, date, time, done) {
  const obj = {
    id: id,
    title: title,
    date: date,
    time: time,
    done: done ? true : false,
  };

  return obj;
}

//when form submited
function submitHandle(e) {
  e.preventDefault();
    
  let id = getId(),
    time = getTime(),
    date = getDate(),
    newObj = {};
  const title = document.getElementById("title");

  newObj = createObj(id, title.value, date, time);
  tasks.push(newObj);
  createTasks(tasks);
  title.value = "";
}

//when task done
async function handleDone(id) {
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === id) {
            if(tasks[i].done) {
                tasks[i].done = false
            } else {
                tasks[i].done = true
            }
        }
    }
    createTasks(tasks)
}

// update task
function handleUpdate(id){
  currId = id;
  let currTask = tasks.find(item => item.id === currId);
  let modalSection = document.getElementsByClassName('modal-section');
  modalSection[0].style.display = 'flex';
  modalSection[0].firstElementChild.firstElementChild.firstElementChild.value = currTask.title; //i want to try dom navigate :)
}

// delete task
function handleDelete(id) {
  const newTasks = tasks.filter((item) => {
    return item.id !== id;
  });

  tasks = newTasks;
  createTasks(tasks);
}

// overwrite
function overwrite(eve) {
  eve.preventDefault();
  let updateInput = document.getElementsByClassName('update-input')[0];

  tasks.map((item) => {
    if(item.id === currId){
      item.title = updateInput.value;
    }
  })

  createTasks(tasks);
  eve.target.parentElement.parentElement.style.display = 'none'; // dom navigate again :)
}
