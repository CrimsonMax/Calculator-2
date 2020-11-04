class Calculator {
    constructor(preOperand, curOperand) {
        this.preOperand = preOperand
        this.curOperand = curOperand
        this.readyToReset = false;
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

    appendNumber(number) {
        if (number === char && this.currentOperand.includes(char)) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }

        this.readyToReset = true;
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const strNum = number.toString()
        const intNum = parseFloat(strNum.split('.')[0])
        const decNum = strNum.split('.')[1]
        let intDisplay
        if (isNaN(intNum)) {
            intDisplay = ''
        } else {
            intDisplay = intNum.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decNum != null) {
            return `${intDisplay}.${decNum}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.curOperand.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.preOperand.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.preOperand.innerText = ''
        }
    }
}



const numButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-operation]')
const equalButtons = document.querySelector('[data-equals]')
const delButtons = document.querySelector('[data-delete]')
const clearButtons = document.querySelector('[data-clear]')
const char = document.querySelector('[data-char]').innerText
const preOperand = document.querySelector('[data-prev]')
const curOperand = document.querySelector('[data-curr]')

const calculator = new Calculator(preOperand, curOperand)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})