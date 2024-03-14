// Задание 1

// с циклом for
for(let i = 1; i <= 100; i++) {
    console.log(i);
}

// Задание 2

for(let i = 11; i <= 33; i++) {
    console.log(i);
}

// Задание 3

for(let i = 0; i <= 100; i++) {
    if(i % 2 == 0) {
        console.log(i);
    }
}

// Задание 4

let result = 0;

for(let i = 1; i <= 100; i++) {
    result += i;
}

console.log(result);

// Задание 1

// с циклом while
let i = 1;

while(i <= 100) {
    console.log(i)
    i++;
}

// Задание 2

let k2 = 11;

while(k2 <= 33) {
    console.log(k2)
    k2++;
}

// Задание 3

let m = 0;

while(m <= 100) {
    if(m % 2 === 0) {
        console.log(m);
    }
    m++;
}

// Задание 4

let l = 1;
let result41 = 0;

while(l <= 100) {
    result41 += l;
    l++;
}

console.log(result41);

// работа с массивами

// Задание 5

const arr1 = [1, 2, 3, 4, 5];
for(let i = 0; i <= arr1.length; i++) {
    console.log(arr1[i]);
}

// Задание 6

let result12 = 0;
for (let i = 0; i < arr1.length; i++) {
    result12 += arr1[i];
}

console.log(result12);

// Задание 7

var obj = { green: 'зеленый', red: 'красный', blue: 'голубой' }

for (let ob in obj) {
    console.log(`${ob} - ${obj[ob]}`);
}

// Задание 8

var obj = { Коля: '200', Вася: '300', Петя: '400' };

for (let ob in obj) {
    console.log(`${ob} - зарплата ${obj[ob]} долларов`);
}

// задание 9

x = 0;
if (x === 0) { console.log('zero') } else { console.log('nonzero') }
// во первых надо поставить скобки, во вторых переменная x не объявлена


// задание 10

// Вставка точки с запятой в конце строки зависит от контекста и правил языка программирования. 
// Однако, в общем случае, лексемы (токены), которые могут предотвратить автоматическую вставку точки с запятой (automatic semicolon insertion, ASI), включают в себя следующие:

// return
// throw
// break
// continue

// Если строка начинается с одной из этих лексем, то интерпретатор или компилятор не вставит точку с запятой после предыдущей строки кода.


// задание 11

console.log(undefined < null);
console.log(null < undefined);

console.log(undefined <= null);
console.log(null <= undefined);

console.log(null == undefined);

console.log('-----');

console.log(undefined < 0);
console.log(0 < undefined);

console.log(undefined <= 0);
console.log(0 <= undefined);

console.log(0 == undefined);

console.log('-----');

console.log(null < 0);
console.log(0 < null);

console.log(null <= 0);
console.log(0 <= null);

console.log(0 == null);


// задание 13

// Выражение a || b не всегда совпадает с a ? a : b вне зависимости от типов a и b. Различия могут возникнуть, например, при использовании логических значений true и false.

let a = false;
let b = "Hello";

let result1 = a || b;   // Значение result1 будет "Hello"
let result2 = a ? a : b; // Значение result2 будет false

// В данном случае, если a равно false, то a || b вернет значение b, тогда как a ? a : b вернет значение a, которое равно false. Таким образом, результаты могут различаться.
// Чтобы выразить аналогичное выражение для a && b, можно использовать тернарный оператор и логическое НЕ:

let result3 = a && b;   // Значение result3 будет false
let result4 = a ? b : a; // Значение result4 будет false


// Задание 14

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

let naib1 = arr[0];

for (let i = 0; i < arr.length; i++) {
    if (arr[i] > naib1) {
        naib1 = arr[i];
    }
}
console.log(naib1);


let naib2 = arr[0];

for (let ar of arr) {
    if (ar > naib2) {
        naib2 = ar;
    }
}

console.log(naib2);

let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let max3 = arr3[0];

for (let i in arr3) {
    if (arr3[i] > max3) {
        max3 = arr3[i];
    }
}

console.log(max3);

// Задание 14

let arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
for (let i in arr4) {
    if (parseInt(i) + 1 === 10) {
        console.log(arr4[i])
    }
}

// Задание 15

let chislo = 5;

const obj1 = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine"
}

switch(chislo) {
    case chislo:
        console.log(obj1[chislo])
        break;
}

console.log(obj1[chislo]);

// Задание 16

let arr23 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let k = 2;
let n = 4;

switch (n) {
    case 7:
        arr[k + 6] = 0; 
    case 6:
        arr[k + 5] = 0; 
    case 5:
        arr[k + 4] = 0; 
    case 4:
        arr[k + 3] = 0; 
    case 3:
        arr[k + 2] = 0; 
    case 2:
        arr[k + 1] = 0; 
    case 1:
        arr[k] = 0;
        break;
    case 0:
        break;
    default:
        console.log("Некорректное значение n");
}

console.log(arr23);


