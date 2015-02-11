/*jslint browser:true */
/*global $, Apad */
"use strict";
$(document).ready(function () {
    function pad(number) {
        return (number < 10) ? "0" + number : number;
    }
    var username, apad = null, problem, now, today, userId = null;
    if (!!localStorage) {
        if (localStorage.getItem("username") === null) {
            username = window.prompt("uVa username (Case sensitive)");
            localStorage.setItem("username", username);
        } else {
            username = localStorage.getItem("username");
        }
        $("#username").text(username);

        apad = new Apad();
        if (localStorage.getItem("userId") !== null) {
            userId = localStorage.getItem("userId");
        }
        now = new Date();
        today = now.getFullYear()
            + "-" + pad(now.getMonth() + 1)
            + "-" + pad(now.getDate())
            + "T00:00:00.000Z";
        // console.log(today);
        apad.getDayProblem(new Date(today), function (choice, cpCat) {
            function checkAc(problemNum, userId) {
                apad.getUserSubsOnProblem(userId, problemNum, function (data) {
                    // console.log(data);
                    var subs = data[userId].subs, ac = false, sub;
                    if (subs.length > 0) {
                        for (sub in subs) {
                            if (subs.hasOwnProperty(sub)) {
                                if (subs[sub][2] === 90) {
                                    ac = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (ac) {
                        $("#controls").html("Congrats! You have solved this problem.<br>Come back tomorrow!");
                        $("#controls").addClass("ac");
                    }
                });
            }
            problem = choice;
            // choice = 100;
            if (userId === null) {
                apad.getUserId(username, function (data) {
                    if (data === 0) { // username not found
                        window.alert("Username not found, please try again.");
                        localStorage.removeItem("username");
                        window.location.reload();
                    } else {
                        userId = data;
                        localStorage.setItem("userId", data);
                        checkAc(choice, userId);
                    }
                });
            } else {
                checkAc(choice, userId);
            }
            problem.category = cpCat;
            // console.log(problem);
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
            $("#dacu").text(problem.dacu);
            $("#mrun").text(problem.mrun);
            $("#mmem").text(problem.mmem);
            $("#sube").text(problem.sube);
            $("#noj").text(problem.noj);
            $("#inq").text(problem.inq);
            $("#ce").text(problem.ce);
            $("#rf").text(problem.rf);
            $("#re").text(problem.re);
            $("#ole").text(problem.ole);
            $("#tle").text(problem.tle);
            $("#mle").text(problem.mle);
            $("#wa").text(problem.wa);
            $("#pe").text(problem.pe);
            $("#ac").text(problem.ac);
        });
    }
});