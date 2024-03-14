// Задание 1

const arr1 = [2, 5, 9, 15, 0, 4];
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > 3 && arr1[i] < 10) {
        console.log(arr1[i]);
    }
}

// Задание 2

const arr2 = [2, -5, -9, 15, 0, 4];
let result2 = 0;
for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] > 0) {
        result2 += arr2[i];
    }
}
console.log(result2);



const arr3 = [1, 2, 5, 9, 4, 13, 4, 10];
for (let i = 0; i < arr3.length; i++) {
    if (arr3[i] === 4) {
        console.log("Есть");
        break;
    }
}


const arr4 = [10, 20, 30, 50, 235, 3000];
for (let i = 0; i < arr4.length; i++) {
    let count = String(arr4[i]);
    if (count.includes(1) || count.includes(2) || count.includes(5)) {
        console.log(arr4[i]);
    }
}

const arr5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let result5 = arr5.join("-");
let result51 = "";
for (let i = 0; i < arr5.length; i++) {
    result51 += `${arr5[i]}-`
}

console.log(result51);

const nedelya = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
for (let i = 0; i < nedelya.length; i++) {
    if (i == 5 || i == 6) {
        console.log("\x1b[1m%s\x1b[0m", nedelya[i]);
        continue;
    }
    console.log(nedelya[i]);
}

const day = "Понедельник";
for (let i = 0; i < nedelya.length; i++) {
    if (nedelya[i] === day) {
        console.log("\x1b[1m%s\x1b[0m", nedelya[i]);
        continue;
    }
    console.log(nedelya[i]);
}

let n = 1000;
let num = 0;
while (n > 50) {
    num++;
    n = n / 2
}

console.log(num, n);

let a = 5;
let b = 5;
const sb = a * b;
console.log(sb.toFixed(2));

let userName = prompt("Введите имя");
alert(`Привет, ${userName}`);

let cel = prompt("Введите температура в цельсиях");
let faringate = cel * 1.8 + 32;
alert("Температура в фарингейтах " + faringate);  


const minMaxArr = [7, -3, 10, 23, -100, 0, 55];
let min = minMaxArr[0];
let max = minMaxArr[0];
for(let i = 0; i < minMaxArr.length; i++) {
    if(min < minMaxArr[i]) {
        min = minMaxArr[i];
    }
    if(max > minMaxArr[i]) {
        max = minMaxArr[i];
    }
}

console.log(min);
console.log(max);


const arr2423 = [1, 2, 3, 4, 5];
let s = arr2423[0];
for(let i = 0; i < arr2423.length; i++) {
    s *= arr2423[i]; 
}
console.log(s);


const world = {
    "Минск": "Беларусь",
    "Москва": "Россия",
    "Оттава": "Канада"
}

for(let i in world) {
    console.log(`${i} - это ${world[i]}`);
}

let randomNum = Math.random().toFixed(2) * 100;
let stepen = randomNum ** 5;
let koren = stepen / 2;
console.log(randomNum);
console.log(stepen);
console.log(koren);