/*jslint browser:true */
/*global $, Apad */
"use strict";
$(document).ready(function () {
    function pad(number) {
        return (number < 10) ? "0" + number : number;
    }
    var username, apad = null, problem, now, today;
    if (!!localStorage) {
        if (localStorage.getItem("username") === null) {
            username = window.prompt("uVa username (Case sensitive)");
            localStorage.setItem("username", username);
        } else {
            username = localStorage.getItem("username");
        }
        apad = new Apad(username);
        now = new Date();
        today = now.getFullYear()
            + "-" + pad(now.getMonth() + 1)
            + "-" + pad(now.getDate())
            + "T00:00:00.000Z";
        console.log(today);

        apad.getDayProblem(new Date(today), function (choice, cpCat) {
            problem = choice;
            problem.category = cpCat;
            console.log(problem);
            problem.url = {
                main: "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=" + problem.pid,
                external: "http://uva.onlinejudge.org/external/" + Math.floor(problem.num / 100) + "/" + problem.num + ".html",
                udebug: "http://www.udebug.com/UVa/" + problem.num,
                submit: "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=submit_problem&category=24&problemid=" + problem.pid,
            };
            $("#pTitle").text(problem.title);
            $("#pNumber").text(problem.num);
            $("#pCategory").text(problem.category);
            $("#pTitle").attr("href", problem.url.main);
            $("#pNumber").attr("href", problem.url.external);
            $("#pUdebug").attr("href", problem.url.udebug);
            $("#pSubmit").attr("href", problem.url.submit);
        });
    }
});