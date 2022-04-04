'use strict'
// var boardSize = +prompt('Enter number')
var boardSize = 4
var gNums   // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var gNumsCheck   // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var gTimer
var startTime


function init(num, el) {
    var elBtns = document.querySelectorAll('.level')
    for (var i = 0; i < elBtns.length; i++) {
        elBtns[i].style.backgroundColor = 'yellowgreen'
    }
    el.style.backgroundColor = 'white'
    clearInterval(gTimer)
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '0.000'
    gNums = gNumStart(num)
    gNumsCheck = gNumStart(num)
    renderBoard(num)
}


function gNumStart(num) {
    var nums = []
    for (var i = 0; i < num ** 2; i++) {
        nums[i] = i + 1
    }
    return nums
}


function cellClicked(clickedNum) {
    if (clickedNum !== gNumsCheck[0]) return
    if (clickedNum === 1) {
        var start = new Date()
        startTime = start.getTime()
        gTimer = setInterval(gameTimer, 10)
    }
    if (gNumsCheck.length === 1) {
        clearInterval(gTimer)
    }
    var elCell = document.querySelector(`[data-num="${clickedNum}"]`)
    elCell.classList.add('marked')
    gNumsCheck.splice(0, 1)
}


function gameTimer() {
    var currDate = new Date()
    var currTime = currDate.getTime()
    var timer = (currTime - startTime) / 1000
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = timer
}


function renderBoard(num) {
    var strHTML = ''
    for (var i = 0; i < num; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < num; j++) {
            var calledNum = drawNum()
            strHTML += `<td onclick="cellClicked(${calledNum})" data-num=${calledNum}>${calledNum}</td>`
        }
        strHTML += '</tr>'
    }
    var gElTable = document.querySelector('.board')
    gElTable.innerHTML = strHTML
}


function drawNum() {
    var randomIdx = Math.floor(Math.random() * gNums.length)
    var calledNum = gNums[randomIdx]
    gNums.splice(randomIdx, 1)
    return calledNum
}