let adress = document.querySelectorAll('.adress')
let adressBinary = document.querySelectorAll('.adress-binary')

let mask = document.querySelectorAll('.mask')
let maskBinary = document.querySelectorAll('.mask-binary')

let warning = document.querySelector('.warning')

let modalTrue = document.querySelector('.modal__true')
let modalFalse = document.querySelector('.modal__false')

let backdrop = document.querySelector('.backdrop')

let netAdressBinary = document.querySelectorAll('.net-adress-binary')
let netAdressDecimal = document.querySelectorAll('.net-adress-decimal')

let adressArr = []  // адрес узла в двоичной системе

let adBin = '';
let adressNetBinary = [] // сетевой адрес в двоичном формате

generate()

//сгенерировать адреса
// кнопка "Новая проблема"
function generate(){
    generateAdress()
    generateMask()
    maskBinaryFn()
    adressBinaryFn()
    getNetBinary()
    clearInput()
}



// кнопка "проверить"
function check() { 
    for(let i = 0; i < 4; i++){
        if(netAdressBinary[i].value === '' ||
            netAdressDecimal[i].value === ''){
            warning.classList.add('active')
            break;
        }else if(netAdressBinary[i].value != adressNetBinary[i] ||
            netAdressDecimal[i].value != parseInt(adressNetBinary[i], 2)){
            warning.classList.remove('active')
            modalFalse.classList.add('active')
            backdrop.classList.add('active')
            break;
        }else{
            warning.classList.remove('active')
            modalTrue.classList.add('active')
            backdrop.classList.add('active')
        }
    }

}

// Кнопка очистить
function clearInput(){
    for(let i =0; i < 4; i++){
        netAdressBinary[i].value = ''
        netAdressDecimal[i].value = ''
    }
}


// Кнопка ОК
function modalButtonClick(){
    modalTrue.classList.remove('active')
    modalFalse.classList.remove('active')
    backdrop.classList.remove('active')
}

// генерация маски подсети
function generateMask(){
    let a = [128, 192, 224, 240, 252, 254, 255]
    let b = [0, 224, 248, 192, 240, 252]

    let newMask = []

    for(let i = 0; i < 4; i++){
        if(i == 2){
            newMask[i] = a[randomInteger(0, a.length-1)];
        }else if(i == 3){
            newMask[i] = b[randomInteger(0, b.length-1)]
        }else{
            newMask[i] = 255
        }
        mask[i].innerHTML = newMask[i]
    }
}


//перевод маски подсети в двоичную систему
function maskBinaryFn(){
    for (let i = 0; i < mask.length; i++) {
        num = getBinary(Number(mask[i].innerHTML))
        maskBinary[i].innerHTML = num
        //сохраняем в массив
        // adressArr[i] = num
    }
}



// генерация адреса узла
function generateAdress(){
    let arrAdressOne = [10, 172]
    let newAdress= []
    newAdress[0] = arrAdressOne[randomInteger(0,1)]
    adress[0].innerHTML = newAdress[0]

    if(newAdress[0] == 10){
        for(let i = 1; i < 4; i++){
            newAdress[i] = randomInteger(0, 255)
            adress[i].innerHTML = newAdress[i]
        }
    }else if(newAdress[0] == 172){
        newAdress[1] = 16;
        adress[1].innerHTML = newAdress[1]
        for(let i = 2; i < 4; i++){
            newAdress[i] = randomInteger(0, 255)
            adress[i].innerHTML = newAdress[i]
        }
    }
}



//перевод адреса узла в двоичную систему
function adressBinaryFn(){
    for (let i = 0; i < adress.length; i++) {
        num = getBinary(Number(adress[i].innerHTML))
        adressBinary[i].innerHTML = num
        //сохраняем в массив
        adressArr[i] = num
    }
}

// вычисляет сетевой адрес по двоичному адресу узла и маске подсети
function getNetBinary(){
    for(let i = 0; i< adressBinary.length; i++){
        let adBin = (adressArr[i]).split('')
        let maskBin = (maskBinary[i].innerHTML).split('')
        let adNetBin = []; 

        for(let y = 0; y < adBin.length; y++){
            adNetBin[y] = adBin[y] * maskBin[y]
        }
        adressNetBinary[i] = adNetBin.join('')
    }
}


// Перевод числа в двоичную систему
function getBinary(a){
    a = binaryLength(a.toString(2)) 
    return a;
}


function binaryLength(num) {
    while (num.length < 8) {
        num = '0' + num
    }
    return num
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }