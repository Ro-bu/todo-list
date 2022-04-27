class Storage {
    static saveData(data) {
        localStorage.setItem("projectList", JSON.stringify(data))
    };
    static getData() {
        const projectList = JSON.parse(localStorage.getItem("projectList"));
        return projectList;
    }
};

export {Storage};