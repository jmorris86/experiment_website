const numRounds = 10;
let roundNum = 1;
let experResults = {};
const vendorTypes = ["good", "bad"];
const reviewProb = {
    "good":[0.8, 0.2],
    "goodNotChosen": [.55, .45],
    "bad": [0.4, 0.6]
};
const btnA = document.getElementById("btn-buyA")
const btnB = document.getElementById("btn-buyB")
const btnC = document.getElementById("btn-buyC")
const vendorAReview = document.querySelector(".text_1");
const vendorBReview = document.querySelector(".text_2");
const vendorCReview = document.querySelector(".text_3");
const marketRoundNumber = document.querySelector("#market_round_num");

/* The results of the experiment are random, but known to the experimentor 
ex ante. All permutations are captured in the possible results object*/
function vendor(name, race, picture, type) {
    this.name = name;
    this.race = race;
    this.picture = picture;
    this.type;
    this.reviews = [];
    this.reviewAvg = 0;
    this.reviewAvgCalc = function(){
        this.reviewAvg = this.reviews.reduce((a, b) => a + b, 0)/this.reviews.length;
    }
}

const vendorA = new vendor("James", "mixed", "./assets/images/headshot.jpg", vendorTypes[0])
const vendorB = new vendor("Kobe", "black", "./assets/images/kobe.jpg", vendorTypes[1]);
const vendorC = new vendor("Frida", "Latina", "./assets/images/frida.jpg", vendorTypes[0]);
/**
 * Provides a random draw of outcomes for the experiment subject to the vendor being Good or Bad quality, and
 * them being chosen by the participant.
 *
 * @param  {number} numPlayers The number of players in the game.
 * @param  {number} rounds The number of rounds in the game.
 * @returns {object} An object of experiment outcomes.
 */

function results(numPlayers, rounds) {
    let results = {};
    for (let i=0; i<numPlayers; i++) {
        results[`player_${i+1}`] = {};
        for (key in Object.keys(reviewProb)) {
            results[`player_${i+1}`][Object.keys(reviewProb)[key]] = [];
        for (let j=1; j<=rounds; j++) {
            let review = 0;       
            let num = Math.random()
            if (num < reviewProb[Object.keys(reviewProb)[key]][0]) {
                review = 1;
            }
            
            results[`player_${i+1}`][Object.keys(reviewProb)[key]].push(review)
        }
    }
    }
    return results;
}

function nextRound(vendorNumber){
    if (roundNum<10) {
        if (vendorA.type = "bad") {
            vendorA.reviews.push(experResults.player_1.bad[roundNum - 1]);
        } else if (vendorNumber = 1){
            vendorA.reviews.push(experResults.player_1.good[roundNum - 1]);
        } else {
            vendorA.reviews.push(experResults.player_1.goodNotChosen[roundNum - 1]);
        }
       
        if (vendorB.type = "bad") {
            vendorB.reviews.push(experResults.player_2.bad[roundNum - 1]);
        } else if (vendorNumber = 2){
            vendorB.reviews.push(experResults.player_2.good[roundNum - 1]);
        } else {
            vendorB.reviews.push(experResults.player_2.goodNotChosen[roundNum - 1]);
        }
    
        if (vendorC.type = "bad") {
            vendorC.reviews.push(experResults.player_3.bad[roundNum - 1]);
        } else if (vendorNumber = 3){
            vendorC.reviews.push(experResults.player_3.good[roundNum - 1]);
        } else {
            vendorC.reviews.push(experResults.player_3.goodNotChosen[roundNum - 1]);
        }
        vendorA.reviewAvgCalc();
        vendorB.reviewAvgCalc();
        vendorC.reviewAvgCalc();
        vendorAReview.innerHTML = 
            `${vendorA.reviewAvg.toFixed(2)} <img src="./assets/images/star.svg" height="15" alt="">`;
        vendorBReview.innerHTML = 
            `${vendorB.reviewAvg.toFixed(2)} <img src="./assets/images/star.svg" height="15" alt="">`;
        vendorCReview.innerHTML = 
            `${vendorC.reviewAvg.toFixed(2)} <img src="./assets/images/star.svg" height="15" alt="">`;
        roundNum +=1;
        console.log(roundNum);
        marketRoundNumber.innerHTML = `Onlinemarket - Round <span class="round_number">${roundNum}</span>`;
    } 
    else {
        window.location.href = "./results.html";
    }
}

experResults = results(3, 10);
console.log(experResults);

btnA.addEventListener("click", function(){
    nextRound(1)
});
btnB.addEventListener("click", function(){
    nextRound(2)
});
btnC.addEventListener("click", function(){
    nextRound(3)
});