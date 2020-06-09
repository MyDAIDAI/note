// 括号匹配
const LEFT_PAREN = '(';
const RIGHT_PAREN = ')';
const LEFT_BRACE = '{';
const RIGHT_BRACE = '}';
const LEFT_BRACKET = '[';
const RIGHT_BRACKET = ']';

function isBalanced(s) {
  let stack = [];
  for (let i = 0, len = s.length; i < len; i++) {
    let item = s[i];
    if(item === LEFT_PAREN || item === LEFT_BRACE || item === LEFT_BRACKET) {
      stack.push(item);
    }
    if(item === RIGHT_PAREN) {
      if(stack.length === 0) return false;
      if(stack.pop() !== LEFT_PAREN) return false;
    }
    if(item === RIGHT_BRACE) {
      if(stack.length === 0) return false;
      if(stack.pop() !== LEFT_BRACE) return false;
    }
    if(item === RIGHT_BRACKET) {
      if(stack.length === 0) return false;
      if(stack.pop() !== LEFT_BRACKET) return false
    }
  }
  return stack.length === 0
}
console.log(isBalanced('[()]{}{[()()]()}'))
console.log(isBalanced('[(])'))
