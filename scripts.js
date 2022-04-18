let projectArray = [{
    name: "Janus",
    color: "#e9b96e"
}, {
    name: "dfsdfnus",
    color: "#8ae234"
}];
let taskArray = [];
let finishedTasks = [];
const taskModal = document.querySelector("#task-modal");

function closeTaskModal() {
    taskModal.style.display = "none";
};

function openTaskModal() {
    taskModal.style.display = "block";
};
document.querySelector("#task-modal-close").addEventListener("click", () => {
    closeTaskModal();
});
document.querySelector(".add-task").addEventListener("click", () => {
    openTaskModal();
});
const projectModal = document.querySelector("#project-modal");

function closeProjectModal() {
    projectModal.style.display = "none";
};

function openProjectModal() {
    projectModal.style.display = "block";
};
document.querySelector("#project-modal-close").addEventListener("click", () => {
    closeProjectModal();
});
document.querySelector(".add-project").addEventListener("click", () => {
    openProjectModal();
});
window.addEventListener("click", () => {
    if (event.target == taskModal) {
        closeTaskModal();
    } else if (event.target == projectModal) {
        closeProjectModal();
    }
});

const taskFactory = (title, dueDate, project, done) => {
    return {
        title,
        dueDate,
        project,
        done
    };
};
const projectFactory = (name, color) => {
    return {
        name,
        color
    };
};

const projectContainer = document.querySelector(".project-container");
document.querySelector(".sidebar-top ul li:last-child").addEventListener("click", () => {
    document.querySelector(".sidebar-top ul li:last-child").classList.toggle("rotate-arrow");
    if (projectContainer.style.maxHeight) {
        projectContainer.style.maxHeight = null;

    } else {
        projectContainer.style.maxHeight = projectContainer.scrollHeight + "px";
    }
});

const modalToProject = () => {
    let name = document.querySelector("#name").value;
    let color = document.querySelector("#color").value;
    return projectFactory(name, color);
};

const projectToArray = () => {
    let newProject = modalToProject();
    document.querySelector("#project-form").reset();
    projectArray.push(newProject);
};

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

const modalToTask = () => {
    let title = document.querySelector("#task").value;
    let dueDate = document.querySelector("#dueDate").value;
    let projectName = document.querySelector("#project").value;
    let taskDone = false;
    return taskFactory(title, dueDate, projectName, taskDone);
};

const taskToArray = () => {
    let newTask = modalToTask();
    document.querySelector("#task-form").reset();
    taskArray.push(newTask);
}