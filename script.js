// Recuperar a ul
// iterar pelo obejo rates
// Transformar o objeto em uma array
// Criar e renderizar a li com os valores

let rates;
let base;

function renderRate(currency, rate){
    const ul = document.querySelector('#currency-list');

    const li = document.createElement('li');
        li.innerText = `${currency}: ${rate}`

        ul.appendChild(li)
}

function handleRates(rates){
    const ratesEntries = Object.entries(rates);
    
    ratesEntries.forEach((entry) => {
        const [currency, rate] = entry;
        renderRate(currency, rate);
    })
}

function renderBase(base){
    const baseTitle = document.querySelector('#base');

    baseTitle.innerText = `Valores referentes a 1 ${base}`
}

function clearCurrencyList (){
    const ul = document.querySelector('#currency-list');
    ul.innerHTML = '';
}

async function handleSearchEvent(){
    const currencyInput = document.querySelector('#currency-input');

        const value = currencyInput.value.toUpperCase();
        const data = await fetchCurrencies(currencyInput.value);
        rates = data.rates;
        base = data.base;
        clearCurrencyList()
        handleRates(rates);
        renderBase(base);
}

function getCurrencies () {
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', handleSearchEvent)
}

function saveCurrencyListInLocalstorage(){
    const saveBtn = document.querySelector('#save-localstorage-button');

    saveBtn.addEventListener('click', () => {
        const ratesStringify = JSON.stringify(rates);
        localStorage.setItem('currencyList', ratesStringify)
    })
}

function getCurrenciesInLocalstorage(){
    const ratesStringfy = localStorage.getItem('currencyList');
    const ratesInLocalStorage = JSON.parse(ratesStringfy);
    handleRates(ratesInLocalStorage)
}

async function start(){
    getCurrencies();
    saveCurrencyListInLocalstorage()
    getCurrenciesInLocalstorage()
}

window.onload = start;