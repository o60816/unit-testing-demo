import * as _ from "lodash";

const plus = (a: number, b: number) => {
  return a + b;
};

// Currying Style
const plusCurry = _.curry(plus);
const plus1Curry = plusCurry(1);

// High order function
function funcFactory<T, A extends any[]>(func: (...args: A) => T) {
  return (...curried: Partial<A>) => {
    const newFunc = func.bind(func, ...curried);
    if (curried.length >= func.length) {
      return newFunc();
    }
    return funcFactory(newFunc);
  };
}

const plusHighOrder = funcFactory(plus);
const plus1HighOrder = plusHighOrder(1);
// Partial application
const plus1PartialApplication = (b: number) => {
  return plus(1, b);
};

// Bind
const plus1Bind = plus.bind(null, 1);

console.log(
  plus1Curry(2),
  plus1HighOrder(2),
  plus1PartialApplication(2),
  plus1Bind(2)
);

interface IOperator {
  calculate: (num1: number, num2: number)=> number
}

class Calculator {
  constructor(private operator: IOperator){}
  calculate(num1: number, num2: number) {
    return this.operator.calculate(num1, num2);
  }
}

class PlusOperator implements IOperator {
  plus(num1: number, num2: number) {
    return num1 + num2;
  }

  calculate(num1: number, num2: number) {
    return this.plus(num1, num2);
  }
}

const plusOperator = new PlusOperator();
const cal = new Calculator(plusOperator);

function calculateHighOrderFunc(func: IOperator['calculate'], num1: number, num2: number) {
  return func(num1, num2);
}

console.log(cal.calculate(1, 2), calculateHighOrderFunc(plusOperator.calculate.bind(plusOperator), 1, 2), calculateHighOrderFunc((num1: number, num2: number)=>{ return plusOperator.calculate(num1, num2)}, 1, 2));
