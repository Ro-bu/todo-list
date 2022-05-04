import {modalListeners} from "./modal-controls.js";
import {addAllProjectsToUi, uiListeners, addAllTasksToUi} from "./ui.js";
import {Storage} from "./storage.js";

Storage.dummyCheck();
modalListeners();
addAllTasksToUi();
addAllProjectsToUi();
uiListeners();