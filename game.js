const numRounds = 10;
let roundNum = 1;
let experResults = {};
let vendorNumber = "";
const vendorTypes = ["good", "bad"]
const reviewProb = {
    "good":[.8, .2],
    "goodNotChosen": [.65, .35],
    "bad": [.5, .5]
};
const btnA = document.getElementById("btn-buyA");
const btnB = document.getElementById("btn-buyB");
const btnC = document.getElementById("btn-buyC");
const vendorAReview = document.querySelector(".text-1");
const vendorBReview = document.querySelector(".text-2");
const vendorCReview = document.querySelector(".text-3");
const resultRoundNumber = document.querySelector("div.modal-header span");
const modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
const marketRoundNumber = document.querySelector("#market-round-num");
const paymentMessage = document.querySelector("#payment-message")

class purchaser{
    constructor(id) {
        this.id = id;
        this.choices = [];
        this.totalPayoff = this.payoffVendor1 + this.payoffVendor2 + this.payoffVendor3;
        this.payoffVendor1 = 0;
        this.chosenVendor1 = 0;
        this.payoffVendor2 = 0;
        this.chosenVendor2 = 0;
        this.payoffVendor3 = 0;
        this.chosenVendor3 = 0;
    }
}

/* The results of the experiment are random, but known to the experimentor 
ex ante. All permutations are captured in the possible results object*/
class vendor{
    constructor(name, race, picture, identity) {
    this.name = name;
    this.race = race;
    this.picture = picture;
    this.vendorType = identity;
    this.reviews = [];
    this.reviewAvg = 0;
    this.choice = [];
    }
    reviewAvgCalc(){
        this.reviewAvg = this.reviews.reduce((a, b) => a + b, 0)/this.reviews.length;
    }
}

const purchaserA = new purchaser();
const vendor1 = new vendor("James", "mixed", "./assets/images/headshot.jpg", vendorTypes[0]);
const vendor2 = new vendor("Kobe", "black", "./assets/images/kobe.jpg", vendorTypes[1]);
const vendor3 = new vendor("Frida", "Latina", "./assets/images/frida.jpg", vendorTypes[0]);
console.log(vendor1);
console.log(vendor2);
console.log(vendor3);
console.log(purchaserA);
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
        results[`vendor${i+1}`] = {};
        for (key in Object.keys(reviewProb)) {
            results[`vendor${i+1}`][Object.keys(reviewProb)[key]] = [];
        for (let j=1; j<=rounds; j++) {
            let review = 0;       
            let num = Math.random()
            if (num < reviewProb[Object.keys(reviewProb)[key]][0]) {
                review = 1;
            }
            
            results[`vendor${i+1}`][Object.keys(reviewProb)[key]].push(review)
        }
    }
    }
    return results;
}

function nextRound(vendorNumber){
    if (roundNum<11) {
        if (vendor1.vendorType === "bad") {
            vendor1.reviews.push(experResults.vendor1.bad[roundNum - 1]);
        } else if (vendorNumber === 1){
            vendor1.reviews.push(experResults.vendor1.good[roundNum - 1]);
        } else {
            vendor1.reviews.push(experResults.vendor1.goodNotChosen[roundNum - 1]);
        }
       
        if (vendor2.vendorType === "bad") {
            vendor2.reviews.push(experResults.vendor2.bad[roundNum - 1]);
        } else if (vendorNumber === 2){
            vendor2.reviews.push(experResults.vendor2.good[roundNum - 1]);
        } else {
            vendor2.reviews.push(experResults.vendor2.goodNotChosen[roundNum - 1]);
        }
    
        if (vendor3.vendorType === "bad") {
            vendor3.reviews.push(experResults.vendor3.bad[roundNum - 1]);
        } else if (vendorNumber === 3){
            vendor3.reviews.push(experResults.vendor3.good[roundNum - 1]);
        } else {
            vendor3.reviews.push(experResults.vendor3.goodNotChosen[roundNum - 1]);
        }
        vendor1.reviewAvgCalc();
        vendor2.reviewAvgCalc();
        vendor3.reviewAvgCalc();
    }
}

function displayResults () {
    if (roundNum<10) {
        vendorAReview.innerHTML = 
            `${vendor1.reviewAvg.toFixed(1)} <img src="./assets/images/star.svg" height="15" alt="">`;
        vendorBReview.innerHTML = 
            `${vendor2.reviewAvg.toFixed(1)} <img src="./assets/images/star.svg" height="15" alt="">`;
        vendorCReview.innerHTML = 
            `${vendor3.reviewAvg.toFixed(1)} <img src="./assets/images/star.svg" height="15" alt="">`;
        roundNum +=1;
        marketRoundNumber.innerHTML = `Onlinemarket - Round <span class="round-number">${roundNum}</span>`;
    } 
    else {
        window.location.href = "./results.html";
    }
}

function roundSummary(vendor) {
    let reviewScore = "";
    let avgScore = "";
    if (vendor === 1) {
        reviewScore = vendor1.reviews[roundNum - 1];
        avgScore = (purchaserA.payoffVendor1 / purchaserA.chosenVendor1).toFixed(1);
        vendor = "A";
    } else if (vendor === 2) {
        reviewScore = vendor2.reviews[roundNum - 1];
        avgScore = (purchaserA.payoffVendor2 / purchaserA.chosenVendor2).toFixed(1);
        vendor = "B";
    } else {
        reviewScore = vendor3.reviews[roundNum - 1];
        avgScore = (purchaserA.payoffVendor3 / purchaserA.chosenVendor3).toFixed(1);
        vendor = "C";
    }
    let message = `
    Your purchase was rated as ${reviewScore}<img src="./assets/images/star.svg" height="15" alt="">. 
    The average rating of your Product ${vendor} purchases to date is ${avgScore}<img src="./assets/images/star.svg" height="15" alt="">.
    `
    paymentMessage.innerHTML = message;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    displayResults();
    console.log(results)
  }

  function modalUpdate() {
    modal.style.display = "block";
    resultRoundNumber.innerHTML = roundNum;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    displayResults();
  }
}


btnA.addEventListener("click", function(){
    modalUpdate()
    purchaserA.choices.push(1);
    purchaserA.chosenVendor1 ++;
    nextRound(1);
    purchaserA.payoffVendor1 += vendor1.reviews[roundNum - 1];
    roundSummary(1);
});
btnB.addEventListener("click", function(){
    modalUpdate()
    purchaserA.choices.push(2);
    purchaserA.chosenVendor2 ++;
    nextRound(2);
    purchaserA.payoffVendor2 += vendor2.reviews[roundNum - 1];
    roundSummary(2);
});
btnC.addEventListener("click", function(){
    modalUpdate()
    purchaserA.choices.push(3);
    purchaserA.chosenVendor3 ++;
    nextRound(3);
    purchaserA.payoffVendor3 += vendor3.reviews[roundNum - 1];
    roundSummary(3);
}
);

    experResults = results(3, 10);
    console.log(experResults);