const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button ")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for(let select of dropdown){

for (currencyCode in countryList){ // here currencyCode is used to get the keys from the codes.js

let newOption = document.createElement("option")
newOption.innerText = currencyCode
newOption.value = currencyCode

if(select.name === "from" && currencyCode === "USD"){
newOption.selected = "selected"
}

else if(select.name === "to" && currencyCode === "INR"){
newOption.selected = "selected"
}

select.append(newOption)
        
}

select.addEventListener("change" , (evt)=>{


updateFlag(evt.target)
     
})

}


const updateFlag = (element)=>{

let currCode = element.value
let countryCode = countryList[currCode]
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
let img = element.parentElement.querySelector("img")
img.src = newSrc

}

btn.addEventListener("click" , async(evt)=>{

evt.preventDefault() // this is used to avoiding the page to get relaod and avoiding of working of button(like taking input as query selector)
let amount  = document.querySelector(".amount input")
let amountValue = amount.value

if(amountValue==="" || amountValue<1){

amountValue =1;
amount.value = "1"

}


const url = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`

let response = await fetch(url)
let data = await response.json()
let rate = data[toCurr.value.toLowerCase()]

let finalAmount = amountValue * rate
msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})



