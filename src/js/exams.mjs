// Load subjects
import { examlist } from "../data/exams.js";
import { loadItems, loadHeaderFooter, triggerSlideUpAnimation } from "./utils.mjs";

loadHeaderFooter();
loadItems(examlist, "#exam-type", "exams");
triggerSlideUpAnimation();
