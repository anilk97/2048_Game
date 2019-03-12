

try {
    var mail = getUrlVars()["mail"];
    var pass = getUrlVars()["pass"];
    var bscore = getUrlVars()["score"];
} catch (e) {
    mail = "null";
    pass = "null";
    bscore = 0;
}
var table = new Array(4);

var color = [];
color[0] = "#e3efff";
color[2] = "#83fc0c";
color[4] = "#19a311";
color[8] = "#6f7ae2";
color[16] = "#ff9b54";
color[32] = "#d87631";
color[64] = "#ff6900";
color[128] = "#989986";
color[256] = "#eef28a";
color[512] = "#f7ff2d";
color[1024] = "#f5ff00";
color[2048] = "#ff4747";
color[4096] = "#afff60";
color[8192] = "#2c8fa3";
color[16384] = "#c1f4ff";
color[32768] = "#66c9dd";
var boxX = 4;
var boxY = 4;
var line = new Array(4);
var swipe = 0;
var score = 0;
var won = 0, wonf = 0;
for (var i = 0; i < 4; i++) {
    table[i] = new Array(4);
    for (var j = 0; j < 4; j++)
        table[i][j] = 0;
}
function generateNumber() {
    for (var i = 0; i < 2; i++) {

        var number = randomNumber();
        //find a random position
        var iBox = Math.floor((Math.random() * 3));
        var jBox = Math.floor((Math.random() * 3));
        //set random number
        if (table[iBox][jBox] === 0)
            table[iBox][jBox] = number;
        else
            --i;
    }
}
generateNumber();
function setTable() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (table[i][j] === 0)
                document.getElementById("mytable").rows[i].cells[j].innerHTML = "";
            else
                document.getElementById("mytable").rows[i].cells[j].innerHTML = table[i][j];
        }
    }
    document.getElementById("score").innerHTML = score.toString();
    setTableColor();
}


function setTableColor() {
    var cell = document.getElementById("00");
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            cell = document.getElementById(i.toString() + j.toString());
            cell.style.backgroundColor = color[table[i][j]];
        }
}
setTableColor();

function checkToLoose() {
    var index = 0;
    for (var i = 0; i < boxX; i++) {
        for (var j = 0; j < boxY; j++) {
            if (table[i][j] == 0) {
                index++;
                break;
            }
        }
    }

    var match = 0;//if any same adjacent number found
    if (index == 0) {
        for (var i = 0; i < boxX; i++) {
            for (var j = 0; j < boxY; j++) {
                if (j + 1 < 4)
                    if (table[i][j] == table[i][j + 1]) {
                        match = 1;
                        break;
                    }
                if (i + 1 < 4)
                    if (table[i][j] == table[i + 1][j]) {
                        match = 1;
                        break;
                    }
            }
        }
        if (match == 0)
            alert("Game Over");
    }
}


function randomNumber() {


    if (((Math.floor((Math.random() * 7)) + 4) / 2) < 4)
        return 2;
    else
        return 4;
}

function setRandomNumber() {

    var number = randomNumber();
    var p = 0, index = 0;
    var emptyBox = new Array(boxX * boxY);
    for (var i = 0; i < boxX; i++) {
        for (var j = 0; j < boxY; j++, p++) {
            if (table[i][j] == 0) {
                emptyBox[index++] = p;
            }
        }
    }

    if (index == 0)
        checkToLoose();
    else {
        var rpos = Math.floor((Math.random() * (index - 1)));
        //find and set random position into dataArray
        iBox = Math.floor(emptyBox[rpos] / boxX);
        jBox = emptyBox[rpos] % boxY;
        table[iBox][jBox] = number;
    }
}


function swiped() {
    for (var i = 0; i < boxX; i++)
    {
        for (var j = 0; j < boxY; j++)
        {
            line[j] = table[geti(i, j)][getj(i, j)];
        }
        alignNumbers();
        for (var j = 0; line[j] != 0; j++)
        {
            if (line[j] == line[j + 1])
            {
                score += line[j] * 2;
                line[j] += line[j];
                if (line[j] == 2048)
                    won = 1;
                line[j + 1] = 0;
                alignNumbers();
            }
            if (j == boxY - 2)
                break;
        }
        for (var j = 0; j < boxY; j++)
            table[geti(i, j)][getj(i, j)] = line[j];
    }
}

function alignNumbers() {
    var j = 0;
    for (var i = 0; i < boxX; i++) {
        if (line[i] != 0) {
            line[j++] = line[i];
        }
    }
    for (var i = j; i < boxX; i++)
        line[i] = 0;
}

function geti(i, j) {
    if (swipe == 1)
        return 3 - j;
    else if (swipe == 2 || swipe == 3)
        return i;
    else
        return j;
}
function getj(i, j) {
    if (swipe == 1 || swipe == 4)
        return i;
    else if (swipe == 2)
        return j;
    else
        return 3 - j;
}


function getUrlVars() {
    var vars = {};
    try {
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
    } catch (e) {
    }
    return vars;
}

function logout() {
    if (bscore > score)
        score = bscore;
    if (mail == "null")
        window.location = "/2048/index.jsp";
    else
        window.location = "/2048/saving.jsp?mail=" + mail + "&pass=" + pass + "&score=" + score;
}

function restart() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            table[i][j] = 0;
    score = 0;
    generateNumber();
    setTable();
}


function checkForChange(t) {
    var flag = 0;
    for (var i = 0; i < boxX; i++)
        for (var j = 0; j < boxY; j++)
            if (t[i][j] != table[i][j]) {
                flag = 1;
                break;
            }

    if (flag == 1)
        return 1; //some change
    else
        return 0; //no change
}

function updateData() {
    var flag = 0;
    var t = new Array(4);
    for (var i = 0; i < 4; i++) {
        t[i] = new Array(4);
        for (var j = 0; j < 4; j++)
            t[i][j] = table[i][j];
    }
    switch (window.event.keyCode) {
        case 37:
            swipe = 2;
            swiped();
            flag = checkForChange(t);
            if (flag == 1)
                setRandomNumber();
            else
                checkToLoose();
            if (won == 1 && wonf == 0) {
                wonf = 1;
                alert("You won");
            }
            setTable();
            break;
        case 38:
            swipe = 4;
            swiped();
            flag = checkForChange(t);
            if (flag == 1)
                setRandomNumber();
            else
                checkToLoose();
            if (won == 1 && wonf == 0) {
                wonf = 1;
                alert("You won");
            }
            setTable();
            break;
        case 39:
            swipe = 3;
            swiped();
            flag = checkForChange(t);
            if (flag == 1)
                setRandomNumber();
            else
                checkToLoose();
            if (won == 1 && wonf == 0) {
                wonf = 1;
                alert("You won");
            }
            setTable();
            break;
        case 40:
            swipe = 1;
            swiped();
            flag = checkForChange(t);
            if (flag == 1)
                setRandomNumber();
            else
                checkToLoose();
            if (won == 1 && wonf == 0) {
                wonf = 1;
                alert("You won");
            }
            setTable();
            break;
    }


}