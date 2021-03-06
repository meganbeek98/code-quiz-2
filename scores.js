var restartBtn = document.querySelector("button.restartBtn"),
clearBtn = document.querySelector("button.clearBtn"),
// get the highScores list || turns it back into an object
highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
scoreList = document.getElementById("score-list");

// sort scores, low->high
highScores.sort(function (a, b) {
return b.score - a.score
})

// show scores
for (var s = 0; s < highScores.length; s++) {
var newLi = document.createElement("li")
newLi.textContent = highScores[s].name + " - " + highScores[s].score
scoreList.appendChild(newLi)
}


// for restart and clearing scoreboard
clearBtn.addEventListener("click", function () {
localStorage.clear();
history.back()
});
restartBtn.addEventListener("click", function () {
history.back();
});