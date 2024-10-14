// const URL = "https://cat-fact.herokuapp.com/facts";

// const getFacts = async () => {
//     console.log("getting data...");
//     let response = await fetch(URL);
//     // console.log(response);
//     let data = await response.json();
//     console.log(data);
// };

// getFacts();

const BASE_URL = "https://api.currencylayer.com/live"; // Updated URL
const ACCESS_KEY = "61f2d10abbe55b5d978a454d12bea77f"; // Replace with your actual API key


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentNode.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    
    // Constructing the URL for live exchange rates
    const URL = `${BASE_URL}?access_key=${ACCESS_KEY}&currencies=${toCurr.value}&source=${fromCurr.value}`;
    
    let response = await fetch(URL);
    let data = await response.json();
    
    if (data.success) {
        let rate = data.quotes[`${fromCurr.value}${toCurr.value}`]; // Accessing the specific conversion rate
        console.log(rate);

        let finalAmount = amtval * rate;
        msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } else {
        msg.innerText = "Error fetching exchange rates.";
    }
});