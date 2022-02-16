let adress = document.querySelectorAll('.adress')
let adressBinary = document.querySelectorAll('.adress-binary')
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

debugger;

//перевод адреса узла в двоичную систему
adressBinaryFn()


// вычисляет сетевой адрес по двоичному адресу узла и маске подсети
getNetBinary()


// кнопка "Новая проблема"
function generate(){
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
    adressBinaryFn()
    getNetBinary()
    clearInput()
}

generate()


// кнопка "проверить"
function func() {
    debugger;
    // let netAdressBinary = document.querySelectorAll('.net-adress-binary')
    // let netAdressDecimal = document.querySelectorAll('.net-adress-decimal')


    // let adressNetBinary = [] // сетевой адрес в двоичном формате    

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
    // let netAdressBinary = document.querySelectorAll('.net-adress-binary')
    // let netAdressDecimal = document.querySelectorAll('.net-adress-decimal')

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



//перевод адреса узла в двоичную систему
function adressBinaryFn(){
    debugger;
    // let adress = document.querySelectorAll('.adress')
    // let adressBinary = document.querySelectorAll('.adress-binary')
    // let adressArr = []  // адрес узла в двоичной системе

    for (let i = 0; i < adress.length; i++) {
        num = (Number(adress[i].innerHTML)).toString(2)
        adressBinary[i].innerHTML = binaryLength(num)
    
        //сохраняем в массив
        adressArr[i] = binaryLength(num)
    }
}

// вычисляет сетевой адрес по двоичному адресу узла и маске подсети
function getNetBinary(){
    debugger;
    // let adressBinary = document.querySelectorAll('.adress-binary')
    // let adressArr = []  // адрес узла в двоичной системе
    let adBin = '';
    // let adressNetBinary = [] // сетевой адрес в двоичном формате
    
    for (let i = 0; i < adressBinary.length; i++) {
        let ad = (adressArr[i]).split('')
        for (let y = 0; y < 8; y++) {
            if (i === 3) {
                adBin = adBin + ad[y] * 0 + ''
            } else {
                adBin = adBin + ad[y] * 1 + ''
            }
        }
        // сохраняем в массив
        adressNetBinary[i] = adBin
        adBin = ''
    }
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