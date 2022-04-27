const addProjectToUi = (obj) => {
    let parentLi = document.createElement("li");
    let nameContainer = document.createElement("span");
    let taskCounter = document.createElement("span");
    let colorCircle = document.createElement("div");
    taskCounter.textContent = "(0)";
    nameContainer.textContent = obj.name;
    colorCircle.style.backgroundColor = obj.color;
    parentLi.appendChild(colorCircle);
    parentLi.appendChild(nameContainer);
    parentLi.appendChild(taskCounter);
    document.querySelector(".project-container ul").appendChild(parentLi);
};

const addTasktoUi = (obj) => {
    let parentLi = document.createElement("li");
    let taskAndCheckboxDiv = document.createElement("div");
    taskAndCheckboxDiv.classList.add("task-and-checkbox");
    let checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox");
    if (obj.done === true) {
        checkboxDiv.classList.add("checked");
    };
    let taskNameDiv = document.createElement("div");
    taskNameDiv.classList.add("task-name");
    taskNameDiv.textContent = obj.title;
    let dateAndEditDiv = document.createElement("div");
    dateAndEditDiv.classList.add("date-and-edit");
    let dateDiv = document.createElement("date");
    dateDiv.classList.add("date");
    dateDiv.textContent = obj.dueDate;
    let editButton = document.createElement("span");
    let editImg = document.createElement("img");
    editImg.src = "../img/credit-card-edit.png";
    let trashButton = document.createElement("span");
    let trashImg = document.createElement("img");
    trashImg.src = "../img/delete.png";
    parentLi.appendChild(taskAndCheckboxDiv);
    taskAndCheckboxDiv.appendChild(checkboxDiv);
    taskAndCheckboxDiv.appendChild(taskNameDiv);
    parentLi.appendChild(dateAndEditDiv);
    dateAndEditDiv.appendChild(dateDiv);
    editButton.appendChild(editImg);
    trashButton.appendChild(trashImg);
    dateAndEditDiv.appendChild(editButton);
    dateAndEditDiv.appendChild(trashButton);
    document.querySelector(".bot-content-block ul").appendChild(parentLi);
};