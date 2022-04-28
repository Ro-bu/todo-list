import {Task, Project} from "./factories.js"
import {validateProjectForm, validateTaskForm, clearErrorMessages} from "./form-validators.js"
import {Storage} from "./storage.js"

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
    if (Storage.getData() === null){
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
        if(project.name === projectName){
            project.tasks.push(newTask);
        };
    });
    Storage.saveData(projectArray);
};
const clearFormOptions = () => {
    let parent = document.querySelector("#project");
    while(parent.firstChild){
        parent.removeChild(parent.lastChild);
    };
};
const projectsToFormOptions = () => {
    let selectParent = document.querySelector("#project");
    if (Storage.getData() !== null){
        let projectArray = Storage.getData();
            for (const project of projectArray) {
                let newOption = document.createElement("option");
                newOption.value = project.name;
                newOption.text = project.name;
                selectParent.appendChild(newOption);
        };
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
            closeProjectModal();
        };
    });
    document.querySelector("#task-form-submit").addEventListener("click", (e) => {
        e.preventDefault();
        if (validateTaskForm()) {
            taskToArray();
            closeTaskModal();
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

export {modalListeners};