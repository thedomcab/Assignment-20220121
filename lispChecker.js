let lispChecker = (str) => {
      let lispStack = [];
      for (let i = 0; i < str.length; i++) {
           let char = str.charAt(i);
           if (char === "(") {
              lispStack.push("(");
           } else if (!lispStack.length && char === ")") {
               return false;
           } else if (char === ")") {
              lispStack.pop();
          }        
      }
      return !lispStack.length;
}

let value = lispChecker("(()()(((()))))");
console.log(value);
value = lispChecker("(()()(((())))");
console.log(value);
value = lispChecker("(()()(((())))))");
console.log(value);

