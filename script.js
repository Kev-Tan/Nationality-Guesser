//Global Variable
const form = document.querySelector('#searchForm')
const ul = document.querySelector('ul')
const resultBox = document.querySelector('#resultBox')
let LiElement = ''
let H3Element = ''

//Functions to create elements

createH3 = (name) =>{
    const h3 = document.createElement('h3')
    h3.append(name)
    ul.append(h3)
}

createLi = (country, prob) =>{
    const newLi = document.createElement('Li')
    newLi.append(`${country}: ${prob}`)
    ul.append(newLi)
}

//Function to remove elements

//This is a function to remove individual element, not contained within an array/iterable
const removeElement  = (element) =>{
    element.remove()
}
//This is a function to remove elements within an array
const removeElements = (list) =>{
    for (element of list){
        element.remove()
    }
}

//Async function to call info

const callInfo = async(userInput) =>{
    try{
    const config = {
        params:{
            name:userInput  
        }
    }
    const result = await axios.get('https://api.nationalize.io', config)
    firstName = result.data.name
    countries = result.data.country

    createH3(firstName)

    for(country of countries){
        console.log(country.country_id, country.probability)
    createLi(country.country_id,country.probability)
    }

    LiElement = document.querySelectorAll('li') 
    H3Element = document.querySelector('H3')
}
catch (e){
console.log(`ERROR ${e}`)
}
}

//Add event listener

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let searchTerm = form.elements.query.value
    callInfo(searchTerm)
    form.elements.query.value = ''
    ul.style.backgroundColor = 'white'
    removeElement(H3Element)
    removeElements(LiElement)
})