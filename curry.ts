import * as _ from "lodash";
import * as util from "util";

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


const setRequestTo = (method: string, path: string, data: object)=>{
  return `${method} request to ${path}, payload: ${util.inspect(data, false, null, true)}`
}

// Generate util functions

// Utilize curry function
const reqestCurry = _.curry(setRequestTo);
const getRequestToCurry = reqestCurry('get');
const getUserCurry = getRequestToCurry('/user');

// Utilize partial application
const getRequestToPartialApplication = (path: string, data: object) => {
  return setRequestTo('get', path, data);
}

const getUserPartialApplication = (data: object) => {
  return getRequestToPartialApplication('/user', data);
}

// Utilize bind
const getRequestToBind = setRequestTo.bind(setRequestTo, 'get');
const getUserBind = getRequestToBind.bind(getRequestToBind, '/user');

const userData = {user_id: '1'};
console.log(getUserCurry(userData), getUserPartialApplication(userData), getUserBind(userData));