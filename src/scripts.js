import {modalListeners} from "./modal-controls.js";
import {addTodaysTasks, addWeeksTasks, addAllProjectsToUi, uiListeners} from "./ui.js";


modalListeners();
addTodaysTasks();
addWeeksTasks();
addAllProjectsToUi();
uiListeners();