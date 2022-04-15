const taskFactory = (title, description, date, project, color, checked) => {
    return {title, description, date, project, color, checked};
};
const projectFactory = (name, color) => {
    return{name, color};
};
const projectContainer = document.querySelector(".project-container");
document.querySelector(".sidebar-top ul li:last-child").addEventListener("click", () => {
    // document.querySelector(".project-container").classList.toggle("invisible");
    document.querySelector(".sidebar-top ul li:last-child").classList.toggle("rotate-arrow");
    if(projectContainer.style.maxHeight){
        projectContainer.style.maxHeight = null;

    } else {
        projectContainer.style.maxHeight = projectContainer.scrollHeight +"px";
    }
});