console.log('Client side javascript is loaded.')

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data)=> {
//         console.log
//     })
// })
 


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response)=> {
        response.json().then((data)=> {
            if(data.error){
                console.log('Big Error')
            } else {
                messageOne.textContent = ('Location: ' + data.location)
                messageTwo.textContent = (data.forecast)
            }
        })
    })
})