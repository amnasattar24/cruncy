const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (currncyCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currncyCode;
    newOption.value = currncyCode;
    if(select.name === "from" && currncyCode === "USD"){
        newOption.selected = "selected"
    } else if (select.name === "to" && currncyCode === "PKR"){
        newOption.selected = "selected"
    }
    select.append(newOption)
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);

});
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
    msg.innerText = `${amtVal}${fromCurr.value}= ${finalAmount}${toCurr.value}`;
};

const updateFlag = (element)=>{
    let currncyCode = element.value;
    let cuntryCode = countryList[currncyCode];
    let newSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});