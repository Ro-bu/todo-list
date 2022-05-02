import {modalListeners} from "./modal-controls.js";
import {addTodaysTasks, addWeeksTasks, addAllProjectsToUi, uiListeners, addAllTasksToUi} from "./ui.js";


modalListeners();
addAllTasksToUi();
addAllProjectsToUi();
uiListeners();