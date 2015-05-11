/**
 * Created by kristo on 5/10/15.
 */

window.onload = function () {
    document.onkeydown = function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13 && document.activeElement.className.indexOf("inp") > -1) {
            transitionAwayFromEdit(document.activeElement.parentNode.parentNode);
        }
    };
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function isHidden(node) {
    return node.className.indexOf("hiddendiv") > -1
}

function transitionToEdit(todoLi) {
    var inputField = todoLi.getElementsByClassName("input-field")[0];
    var content = todoLi.getElementsByClassName("content")[0];
    var removeButton = todoLi.getElementsByClassName("remove-button")[0];

    inputField.className = "input-field";
    content.className += " hiddendiv";
    removeButton.className += " hiddendiv";

    inputField.getElementsByClassName("inp")[0].focus();
}

function transitionAwayFromEdit(todoLi) {
    var inputField = todoLi.getElementsByClassName("input-field")[0];
    var content = todoLi.getElementsByClassName("content")[0];
    var removeButton = todoLi.getElementsByClassName("remove-button")[0];

    inputField.className += " hiddendiv";
    content.className = "content";
    removeButton.className = "secondary-content remove-button";

    content.innerHTML = inputField.getElementsByClassName("inp")[0].value;

    if (content.innerHTML == "") {
        removeToDo(todoLi);
    }
}

function todoFactory() {
    var li = document.createElement("li");
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    var span = document.createElement("span");
    var a = document.createElement("a");
    var i = document.createElement("i");
    var id = guid();

    i.className = "mdi-action-delete";

    a.className = "secondary-content remove-button";
    a.addEventListener("click", function() {
        removeToDo(li);
    });
    a.appendChild(i);

    span.className = "content";
    span.innerHTML = "New Todo";

    label.className = "active";
    label.htmlFor = id;
    label.innerHTML = "Edit Todo..";

    input.id = id;
    input.type = "text";
    input.className = "inp";
    input.addEventListener("blur", function() {
        transitionAwayFromEdit(li);
    });

    div.className = "input-field";
    div.appendChild(input);
    div.appendChild(label);

    li.className = "collection-item dismissable";
    li.addEventListener("click", function() {
        onToDoClick(li);
    });

    li.appendChild(div);
    li.appendChild(a);
    li.appendChild(span);

    return li;
}

function addToDo() {
    var todoList = document.getElementById("todo-list");
    var newToDo = todoFactory();
    todoList.appendChild(newToDo);
    return newToDo;
}

function onActionButtonClick() {
    var ref = addToDo();
    transitionToEdit(ref);
}

function onToDoClick(li) {
    if (isHidden(li.getElementsByTagName("div")[0])) {
        transitionToEdit(li);
    }
}

function removeToDo(li) {
    document.getElementById("todo-list").removeChild(li);
}