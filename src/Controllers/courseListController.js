// import $ from "jquery";
var $ = require('jquery');

import '../Lib/app.scss';
import 'bootstrap';
import courseListService from "../Services/courseListService";
import '../style/courses.css';

// Objects
const _courseListServiceObject = Symbol("_courseListServiceObject");
const _courseListItems = Symbol("_courseListItems");
const _courseListFilterItems = Symbol("_courseListItems");

const _pageSize = Symbol("_pageSize");
const _pageNumber = Symbol("_pageNumber");
const _isFilter = Symbol("_isFilter");

// Private Method Declaration
const getCourseListDataAsync = Symbol("getCourseListDataAsync");
const courseListPaginationAsync = Symbol("courseListPaginationAsync");
const courseListHtmlRenderAsync = Symbol("courseListHtmlRenderAsync");
const noMoreDataMessageHtmlRenderAsync = Symbol("noMoreDataMessageHtmlRenderAsync");
const filtersDataByCategoryAsync = Symbol("filtersDataByCategoryAsync");


export default class courseListController {

    // Constructor
    constructor(courseListServiceObject) {
        this[_courseListServiceObject] = courseListServiceObject;

        this[_pageNumber] = 1;
        this[_pageSize] = 10;
        this[_isFilter] = false;

    }

    // private Method
    [getCourseListDataAsync]() {

        return new Promise(async (resolve) => {
            try {
                // get course list Data from Api Service
                this[_courseListItems] = await this[_courseListServiceObject].getCourseListDataApiAsync();

                return resolve(true);
            }
            catch (ex) {
                throw ex;
            }
        });
    }

    [courseListPaginationAsync](pageSize, pageNumber) {
        let getCourseListPaginationData = null;
        return new Promise(async (resolve) => {

            try {

                if (this[_isFilter] == false) {
                    getCourseListPaginationData = await this[_courseListItems].data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
                }
                else {

                    getCourseListPaginationData = await this[_courseListFilterItems].slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
                }

                return resolve(getCourseListPaginationData);
            }
            catch (ex) {
                throw ex;
            }

        });
    }

    [courseListHtmlRenderAsync](pageList) {
        let title, description, type, price, imageSrc, altText = null;
        var cardOutput = $('#cardOutput');

        return new Promise((resolve) => {

            try {

                function displayData(title, description, price, imageSrc, altText) {

                    var cardImgFrame = document.createElement('div');
                    cardImgFrame.setAttribute("id", "cardImgFrame");
                    cardImgFrame.setAttribute("class", "card col-md-4");

                    var cardImg = document.createElement('img');
                    cardImg.setAttribute("class", "card-img");
                    var imgPath = "../Lib/images/";
                    cardImg.setAttribute("src", imgPath + imageSrc);
                    cardImg.setAttribute("alt", altText);

                    cardImgFrame.append(cardImg);
                    cardOutput.append(cardImgFrame);

                    var cardFrame = document.createElement('div');
                    cardFrame.setAttribute("id", "cardFrame");
                    cardFrame.setAttribute("class", "card col-md-8 pl-2 pr-2");

                    var titleLI = document.createElement('h5');
                    titleLI.setAttribute("id", "cardTitle");
                    $('#cardTitle').addClass('card-title');
                    var titleTextNode = document.createTextNode(title);
                    titleLI.appendChild(titleTextNode);

                    var descLI = document.createElement('p');
                    descLI.setAttribute("id", "cardDesc");
                    $('#cardDesc').addClass('card-text');
                    var typeTextNode = document.createTextNode(description);
                    descLI.appendChild(typeTextNode);

                    var priceLI = document.createElement('p');
                    priceLI.setAttribute("id", "cardPrice");
                    $('#cardPrice').addClass('card-text');
                    var priceTextNode = document.createTextNode("Price: £" + price);
                    priceLI.appendChild(priceTextNode);


                    cardFrame.append(titleLI);
                    cardFrame.append(descLI);
                    cardFrame.append(priceLI);

                    cardOutput.append(cardFrame);


                };

                categorize(pageList);
                function categorize(pageList) {

                    $.each(pageList, function (i) {
                        var title = pageList[i].title;
                        var description = pageList[i].description;
                        var price = pageList[i].price;
                        var imageSrc = pageList[i].imageSrc;
                        var altText = pageList[i].altText;

                        displayData(title, description, price, imageSrc, altText);
                    });

                }

                return resolve("Ul Render Done");
            }

            catch (ex) {
                throw ex;
            }

        });
    }


    [noMoreDataMessageHtmlRenderAsync]() {
        let htmldivObject = null;
        return new Promise((resolve) => {

            try {

                htmldivObject = $("div#noMoreDataMessage");
                htmldivObject.html("No more courses to load");

                return resolve("Ul Render Done");
            }
            catch (ex) {
                throw ex;
            }

        });
    }

    async [filtersDataByCategoryAsync](categoryName) {
        let courseListPaginationData = null;
        try {
            this[_courseListFilterItems] = this[_courseListItems].data.filter(e => e.type.includes(categoryName));

            this[_pageNumber] = 1;
            this[_isFilter] = true;
            $("#cardOutput").empty();
            $("div#noMoreDataMessage").empty();

            courseListPaginationData = await this[courseListPaginationAsync](this[_pageSize], this[_pageNumber]);

            await this[courseListHtmlRenderAsync](courseListPaginationData);
        }
        catch (ex) {
            throw ex;
        }
    }


    // Public Method
    async onPageLoadAsync() {
        let courseListPaginationData = null;
        try {
            await this[getCourseListDataAsync]();

            courseListPaginationData = await this[courseListPaginationAsync](this[_pageSize], this[_pageNumber]);

            await this[courseListHtmlRenderAsync](courseListPaginationData);

        }
        catch (ex) {
            throw ex;
        }
    }

    async onLoadMoreAsync() {
        let courseListPaginationData = null;
        try {

            this[_pageNumber] = this[_pageNumber] + 1;

            courseListPaginationData = await this[courseListPaginationAsync](this[_pageSize], this[_pageNumber]);
            console.log("Course_PaginationData", courseListPaginationData);

            if (courseListPaginationData.length >= 1) {

                await this[courseListHtmlRenderAsync](courseListPaginationData);
            }
            else {
                await this[noMoreDataMessageHtmlRenderAsync]();
            }

        }
        catch (ex) {
            throw ex;
        }
    }

    async onAllCourseClickAsync() {

        let courseListPaginationData = null;

        try {

            this[_pageNumber] = 1;
            this[_isFilter] = false;
            $("#cardOutput").empty();
            $("div#noMoreDataMessage").empty();

            courseListPaginationData = await this[courseListPaginationAsync](this[_pageSize], this[_pageNumber]);

            await this[courseListHtmlRenderAsync](courseListPaginationData);

            $('.navTab').removeClass('active');

            $('#allCourseNavTab').addClass('active');

        }
        catch (ex) {
            throw ex;
        }
    }

    async onTaxClickAsync() {

        try {


            await this[filtersDataByCategoryAsync]("tax");

            $('.navTab').removeClass('active');

            $('#onTaxNavTab').addClass('active');

        }
        catch (ex) {
            throw ex;
        }
    }

    async onCommClickAsync() {

        try {

            await this[filtersDataByCategoryAsync]("communication");

            $('.navTab').removeClass('active');

            $('#onCommNavTab').addClass('active');

        }
        catch (ex) {
            throw ex;
        }
    }

    async onTechClickAsync() {

        try {

            await this[filtersDataByCategoryAsync]("technology");

            $('.navTab').removeClass('active');

            $('#onTechNavTab').addClass('active');

        }
        catch (ex) {
            throw ex;
        }
    }
}
