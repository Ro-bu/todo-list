import {modalListeners} from "./modal-controls.js";
import {addAllProjectsToUi, uiListeners, addAllTasksToUi} from "./ui.js";


modalListeners();
addAllTasksToUi();
addAllProjectsToUi();
uiListeners();