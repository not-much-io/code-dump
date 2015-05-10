/**
 * Created by kristo on 5/9/15.
 */

window.onload = function () {
};

function todoFactory(text) {

    var createContent = function(text) {
        var content = document.createElement("span");
        content.innerHTML = text;
        content.className = "align-left";
        return content;
    };

    var createRemoveButton = function() {
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "-";
        removeButton.addEventListener("click", function() {
            removeToDo(this.parentNode);
        });
        removeButton.className = "align-right";
        return removeButton;
    };

    var createLi = function(content, removeButton) {
        var li = document.createElement("li");
        li.appendChild(content);
        li.appendChild(removeButton);
        return li;
    };

    return createLi(createContent(text), createRemoveButton())
}

function colorTodos() {
    var todos = document.getElementById("list-of-todos").getElementsByTagName("li");
    for (var i = 0; i < todos.length; i++) {
        if (i % 2 == 0) {
            todos[i].className = "even-todo";
        } else {
            todos[i].className = "odd-todo";
        }
    }
}

function addToDo() {
    var inputField = document.getElementById("todo-input");
    var newTodoText = inputField.value;
    var todoList = document.getElementById("list-of-todos");
    var newTodo = todoFactory(newTodoText);
    todoList.appendChild(newTodo);
    inputField.value = "";
    colorTodos();
}

function removeToDo(todoListItem) {
    todoListItem.parentNode.removeChild(todoListItem);
    colorTodos();
}
