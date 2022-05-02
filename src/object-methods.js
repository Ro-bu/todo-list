import {Storage} from "./storage.js";
import {Task, Project} from "./factories.js";

const reconstructedProjectList = () => {
    let reconstructed = [];
    let fromStorage = Storage.getData();
    fromStorage.forEach((project) => {
        let newProject = new Project(project.name, project.color);
        let taskList = project.tasks;
        taskList.forEach((task) => {
            newProject.addTask(new Task(task.name, task.date, task.done));
        });
        reconstructed.push(newProject);
    });
    return reconstructed;
};

export {reconstructedProjectList};