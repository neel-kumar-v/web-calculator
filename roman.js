class Calculator {
  constructor(previousOperandText, currentOperandText) {
      this.currentOperandTextElement = currentOperandText
      this.previousOperandTextElement = previousOperandText
      this.clear()
  }

  clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
  }

  delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  
  appendNumeral(numeral) {
    const regex = /\d/
    if(regex.test(numeral)) this.clear()
    const regex2 =  /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
    if(!regex2.test(this.currentOperand + numeral)) return
    this.currentOperand += numeral
  }

  valueOf(numeral) {
    if (numeral == 'I') return 1
    if (numeral == 'V') return 5
    if (numeral == 'X') return 10
    if (numeral == 'L') return 50
    if (numeral == 'C') return 100
    if (numeral == 'D') return 500
    if (numeral == 'M') return 1000
    return -1
  }

  compute(){
    var res = 0
    var i = 0

    while (i < this.currentOperand.length) {
      console.log(this.valueOf(this.currentOperand.charAt(i)))

      var s1 = this.valueOf(this.currentOperand.charAt(i))
      if (i + 1 < this.currentOperand.length) {
        var s2 = this.valueOf(this.currentOperand.charAt(i + 1))
        if(s1 >= s2) {
          res += s1
          i += 1
        } else  {
          res += s2 - s1
          i += 2
        }
      } else {
        res += s1
        i += 1
      }
      console.log(res)
    }
    this.previousOperand = res.toString()
    this.currentOperand = ''
  }

  updateDisplay() {
      this.previousOperandTextElement.innerText = this.currentOperand
      this.currentOperandTextElement.innerText = this.previousOperand
  }
}




const numerals = document.querySelectorAll('[data-numeral]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const currentOperandTextElement = document.getElementById("data-current-operand")
const previousOperandTextElement = document.getElementById("data-previous-operand")


const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numerals.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumeral(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

const sidebar = document.getElementById("sidebar")
const calculatorElement = document.getElementById("roman-calculator-grid")

function sideBar() {
  if(sidebar.style.display === "none"){
      sidebar.style.display = "block"   
      calculatorElement.style.marginLeft = "400px"
  } else {
      sidebar.style.display = "none"
      calculatorElement.style.marginLeft = "0px"
  }
}