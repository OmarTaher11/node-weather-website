
/* fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) => {
        console.log(data)
    })
}) */
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



const weatherForm = document.querySelector('form')
const serach = document.querySelector('input')
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    message1.textContent = 'loading ...'
    message2.textContent = ''
    const location = serach.value
    fetch('http://localhost:3001/weather?address='+location).then((response) => {
    response.json().then(({error , location , forecastdata} = {}) => {
        if(error){
            message1.textContent = error
            message2.textContent = ''
        }else {
            message1.textContent = location
            message2.textContent = forecastdata.summary+" Temp :"+forecastdata.temp+" C .  Rain Probability : "+forecastdata.rainProb*100+" %"  
        }
    })

})
})
