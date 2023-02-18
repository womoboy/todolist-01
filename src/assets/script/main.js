let currId = '';
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
var taskListEle = document.getElementById('task-list');
let massageBox = {
  emptyList: "This list is empty",
}

//when page loaded, create list of tasks
window.onload = () => {
  if (tasks.length < 1) {
    taskListEle.innerHTML = `<p class="empty-massage">${massageBox.emptyList}</p>`;
  } else {
    createTasks(tasks);
  }
};

function sortArr(arr, opt) {
  const myOpt = String(opt);
  if (myOpt === "A-Z") {
    arr.sort(function(a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  } else if (myOpt === "Z-A") {
    arr.sort(function(a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    })
  } else if (myOpt === "newest") {
    arr.sort(function(a, b) {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    })
  } else if (myOpt === "lastest") {
    arr.sort(function(a, b) {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    })
  } else if (myOpt === "finished") {
    arr.sort(function(a, b) {
      if (a.done > b.done) {
        return -1;
      } else if (a.done < b.done) {
        return 1;
      } else {
        return 0;
      }
    })
  } else if (myOpt === "not-finished") {
    arr.sort(function(a, b) {
      if (a.done > b.done) {
        return 1;
      } else if (a.done < b.done) {
        return -1;
      } else {
        return 0;
      }
    })
  }
}

function getSort(e) {
  const getValue = e.target.value;
  sortArr(tasks, getValue);
  createTasks(tasks);
}

//this function make task elements from data
function createTasks(arr) {
  clearElement(taskListEle);
  Array.prototype.map.call(arr, (item) => {
    const itemId = `${item.id}`;
    const task =
      `<li class="task ${item.done === true ? "disable" : ""}">
          <div class="content">
            <div class="info">
              <span>-</span>
              <span class="task-title">${item.title}</span>
            </div>
            <div class="extra-info">
              <span>created: </span>
              <span class="task-date">${item.date}</span>
              <span class="task-time">${item.time}</span>
            </div>
          </div>
          <div class="btn-frame">
              <button class="green" onclick="handleDone('${item.id}')">Done</button>
              <button class="gray" onclick="handleUpdate('${item.id}')">Edit</button>
              <button class="red" onclick="handleDelete('${item.id}')">Delete</button>
          </div>
        </li>`;

    taskListEle.innerHTML += task;
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
const getId = function() {
  return "xxxx-xxxx-4xxx-yxxx-xxxx".replace(/[xy]/g, function(c) {
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
function submitTask(e) {
  e.preventDefault();

  let id = getId(),
    time = getTime(),
    date = getDate(),
    newObj = {};
  const title = document.getElementById("title");

  newObj = createObj(id, title.value, date, time);
  tasks.push(newObj);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  createTasks(tasks);
  title.value = "";
}

//when task done
async function handleDone(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      if (tasks[i].done) {
        tasks[i].done = false
      } else {
        tasks[i].done = true
      }
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  createTasks(tasks)
}

// update task
function handleUpdate(id) {
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
  localStorage.setItem('tasks', JSON.stringify(tasks))
  createTasks(tasks);
}

// overwrite
function overwrite(eve) {
  eve.preventDefault();
  let updateInput = document.getElementsByClassName('update-input')[0];

  tasks.map((item) => {
    if (item.id === currId) {
      item.title = updateInput.value;
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
  createTasks(tasks);
  eve.target.parentElement.parentElement.style.display = 'none'; // i use again the dom navigate :)
}
