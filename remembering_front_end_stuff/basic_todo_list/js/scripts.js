/**
 * Created by kristo on 5/9/15.
 */

window.onload = function () {
};

function todoFactory(text) {
    var li = document.createElement("li");
    var id = "todo" + (document.getElementById("list-of-todos").getElementsByTagName("li").length + 1).toString();
    console.log(id);
    li.innerHTML = text + "<button onclick='removeToDo(this.parentNode)'>-</button>";
    li.id = id;
    return li;
}

function addToDo() {
    var inputField = document.getElementById("todo-input");
    var newTodoText = inputField.value;
    var todoList = document.getElementById("list-of-todos");
    var newTodo = todoFactory(newTodoText);
    todoList.appendChild(newTodo);
    inputField.value = "";
}

function removeToDo(todoListItem) {
    todoListItem.parentNode.removeChild(todoListItem);
}
