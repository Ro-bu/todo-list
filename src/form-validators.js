const validateProjectForm = () => {
    const projectName = document.querySelector("#name").value;
    let projectError = document.querySelector("#project-name-error");
    let noProjectNameErrors = true;
    if (projectName === "") {
        projectError.textContent = "Please enter a name for the project."
        noProjectNameErrors = false;
    } else {
        projectError.textContent = "";
        noProjectNameErrors = true;
    };
    if (noProjectNameErrors) {
        return true;
    } else {
        return false;
    };
};

const validateTaskForm = () => {
    const taskName = document.querySelector("#task").value;
    const projectName = document.querySelector("#project").value;
    let taskError = document.querySelector("#task-error");
    let projectError = document.querySelector("#project-error");
    let noProjectErrors = true;
    let noTaskErrors = true;
    if (taskName === "") {
        taskError.textContent = "Please enter a task name.";
        noTaskErrors = false;
    } else {
        taskError.textContent = "";
        noTaskErrors = true;
    };
    if (projectName === "" && document.querySelector("#project").firstChild === null) {
        projectError.textContent = "Please create a project before adding a task.";
        noProjectErrors = false;
    } else {
        projectError.textContent = "";
        noProjectErrors = true;
    };
    if (noProjectErrors && noTaskErrors) {
        return true;
    } else {
        return false;
    };
};

const clearErrorMessages = () => {
    document.querySelector("#task-error").textContent = "";
    document.querySelector("#project-error").textContent = "";
    document.querySelector("#project-name-error").textContent = "";
};

export {
    validateProjectForm,
    validateTaskForm,
    clearErrorMessages
};