
class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.tasks = [];
    };
    newName(name) {
        this.name = name;
    };
    newColor(color) {
        this.color = color;
    }
    addTask(task) {
        this.tasks.push(task);
    }
};

class Task {
    constructor(name, date = "No due date") {
        this.name = name;
        this.date = date;
        this.done = false;
    };
    newName(name) {
        this.name = name;
    };
    newDate(date) {
        this.date = date;
    };
    toggleDone() {
        if(this.done) {
            this.done = false;
        } else {
            this.done = true;
        }
    };
};

export {Project, Task};