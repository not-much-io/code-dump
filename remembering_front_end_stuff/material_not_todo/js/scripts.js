/**
 * Created by marta on 5/14/15.
 */

window.onload = function() {
    document.onkeydown = function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13 && document.activeElement.className == "validate") {
            transitionAwayFromEdit(document.activeElement.parentNode.parentNode.parentNode);
        }
    };

    var list = document.getElementById("alan-list");

    var notToDos = ["Forget to take Mia for a walk", "Forget to Play with Mia", "Procrastinate", "Push that button"];

    for (var i = 0; i < 4; i++) {
        var newNotToDo = notToDoFactory();
        console.log(notToDos[i]);
        newNotToDo.getElementsByTagName("span")[0].innerHTML = notToDos[i];
        newNotToDo.getElementsByTagName("input")[0].value = notToDos[i];
        list.appendChild(newNotToDo);
    }
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

function notToDoFactory() {
    var id = guid();

    var li = document.createElement("li");
    li.className = "collection-item";
    var div = document. createElement("div");
    div.className = "content";
    var a = document.createElement("a");
    a.className = "secondary-content";
    var i = document.createElement("i");
    i.className ="mdi-action-delete";
    var span = document.createElement("span");
    //span.innerHTML = "Alvin";
    var hidDiv = document.createElement("div");
    hidDiv.className = "hiddendiv edit-content";
    var hidDivInner = document.createElement("div");
    hidDivInner.className = "input-field";
    var input = document.createElement("input");
    input.id = id;
    input.type = "text";
    input.className =  "validate";
    var label = document.createElement("label");
    label.htmlFor = id;
    label.innerHTML = "dooooon't";

    hidDivInner.appendChild(input);
    hidDivInner.appendChild(label);
    hidDiv.appendChild(hidDivInner);
    a.appendChild(i);
    div.appendChild(a);
    div.appendChild(span);
    li.appendChild(div);
    li.appendChild(hidDiv);

    var f = function() {
        transitionToEdit(li);
    };

    li.addEventListener("click", f);

    var f2 = function() {
        transitionAwayFromEdit(li);
    };

    input.addEventListener("blur", f2);

    var f3 = function() {
       onRemove(li);
    };

    a.addEventListener("click", f3);

    return li;

}

function onActionButtonClick() {
    var alanList = document.getElementById("alan-list");
    var newNotToDo = notToDoFactory();
    alanList.appendChild(newNotToDo);
    transitionToEdit(newNotToDo);
}

function transitionToEdit(li){
    var content = li.getElementsByClassName("content")[0];
    var editContent = li.getElementsByClassName("edit-content")[0];
    content.className = "content hiddendiv";
    editContent.className = "edit-content";
    editContent.getElementsByTagName("input")[0].focus();
}

function transitionAwayFromEdit (li){
    var content = li.getElementsByClassName("content")[0];
    var editContent = li.getElementsByClassName("edit-content")[0];
    content.className = "content";
    editContent.className = "edit-content hiddendiv";

    var value = editContent.getElementsByTagName("input")[0].value;

    if (value == "") {
        onRemove(li);
    } else {
        content.getElementsByTagName("span")[0].innerHTML = value;
    }
}

function onRemove (li){
    var alanList = document.getElementById("alan-list");
    alanList.removeChild(li);
}
