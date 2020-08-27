

class CalcController {
    
    constructor(){
        this._audio = new Audio('click.mp3')
        this._audioOnOff = false
        this._lastOperator = ''
        this._lastNumber = ''
        this._operation = []
        this.Locale = "pt-br"
        this._displayEL = document.querySelector("#display")
        this._dateEL = document.querySelector("#data")
        this._hourEL = document.querySelector("#hora")
        this._currentDate = "0"
        this.initialize() 
        this.initButtonsEvents()
        this.initKeyboard()
         
    }
    copyToClipboard(){
        let input = document.createElement('input')

        input.value = this.DisplayCalc
        document.body.appendChild(input)
        input.select()
        document.execCommand('Copy')
        input.remove()
    }
    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let text = e.clipboardData.getData('Text')
            this.DisplayCalc = parseFloat(text)
            
        })
    }

    

    initialize(){
        this.setDisplayTime()
        let interv = setInterval(()=>{
            this.setDisplayTime()
         }, 1000)

         this.setLastNumberToDisplay()
         this.pasteFromClipboard()

         document.querySelectorAll('.btn-ac').forEach(btn=>{
             btn.addEventListener('dblclick', e=>{
                 this.toggleAudio()
             })
         })
     }
     toggleAudio(){

        this._audioOnOff = !this._audioOnOff

     }

     playAudio(){
         if(this._audioOnOff){
             this._audio.currentTime = 0
             this._audio.play()

         }
         

     }

     initKeyboard(){
         document.addEventListener('keyup', e=>{
             
            this.playAudio()

             switch (e.key) {
                case "Escape":
                    this.clearAll()
                    break;
                case "Backspace":
                    this.cancelEntry()
                    break;
                case "+":
                case "-":
                case "*":
                case "/":    
                case "%":
                    this.addOperation(e.key)
                    
                    break;
                
                case "Enter":
                case "=":
                    this.calc()
                    
                    
                    break;
                case `.`:
                case `,`:
                    this.addDot(`.`)
    
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key))
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard()
                    break;    

            }
         })
        
    }

    
    clearAll(){
        this._operation = []
        this.lastNumber = ''
        this._lastOperator = ''
        this.setLastNumberToDisplay()
    }
    cancelEntry(){
        this._operation.pop()
        this.setLastNumberToDisplay()
    }
    
    getLastOperation(){

       return this._operation[this._operation.length-1]
    }
    setLastOperation(value){
        this._operation[this._operation.length-1] = value

    }

    isOperator(value){
       return ([`+`,`-`,`*`,`%`,`/`].indexOf(value) > -1)

    }
    pushOperation(value){
        this._operation.push(value)
        if(this._operation.length > 3){
            this.calc()
           
           
        }

    }

    getResult(){
        try{
            return eval(this._operation.join(' '))
        }catch(e){
            setTimeout(()=>{
                this.setError()
            }, 1)
            
        }
        


    }
    calc(){

        let last = ''

        this._lastOperator = this.getLastitem()

            if(this._operation.length < 3){
                let firstItem = this._operation[0]
                this._operation = [firstItem, this._lastOperator, this._lastNumber]
            }

            if(this._operation.length > 3){
                
                last = this._operation.pop()
                
                this._lastNumber = this.getResult()
                
            }else if(this._operation.length == 3){

                
                this._lastNumber = this.getLastitem(false)

            }
            console.log('lastOperator',this._lastOperator)
            console.log('lastNumber',this._lastNumber)
        
       let result = this.getResult()

        if (last == '%'){

            result /= 100
            this._operation = [result]

        }else{
            this._operation = [result]
                if(last) this._operation.push(last)
            

        }
      

       this.setLastNumberToDisplay()
    }
    getLastitem(isOperator = true){

        let lastItem 
        for(let i = this._operation.length-1; i >=0; i--){
           
                if(this.isOperator(this._operation[i] )== isOperator){
                    lastItem = this._operation[i]
                    break
                }
                if(!lastItem){
                     lastItem = (isOperator) ? this._lastOperator: this.lastNumber
                }
            } 
     return lastItem
           
    }
       


        
       
    
    setLastNumberToDisplay(){
        let lastNumber = this.getLastitem(false)
        
        if(!lastNumber) lastNumber = 0

        
        this.DisplayCalc = lastNumber

    }
    addOperation(value){

       

        if(isNaN(this.getLastOperation())){
            //string
     
            if(this.isOperator(value)){
                //troca o operador
                
                this.setLastOperation(value);
            
            }else{           
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            } 
     
     
        }else{
            if(this.isOperator(value)){
                
                this.pushOperation(value);
     
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation((newValue));
                //atualizar display
                this.setLastNumberToDisplay();
     
            }
            
            
            
        }
              
               
            }
        
        
    
    setError(){
        this.DisplayCalc = "ERROR"
    }

    addDot(){
       let LastOP = this.getLastOperation()
       
       if(typeof LastOP === 'String' && LastOP.split('').indexOf('.')> -1) return
       //separa pô
       if(this.isOperator(LastOP) || !LastOP){
           this.pushOperation('0.')
       }else{
           this.setLastOperation(LastOP.toString() + '.')
       }
       this.setLastNumberToDisplay()

    }

    execBtn(value){
        this.playAudio()
        switch (value) {
            case "ac":
                this.clearAll()
                break;
            case "ce":
                this.cancelEntry()
                break;
            case "soma":
                this.addOperation(`+`)
                
                break;
            case "subtracao":
                this.addOperation(`-`)
                
                break;
            case "multiplicacao":
                this.addOperation(`*`)
                
                break;
            case "divisao":
                this.addOperation(`/`)
                
                break;  
            case "porcento":
                this.addOperation(`%`)
                
                break;
            case "igual":
                this.calc()
                
                
                break;
            case `ponto`:
                this.addDot(`.`)

                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;
                
                default:
                    this.setError()
                    break;
        }
    }

    

    
    
    
   
    
     addEventListenerAll(element, events, fn){
         events.split(' ').forEach(event =>{
             element.addEventListener(event, fn, false)
         })
     }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")
        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn,`click drag`, e => {

               let textBtn = btn.className.baseVal.replace(`btn-`,``)
               this.execBtn(textBtn)
            })

            this.addEventListenerAll(btn, 'mouseover mousedown mouseup', e =>{
                btn.style.cursor = 'pointer'
            })
            
            })
        
        
       
    }

    setDisplayTime(){
        this.displayDate = this.DataAtual.toLocaleDateString(this.Locale)
        this.displayHour = this.DataAtual.toLocaleTimeString(this.Locale)
    }

// GET E SET DO DISPLAY
    get displayHour(){
        return this._hourEL.innerHTML
    }
    set displayHour(value){
        return this._hourEL.innerHTML = value
    }

    get displayDate(){
        this._dateEL.innerHTML
    }
    set displayDate(value){
        this._dateEL.innerHTML = value
    }

    get DisplayCalc(){
       return this._displayEL.innerHTML 
    }

    set DisplayCalc(value){
        if(value.toString().length > 10){
            this.setError()
            return false
        }
        this._displayEL.innerHTML  = value
    }
// GET E SET DA DATA
    get DataAtual(){
        return new Date()
    }

    set DataAtual(value){
        this._currentDate = value
    }
}