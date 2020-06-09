# 第一章 基础

## 1.3 背包、队列和栈

### 背包

**背包**是一种不支持从中删除元素的集合数据类型--它的目的就是帮助用例收集元素并迭代遍历所有收集到的元素，迭代的顺序不确定且与用例无关

| `public class Bag<Item> implements Iterable<Item>` |                   |
| -------------------------------------------------- | ----------------- |
| `Bag()`                                            | 创建一个空背包    |
| `void add(Item item)`                              | 添加 一个元素     |
| `boolean isEmpty()`                                | 背包是否为空      |
| `int size()`                                       | 背包中的 元素数量 |



TODO: 背包的典型用例



### 先进先出队列

先进先出队列是一种基于**先进先出**策略的集合类型。当用例使用`foreach`语句迭代访问队列中的元素时，元素的处理顺序就是它们被添加到队列中的顺序。在应用程序中使用队列的主要原因是**在用集合保存元素的同时保存它们的相对顺序：使它们入列顺序和出列顺序相同**



TODO: 队列的文件读取用例



### 下压栈

下压栈是一种基于**后进先出**策略的集合模型。当用例使用`foreach`语句迭代遍历栈中的元素时，元素的处理顺序和它们被压入的顺序正好相反。在应用程序中使用栈的主要原因是**在用集合保存元素的同时颠倒它们的相对顺序**



#### 算术表达式求值

计算算术表达式的值，例如`(1 + ((2 + 3) * (4 * 5)))`

思路： 

- 使用两个栈，一个运算符栈，一个操作数栈
- 忽略左括号
- 将操作数压入操作数栈
- 将运算符压入运算符栈
- 在遇到右括号时，弹出一个运算符，弹出所需数量的操作数，并将运算符和操作数的运算结果压入栈中

code: [evaluate.js](evaluate.js)

## `Exercises`
1. 实现一个固定大小的栈 
- [FixedCapacityStack.js](FixedCapacityStack.js)
2. `Write a stack client Parentheses.java that reads in sequence of left and right parentheses, braces, and brackets from standard input and uses a stack to determine whether the sequence is properly balanced. For example, your program should print true for [()]{}{[()()]()} and false for [(]).`
- [Parentheses.js](Parentheses.js)
3. `What does the following code fragment print when n is 50? Give a high-level description of what it does when presented with a positive integer n`
- [IntegerToBinary.js](IntegerToBinary.js)
4. `Write a filter Program InfixToPostfix.java that converts an arithmetic expression from infix to postfix.`
- [InfixToPostfix.js](InfixToPostfix.js)
5. `Write a program EvaluatePostfix.java that that takes a postfix expression from standard input, evaluates it, and prints the value. `



