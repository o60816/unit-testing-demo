import * as _ from "lodash";

const plus = (a: number, b: number) => {
  return a + b;
};

// Currying Style
const plusCurry = _.curry(plus);
const plus1Curry = plusCurry(1);

// High order function
function funcFactory<T, A extends any[]>(func: (...args: A) => T): any {
  return (...curried: unknown[]) => {
    const newFunc = func.bind(func, ...curried);
    if (curried.length >= func.length || !func.length) {
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
