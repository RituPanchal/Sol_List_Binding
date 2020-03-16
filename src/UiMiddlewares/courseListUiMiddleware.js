import courseListService from "../Services/courseListService";
import courseListController from "../Controllers/courseListController";

// instance of courseList Service
let courseListServiceObj = new courseListService();
// instance of courseListController
let courseListControllerObj = new courseListController(courseListServiceObj);

export function onPageLoadEvent() {
    try {
        courseListControllerObj
            .onPageLoadAsync()
            .then();

    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }
}

export function onLoadButtonClickEvent() {

    try {
        courseListControllerObj
            .onLoadMoreAsync()
            .then();
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }

}

export function onAllCoursesClickEvent() {

    try {
        courseListControllerObj
            .onAllCourseClickAsync()
            .then();
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }

}

export function onTaxClickEvent() {

    try {
        courseListControllerObj
            .onTaxClickAsync()
            .then();
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }

}

export function onCommClickEvent() {

    try {
        courseListControllerObj
            .onCommClickAsync()
            .then();
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }

}

export function onTechClickEvent() {

    try {
        courseListControllerObj
            .onTechClickAsync()
            .then();
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }

}

onPageLoadEvent();