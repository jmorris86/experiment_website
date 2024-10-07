const remunerationMessage = document.querySelector("#remuneration-msg");
const remuneration = ["ultimatum game", "fixed"];
const remunerationType = remuneration[Math.floor(Math.random() * 2)];
console.log(remunerationType);
if (remunerationType==="ultimatum game") {remunerationMessage.innerHTML = `
    After the completion of ten rounds, you will be asked to make a one time take it or leave it 
    offer to each vendor. You can offer any amount up to the total generated from that vendor.<br><br>
    Remember, vendors are real people and can reject offers if they think they are too low. If an offer 
    is rejected, you will receive nothing. If the vendor accepts, you will be paid an amount equal to 
    the total from the vendor less the amount paid to them.<br><br>
    You need to consider both the likelihood of the offer being accepted and how much you are willing to give away.
    <br><br>`;
   } else {
    remunerationMessage.innerHTML = `
    The money generated from purchases from each vendor will be split between you and the vendor at a fixed 
    percentage. This fixed percentage will be the average amount agreed between the vendors and 50% (chosen 
    at random) of the other participants. As such, you will be paid the same fixed percentage from transactios 
    with all vendors.
    <br><br>`;
    } 
