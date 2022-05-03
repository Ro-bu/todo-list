import {Task, Project} from "./factories.js";
import {validateProjectForm, validateTaskForm, clearErrorMessages} from "./form-validators.js";
import {Storage} from "./storage.js";
import {refreshProjects, projectListeners, refreshCurrentTasks} from "./ui.js";
import {reconstructedProjectList} from "./object-methods.js";

const closeProjectModal = () => {
    document.querySelector("#project-modal").style.display = "none";
};
const openProjectModal = () => {
    document.querySelector("#project-form").reset();
    clearErrorMessages();
    document.querySelector("#project-modal").style.display = "block";
};
const closeTaskModal = () => {
    document.querySelector("#task-modal").style.display = "none";
    delete document.querySelector("#task-modal .modal-top span:first-child").dataset.taskIndex;
    delete document.querySelector("#task-modal .modal-top span:first-child").dataset.projectIndex;
    document.querySelector("#task-modal .modal-top span:first-child").textContent = "ADD TASK";
    document.querySelector("#task-form-submit").textContent = "Add Task";
};
const openTaskModal = () => {
    document.querySelector("#task-form").reset();
    clearErrorMessages();
    clearFormOptions();
    projectsToFormOptions();
    document.querySelector("#task-modal").style.display = "block";
};
const modalToProject = () => {
    let name = document.querySelector("#name").value;
    let color = document.querySelector("#color").value;
    return new Project(name, color);
};
const projectToArray = () => {
    let newProject = modalToProject();
    if (Storage.getData() === null) {
        let projectArray = [];
        projectArray.push(newProject);
        Storage.saveData(projectArray);
    } else {
        let projectArray = Storage.getData();
        projectArray.push(newProject);
        Storage.saveData(projectArray);
    }
};
const modalToTask = () => {
    let title = document.querySelector("#task").value;
    let dueDate = document.querySelector("#dueDate").value;
    return new Task(title, dueDate);
};
const taskToArray = () => {
    let newTask = modalToTask();
    let projectName = document.querySelector("#project").value;
    let projectArray = Storage.getData();
    projectArray.forEach((project) => {
        if (project.name === projectName) {
            project.tasks.push(newTask);
        };
    });
    Storage.saveData(projectArray);
};
const clearFormOptions = () => {
    let parent = document.querySelector("#project");
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    };
};
const projectsToFormOptions = () => {
    let selectParent = document.querySelector("#project");
    if (Storage.getData() !== null) {
        let projectArray = Storage.getData();
        for (const project of projectArray) {
            let newOption = document.createElement("option");
            newOption.value = project.name;
            newOption.text = project.name;
            selectParent.appendChild(newOption);
        };
    };
};

const projectEditModal = () => {
    
};

const taskEditButtonListeners = () => {
    document.querySelectorAll(".task-edit-button").forEach((button) => {
        button.addEventListener("click", () => {
            openTaskModal();
            let modalHeader = document.querySelector("#task-modal .modal-top span:first-child");
            modalHeader.textContent = "EDIT TASK";
            document.querySelector("#task-form-submit").textContent = "Edit Task";
            let projectArray = Storage.getData();
            let projectIndex = parseInt(button.parentElement.parentElement.parentElement.dataset.projectIndex);
            let taskIndex = parseInt(button.parentElement.parentElement.parentElement.dataset.taskIndex);
            modalHeader.dataset.projectIndex = projectIndex;
            modalHeader.dataset.taskIndex = taskIndex;
            let title = document.querySelector("#task");
            let dueDate = document.querySelector("#dueDate");
            let projectSelect = document.querySelector("#project");
            let currentTask = projectArray[projectIndex].tasks[taskIndex];
            title.value = currentTask.name;
            projectSelect.value = projectArray[projectIndex].name;
            if (currentTask.date !== "") {
                dueDate.value = currentTask.date;
            }
        });
    });
};

const taskEditSubmit = () => {
    let reconstructedProjectArray = reconstructedProjectList();
    let title = document.querySelector("#task");
    let dueDate = document.querySelector("#dueDate");
    let projectSelect = document.querySelector("#project");
    let projectIndex = parseInt(document.querySelector("#task-modal .modal-top span:first-child").dataset.projectIndex);
    let taskIndex = parseInt(document.querySelector("#task-modal .modal-top span:first-child").dataset.taskIndex);
    if(projectSelect.value === reconstructedProjectArray[projectIndex].name){
        reconstructedProjectArray[projectIndex].tasks[taskIndex].newName(title.value);
        reconstructedProjectArray[projectIndex].tasks[taskIndex].newDate(dueDate.value);
        Storage.saveData(reconstructedProjectArray);
    } else {
        reconstructedProjectArray[projectIndex].tasks.splice(taskIndex, 1);
        Storage.saveData(reconstructedProjectArray);
        taskToArray();
    };
};

const modalListeners = () => {
    document.querySelector("#task-modal-close").addEventListener("click", () => {
        closeTaskModal();
    });
    document.querySelector(".add-task").addEventListener("click", () => {
        openTaskModal();
    });
    document.querySelector("#project-modal-close").addEventListener("click", () => {
        closeProjectModal();
    });
    document.querySelector(".add-project").addEventListener("click", () => {
        openProjectModal();
    });
    window.addEventListener("click", () => {
        if (event.target == document.querySelector("#task-modal")) {
            closeTaskModal();
        } else if (event.target == document.querySelector("#project-modal")) {
            closeProjectModal();
        }
    });
    document.querySelector("#project-form-submit").addEventListener("click", (e) => {
        e.preventDefault();
        if (validateProjectForm()) {
            projectToArray();
            refreshProjects();
            projectListeners();
            closeProjectModal();
        };
    });
    document.querySelector("#task-form-submit").addEventListener("click", (e) => {
        e.preventDefault();
        if (validateTaskForm()) {
            if (document.querySelector("#task-modal .modal-top span:first-child").textContent === "EDIT TASK") {
                taskEditSubmit();
                closeTaskModal();
                refreshCurrentTasks();
            } else {
                taskToArray();
                closeTaskModal();
                refreshCurrentTasks();
            }
        };
    });
    document.querySelector("#task-form-cancel").addEventListener("click", (e) => {
        e.preventDefault();
        closeTaskModal();
    });
    document.querySelector("#project-form-cancel").addEventListener("click", (e) => {
        e.preventDefault();
        closeProjectModal();
    });
};

export {modalListeners, taskEditButtonListeners};