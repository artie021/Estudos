let newYear = '01/01/2021'
current = ()=>{
    
    const date = new Date()
    const anoNovo = new Date(newYear)
    let second = (anoNovo - date)  / 1000

    const days = Math.floor(second / 3600 / 24)
    const hours =  Math.floor(second / 3600) % 24
    const minutes = Math.floor(second / 60) %60
    const secr = second % 60
   
    const dia =document.getElementById('day').textContent = days
    const hora =document.getElementById('hour').textContent = hours
    const minu =document.getElementById('min').textContent = minutes
    const segu =document.getElementById('sec').textContent = secr.toFixed([0])
  
}
current()
setInterval(current, 1000)



       
        
       
        
        






    
    



