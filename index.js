const textarea = document.querySelector('textarea');
const addBtn = document.getElementById('addBtn');
const todoContainer = document.querySelector('.todoContainer');

// Creates our todo list as an array
let todoList = [];

function initialLoad() {
    if (!localStorage.getItem('todos')) {return}
    todoList = JSON.parse(localStorage.getItem('todos')).todoList
    updateUI()
}

initialLoad()

function addTodo() {
    const todo = textarea.value;
    if (!todo) { return };

    console.log('Add todo: ', textarea.value);
    todoList.push(todo);
    textarea.value = ''; // Resets everything to empty
    updateUI();
}

function updateUI() {
    newInnerHTML = '';

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
        <p>${todoElement}</p>
        <div class="btnContainer">
          <button class="iconBtn" onclick="editTodo(${todoIndex})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="iconBtn" onclick="deleteTodo(${todoIndex})">
            <i class="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    `;
    })

    todoContainer.innerHTML = newInnerHTML

    // to save to local storage
    localStorage.setItem('todos', JSON.stringify({ todoList }))
}

function editTodo(index)  {
    textarea.value = todoList[index]
    todoList = todoList.filter((element, elementIndex) => {
        if (index == elementIndex) {return false}
        return true
    });
}

function deleteTodo(index) {
    todoList = todoList.filter((element, elementIndex) => {
        if (index == elementIndex) { return false }
        return true
    })
    updateUI()
}

addBtn.addEventListener('click', addTodo);

