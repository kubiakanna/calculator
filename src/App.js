import './App.css';
import React from 'react';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ['/', '*', '-', '+', '='];
const ids = {
  '/': "divide",
  '*': "multiply",
  '-': "subtract",
  '+': "add",
  '=': "equals",
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero"
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPressed: undefined,
      valueSoFar: '0'
    }
  }

  handleClick = (e) => {
    const { lastPressed, valueSoFar } = this.state;
    const { innerText } = e.target;

    switch(innerText) {
        case 'AC': {
          this.setState({
            valueSoFar: '0'
          });
          break;
        }
        case '=': {
          const evaluated = eval(valueSoFar);
          this.setState({
            valueSoFar: evaluated
          });
          break;
        }
        case '.': {
          const splitted = valueSoFar.split(/[+\-*/]/);
          const lastNumber = splitted.slice(-1)[0];
          console.log(lastNumber);
          if(!lastNumber.includes('.')) {
            this.setState({
              valueSoFar: valueSoFar + '.'
            });
          }
          break;

        }
          default: {
            let a = undefined;
            if(operations.includes(innerText)) {
              if(operations.includes(lastPressed) && innerText !== '-') {
                const lastNumberI = valueSoFar
                  .split('')
                  .reverse()
                  .findIndex(char => char !== ' ' && numbers.includes(+char)); 
                a = valueSoFar.slice(0, valueSoFar.length - lastNumberI) + ` ${innerText} `;
              } else {
                a = `${valueSoFar} ${innerText} `;
              }
            } else {
              a = (valueSoFar === '0') ? innerText : (valueSoFar + innerText);
            }

          this.setState({
            valueSoFar: a
          });
          
        }

        this.setState({
          lastPressed: innerText
        })
      }
  }

  render() {

    return (
      <div className="calculator">
        
        <div className="display" id="display">
          {this.state.valueSoFar}
          </div>
        <div className="numbers-container">
          <button className="orange" id="clear" onClick={this.handleClick}>AC</button>
          {numbers.map((num, i) => (
            <button className={`grey ${num === 0 && 'big-w'}`} key={num} id={ids[num]} onClick={this.handleClick}>{num}</button>
          ))}
          <button className="grey" id="decimal" onClick={this.handleClick}>.</button>
        </div>
        <div className="operations-container">
          {operations.map((op, i) => (
            <button className="blue" key={op} id={ids[op]} onClick={this.handleClick}>{op}</button>
          ))}
        </div>
      
      </div>
    )
  }
};

export default App;
