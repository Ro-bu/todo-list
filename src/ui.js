import {Storage} from "./storage.js";
import {add, compareAsc, parseISO} from "date-fns";

const addProjectToUi = (obj) => {
    let parentLi = document.createElement("li");
    parentLi.dataset.project = obj.name;
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

const addAllProjectsToUi = () => {
    if (Storage.getData() !== null) {
        let projectArray = Storage.getData();
        projectArray.forEach((project) => {
            addProjectToUi(project);
        });
    };
};

const addTasktoUi = (obj, color, projectIndex, taskIndex) => {
    let parentLi = document.createElement("li");
    parentLi.dataset.projectIndex = projectIndex;
    parentLi.dataset.taskIndex = taskIndex;
    let colorBlock = document.createElement("div");
    colorBlock.classList.add("color-block");
    colorBlock.style.backgroundColor = color;
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    let taskAndCheckboxDiv = document.createElement("div");
    taskAndCheckboxDiv.classList.add("task-and-checkbox");
    let checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox");
    if (obj.done === true) {
        checkboxDiv.classList.add("checked");
    };
    let taskNameDiv = document.createElement("div");
    taskNameDiv.classList.add("task-name");
    taskNameDiv.textContent = obj.name;
    let dateAndEditDiv = document.createElement("div");
    dateAndEditDiv.classList.add("date-and-edit");
    let dateDiv = document.createElement("date");
    dateDiv.classList.add("date");
    if (obj.date === "") {
        dateDiv.textContent = "No due date";
    } else {
        dateDiv.textContent = obj.date;
    };
    let editButton = document.createElement("span");
    let editImg = document.createElement("img");
    editImg.src = "./img/credit-card-edit.png";
    let trashButton = document.createElement("span");
    let trashImg = document.createElement("img");
    trashImg.src = "./img/delete.png";
    parentLi.appendChild(colorBlock);
    parentLi.appendChild(taskContainer);
    taskContainer.appendChild(taskAndCheckboxDiv);
    taskAndCheckboxDiv.appendChild(checkboxDiv);
    taskAndCheckboxDiv.appendChild(taskNameDiv);
    taskContainer.appendChild(dateAndEditDiv);
    dateAndEditDiv.appendChild(dateDiv);
    editButton.appendChild(editImg);
    trashButton.appendChild(trashImg);
    dateAndEditDiv.appendChild(editButton);
    dateAndEditDiv.appendChild(trashButton);
    document.querySelector(".bot-content-block ul").appendChild(parentLi);
};

const addAllTasksToUi = () => {
    if (Storage.getData() !== null) {
        let projectArray = Storage.getData();
        let projectIndex = 0;
        projectArray.forEach((project) => {
            let taskColor = project.color;
            let taskIndex = 0;
            project.tasks.forEach((task) => {
                addTasktoUi(task, taskColor, projectIndex, taskIndex);
                taskIndex++;
            });
            projectIndex++;
        });
    };
};

const addTasksFromProject = (projectName) => {
    if (Storage.getData() !== null) {
        let projectArray = Storage.getData();
        let projectIndex = 0;
        projectArray.forEach((project) => {
            let taskIndex = 0;
            if(project.name === projectName) {
                let taskColor = project.color;
                project.tasks.forEach((task) => {
                    addTasktoUi(task, taskColor, projectIndex, taskIndex);
                    taskIndex++;
                }); 
            };
            projectIndex++;
        });
    };
};

const addTodaysTasks = () => {
    let today = parseISO(new Date().toISOString().split("T")[0]);
    let projectArray = Storage.getData();
    let projectIndex = 0;
    projectArray.forEach((project) => {
        let taskColor = project.color;
        let taskIndex = 0;
        project.tasks.forEach((task) => {
            if (compareAsc(parseISO(task.date), today) === 0) {
                addTasktoUi(task, taskColor, projectIndex, taskIndex);
            };
            taskIndex++;
        });
        projectIndex++;
    });
};

const addWeeksTasks = () => {
    let today = parseISO(new Date().toISOString().split("T")[0]);
    let weekFromNow = add(today, {
        days: 7
    });
    let projectArray = Storage.getData();
    let projectIndex = 0;
    projectArray.forEach((project) => {
        let taskColor = project.color;
        let  taskIndex = 0;
        project.tasks.forEach((task) => {
            if (compareAsc(parseISO(task.date), weekFromNow) === -1 && compareAsc(parseISO(task.date), today) !== -1) {
                addTasktoUi(task, taskColor, projectIndex, taskIndex);
            };
            taskIndex++;
        });
        projectIndex++;
    });
};

const clearTasks = () => {
    let tasksParent = document.querySelector(".bot-content-block ul");
    while (tasksParent.firstChild) {
        tasksParent.removeChild(tasksParent.lastChild);
    };
};

const clearProjects = () => {
    let projectsParent = document.querySelector(".project-container ul");
    while (projectsParent.firstChild) {
        projectsParent.removeChild(projectsParent.lastChild);
    };
};

const refreshProjects = () => {
    clearProjects();
    addAllProjectsToUi();
};

const projectListeners = () => {
    let taskListName = document.querySelector(".list-name");
    document.querySelectorAll(".project-container ul li").forEach((projectCont) => {
        projectCont.addEventListener("click", (e) =>{
            clearTasks();
            taskListName.textContent = String(e.target.closest("li").dataset.project);
            addTasksFromProject(e.target.closest("li").dataset.project);

        });
    });
};

const allTodayWeekListeners = () => {
    let taskListName = document.querySelector(".list-name");
    document.querySelector("#all-tasks").addEventListener("click", () => {
        clearTasks();
        taskListName.textContent = "ALL"
        addAllTasksToUi();
    });
    document.querySelector("#today-tasks").addEventListener("click", () => {
        clearTasks();
        taskListName.textContent = "TODAY";
        addTodaysTasks();
    });
    document.querySelector("#week-tasks").addEventListener("click", () => {
        clearTasks();
        taskListName.textContent = "WEEK";
        addWeeksTasks();
    });
};

const toggleDoneListeners = () => {
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            if(checkbox.classList.contains("checked")) {
                checkbox.removeChild(checkbox.lastChild);
            } else {
                let checkboxImg = document.createElement("img");
                checkboxImg.src = "./img/check.png";
                checkbox.appendChild(checkboxImg);
            };
            checkbox.classList.toggle("checked");
        });
    });
};

const uiListeners = () => {
    projectListeners();
    allTodayWeekListeners();
    toggleDoneListeners();
};

export {addTodaysTasks, addWeeksTasks, addAllProjectsToUi, uiListeners, refreshProjects, projectListeners};