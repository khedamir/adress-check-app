let adress = document.querySelectorAll('.adress')
let adressBinary = document.querySelectorAll('.adress-binary')
let maskBinary = document.querySelectorAll('.mask-binary')
let elResult = document.querySelector('#result')


let result = "Ответ правильный"   //вывод ответа
let adressArr = []  // адрес узла в двоичной системе
let adBin = '';
let adressNetBinary = [] // сетевой адрес в двоичном формате


let arrAdressOne = [10, 172]

function generate(){
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
}

generate()


//перевод адреса узла в двоичную систему
function adressBinaryFn(){
    for (let i = 0; i < adress.length; i++) {
        num = (Number(adress[i].innerHTML)).toString(2)
        adressBinary[i].innerHTML = binaryLength(num)
    
        //сохраняем в массив
        adressArr[i] = binaryLength(num)
    }
}

adressBinaryFn()





// вычисляет сетевой адрес по двоичному адресу узла и маске подсети
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
    adressNetBinary.push(adBin)
    adBin = ''
}
console.log(adressNetBinary)


// проверка на правильность введенных значений 'кнопка "проверить"'
function func() {
    let result = "Ответ правильный"   //вывод ответа
    let netAdressBinary = document.querySelectorAll('.net-adress-binary')
    let netAdressDecimal = document.querySelectorAll('.net-adress-decimal')

    for(let i = 0; i < 4; i++){
        if(netAdressBinary[i].value === '' ||
            netAdressDecimal[i].value === ''){
            result = 'Заполните поля';
            break;
        }else if(netAdressBinary[i].value != adressNetBinary[i] ||
            netAdressDecimal[i].value != parseInt(adressNetBinary[i], 2)){
            result = "Ответ не верный";
            break;
        }
    }

    elResult.innerHTML = result;
}


function clearInput(){
    let netAdressBinary = document.querySelectorAll('.net-adress-binary')
    let netAdressDecimal = document.querySelectorAll('.net-adress-decimal')

    for(let i =0; i < 4; i++){
        netAdressBinary[i].value = ''
        netAdressDecimal[i].value = ''
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