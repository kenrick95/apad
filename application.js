/*jslint browser:true */
/*global $*/
"use strict";

// Polyfill for toISOString
if (!Date.prototype.toISOString) {
    (function () {
        function pad(number) {
            return (number < 10) ? "0" + number : number;
        }
        Date.prototype.toISOString = function () {
            return this.getUTCFullYear() +
                '-' + pad(this.getUTCMonth() + 1) +
                '-' + pad(this.getUTCDate()) +
                'T' + pad(this.getUTCHours()) +
                ':' + pad(this.getUTCMinutes()) +
                ':' + pad(this.getUTCSeconds()) +
                '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                'Z';
        };
    }());
}
var Apad = function () {
    this.base_url = "http://uhunt.felix-halim.net/api/";
};
Apad.prototype.getData = function (param, callback) {
    $.ajax({
        url: this.base_url + param,
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, error) {
            console.error(xhr, status, error);
        }
    });
};
Apad.prototype.getProblemInfo = function (num, callback) {
    this.getData("p/num/" + num, function (data) {
        callback(data);
    });
};
Apad.prototype.getCpProblemList = function (callback) {
    return this.getData("cpbook/3", function (data) {
        callback(data);
    });
};
Apad.prototype.getUserId = function (username, callback) {
    return this.getData("uname2uid/" + username, function (data) {
        callback(data);
    });
};
Apad.prototype.getUserSubsOnProblem = function (userId, problemNum, callback) {
    return this.getData("subs-nums/" + userId + "/" + problemNum, function (data) {
        callback(data);
    });
};
Apad.prototype.getUserSubs = function (userId, callback) {
    return this.getData("subs-user/" + userId, function (data) {
        callback(data);
    });
};
Apad.prototype.getDayProblem = function (date, callback) {
    Math.seedrandom(date.toISOString());
    this.constructProblemList(function (problemList) {
        var length = problemList.length,
            choice = Math.floor(Math.random() * length);
        // console.log(date);
        // console.log(choice);
        this.getProblemInfo(problemList[choice][0], function (data) {
            callback(data, problemList[choice][1]);
        });
    }.bind(this));
};
Apad.prototype.getStorage = function (key, onnull) {
    if (window.localStorage.getItem(key) === null
            && typeof onnull === "function") {
        window.localStorage.setItem(key, onnull());
    }
    return window.localStorage.getItem(key);
};
Apad.prototype.constructProblemList = function (callback) {
    var problemList = this.getStorage("problemList");
    if (problemList === null) {
        problemList = [];
        this.getCpProblemList(function (data) {
            var chapter, chapterValue, subchapter, subchapterValue, subsubchapter, section, sectionTitle;
            for (chapter in data) {
                if (data.hasOwnProperty(chapter)) {
                    chapterValue = data[chapter];

                    for (subchapter in chapterValue.arr) {
                        if (chapterValue.arr.hasOwnProperty(subchapter)) {
                            subchapterValue = chapterValue.arr[subchapter];

                            for (subsubchapter in subchapterValue.arr) {
                                if (subchapterValue.arr.hasOwnProperty(subsubchapter)) {

                                    for (section in subchapterValue.arr[subsubchapter]) {
                                        if (subchapterValue.arr[subsubchapter].hasOwnProperty(section)) {

                                            if (typeof subchapterValue.arr[subsubchapter][section] !== "number") {
                                                sectionTitle = subchapterValue.arr[subsubchapter][section];
                                            } else {
                                                if (subchapterValue.arr[subsubchapter][section] < 0) {
                                                    problemList.push(
                                                        [-subchapterValue.arr[subsubchapter][section],
                                                            chapterValue.title + ": "
                                                            + subchapterValue.title + ": "
                                                            + sectionTitle + " "
                                                            + "(starred)"]
                                                    );
                                                } else {
                                                    problemList.push(
                                                        [subchapterValue.arr[subsubchapter][section],
                                                            chapterValue.title + ": "
                                                            + subchapterValue.title + ": "
                                                            + sectionTitle]
                                                    );
                                                }
                                            }

                                        }
                                    }

                                }
                            }

                        }
                    }

                }
            }
            this.getStorage("problemList", function () {
                return JSON.stringify(problemList);
            });
            // console.log(problemList);
            callback(problemList);
        }.bind(this));
    } else {
        problemList = JSON.parse(problemList);
        // console.log(problemList);
        callback(problemList);
    }
};