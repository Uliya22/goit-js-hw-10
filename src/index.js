import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const  inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
    let inputValue =  inputEl.value.toLowerCase().trim();
    if (!inputValue) {
        cleanCountryList();
        cleanCountryInfo();
        return 
    }

    if (inputValue !=='') {
        fetchCountries(inputValue)
        .then((response) => {
            if (!response.ok || response.status === 404) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                return
            }
            if (data.length >= 2 && data.length <= 10) {
                Notify.success('Successful request to the server')
                cleanCountryInfo();
                renderCountryList(data);
                
            }
            if (data.length === 1) {
                Notify.success('Successful request to the server')
                cleanCountryList();
                renderCountryInfo(data);
               
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name')
            cleanCountryList();
            cleanCountryInfo();
        })
    }
}

function renderCountryList(array) {
    countryList.innerHTML = array.map(({ name, flags}) => 
     `<li class="country-item">
         <img src="${flags.svg}" alt="flag of ${name.common}" width="30" height="20">
         <p class="country-name">${name.official}</p>
        </li>`)
    .join('')
}

function renderCountryInfo(array) {
    countryInfo.innerHTML = array.map(({name, capital, population, flags, languages}) => 
    `<img src="${flags.svg}" alt="${name.official}" width="30px">
         <h1 class="official-name">${name.official}</h1>
         <p><b>Capital:</b> ${capital}</p>
         <p><b>Population:</b> ${population}</p>
         <p><b>Langueges:</b> ${Object.values(languages).join(', ')}</p>`)
    .join('')
}



//             if (countries.length >= 2 && countries.length <= 10) {
//                 countryList.innerHTML = countries.map(({ name, flags}) => {
//                     return `<li class="country-item">
//                               <img src="${flags.svg}" alt="flag of ${name.common}" width="30" height="20">
//                                 <p class="country-name">${name.official}</p>
//                              </li>`}).join('')
//             }
//             if (countries.length === 1) {
    
               
//         }).catch(error => {
//             cleanCountryList();
//             return Notify.failure('Oops, there is no country with that name')
//         })
//     }
// }

function cleanCountryList() {
    countryList.innerHTML = '';
}

function cleanCountryInfo() {
    countryInfo.innerHTML = '';
}
// // ---------------------------------------------------
// function onFormInput(evt) {
//     // let countryName = e.target.value.trim();
//     // let countryName = refs.searchBox.value.trim();
//     let countryName = searchBox.value.trim();
//     // console.log(countryName);
//     if (countryName === '') {
//         return clearMarkup()
//     }

// fetchCountries(countryName)
// .then(countries => {
//     if (countries.length > 10) {
//     clearMarkup();
//     return Notify.info('Too many matches found. Please enter a more specific name.');
//     }
// const markup = countries.map(({ name, flags}) => {
//             return `<li class="country-item">
//                     <img src="${flags.svg}" alt="flag of ${name.common}" width="30" height="20">
//                     <p class="country-name">${name.official}</p>
//                     </li>`}).join('')
// clearInfoMarkup();
// // refs.countryList.innerHTML = markup;
// countryList.innerHTML = markup;

// // const title = document.querySelector("p")
// //         console.log(title);

// if (countries.length === 1) {
    
// const { capital, population, languages } = countries[0];   
// const markupInfo = `<div><span class="title">Capital: </span>${capital}</div>
//            <div><span class="title">Population: </span>${population}</div>
//            <div><span class="title">Languages: </span>${Object.values(languages).join(', ')}</div>`;
           
//         //    refs.countryInfo.innerHTML = markupInfo;
//         countryInfo.innerHTML = markupInfo

//         const title = document.querySelector("p");
//         title.classList.replace("country-name", "country-title");
    
           
// }

// }).catch(error => {
//     clearMarkup();
//     return Notify.failure('Oops, there is no country with that name')
// })

// }

// function clearMarkup() {
//     // refs.countryList.innerHTML = '';
//     // refs.countryInfo.innerHTML = '';

//     countryList.innerHTML = '';
//     countryInfo.innerHTML = '';
// }

// function clearInfoMarkup() {
//     // refs. countryInfo.innerHTML = '';

//     countryInfo.innerHTML = '';
// }