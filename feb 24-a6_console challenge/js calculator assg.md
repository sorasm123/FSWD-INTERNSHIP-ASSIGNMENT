# Console Challenge – Calculator Operations

**Assignment Date:** 24/02/2026
**Assignment Name:** Console Challenge
**Description:** Write JS programs for calculator operations inside the browser console.

---

## Concepts to Use

Based on topics covered up to 23rd February:

- **Variables** (`let`, `const`)
- **Arithmetic operators** (`+`, `-`, `*`, `/`, `%`)
- **Functions** (parameters, return values)
- **Control flow** (`if/else` or `switch`)
- **Loops** (`for`, `while`)

---

## What to Build

### 1. Basic Calculator Functions

```js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  return a / b;
}
```

### 2. A Single `calculate` Function Using Control Flow

```js
function calculate(a, operator, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return "Invalid operator";
  }
}
```

Usage in console: `calculate(10, '+', 5)` → `15`

### 3. Extra Operations

```js
function power(base, exp) { return base ** exp; }
function modulus(a, b) { return a % b; }
function squareRoot(n) {
  if (n < 0) return "Error: Negative number";
  return Math.sqrt(n);
}
```

### 4. Bonus – Bulk Operations Using Arrays & Loops

```js
function bulkCalculate(operations) {
  // operations = [{a: 10, op: '+', b: 5}, {a: 8, op: '*', b: 3}]
  return operations.map(item => ({
    expression: `${item.a} ${item.op} ${item.b}`,
    result: calculate(item.a, item.op, item.b)
  }));
}
```

### 5. History Tracker Using Arrays

```js
let history = [];

function calcWithHistory(a, operator, b) {
  const result = calculate(a, operator, b);
  history.push({ expression: `${a} ${operator} ${b}`, result });
  return result;
}

function showHistory() { return history; }
function clearHistory() { history = []; return "History cleared"; }
```

---

## What This Demonstrates

| Concept | Where it's used |
|---|---|
| Variables (`let`, `const`) | `history` array, function params |
| Arithmetic operators | All calculator functions |
| Comparison (`===`) | Divide-by-zero check, negative check |
| Functions with return values | Every function |
| Control flow (`switch`/`if`) | `calculate()`, error handling |
| Arrays & array methods | `history`, `bulkCalculate` with `map()` |
| Objects | History entries, bulk operation items |

---

## How to Execute

1. Open any webpage in **Chrome** (even a blank tab works)
2. Press **F12** (or right-click → "Inspect") to open Developer Tools
3. Click the **Console** tab at the top
4. Copy-paste all the functions into the console and press **Enter**
5. Now call any function directly:

```
add(5, 3)              // 8
calculate(10, '*', 5)  // 50
divide(10, 0)          // "Error: Cannot divide by zero"
calcWithHistory(10, '+', 5)  // 15
showHistory()          // [{expression: "10 + 5", result: 15}]
```

### Tips

- You can paste all the functions at once — the console accepts multi-line code
- If pasting shows a warning like "allow pasting", type `allow pasting` and hit Enter first, then paste again
- Each time you call a function, the return value appears right below it
- If you close the tab or refresh, everything resets — you'll need to paste again
