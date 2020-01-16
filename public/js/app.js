const weartherform = document.querySelector('form')
const address = document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')
const messagelocation=document.querySelector('#message-3')

weartherform.addEventListener('submit',(e)=> {
e.preventDefault()
const location = address.value
messageone.textContent = 'Loading...'
messagetwo.textContent = ''
messagelocation.textContent=''
fetch('/weather?address='+location).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            messageone.textContent=data.error;
            }
        else{
            messageone.textContent='temperature : '+data.temperature+'C'
            messagetwo.textContent='forecast :'+data.forecast
            messagelocation.textContent='location : '+data.location +'  latitude : '+data.latitude+'  longitude : '+data.longitude
        }
        })
        


})
})