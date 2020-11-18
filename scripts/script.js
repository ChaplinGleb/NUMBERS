/* 
СЛОЖНОСТЬ            ПОПЫТОК
Легко: 1-100         10
Средне: 1-1 000      15
Сложно: 1-10 000     20
Эксперт: 1-100 000   25
*/

const btnHits = document.getElementById('getHits');
const checkbox = document.getElementById('checkbox1');
const attempts = document.getElementById('attempts');
const input = document.getElementById('playInput');
const NoMoreAttempts = document.getElementById('NoMoreAttempts');
let numOfAttempts = 10;
let numOfDiff = '1';
let numOfHits = 1;
let arr = [1, 2, 3, 4, 5, 6];
let RandomNum, max

/* открытие и закрытие подсказок + плавное появление 2 блока */
$(function(){
   let j = 0
   $('#checkbox1').click(function(){
      if (j == 0){
         $('.setting').toggleClass('setting-full')
         setTimeout(function(){
            $('#hits-block').toggleClass('hits-block-full')
         }, 300)
         $('#getHits').toggleClass('play__btn-hit-show')
         $('#blockHits').toggleClass('play__hits-block_show')
         attempts.innerHTML = numOfAttempts - numOfHits
         j = 1
      }else{
         $('#hits-block').toggleClass('hits-block-full')
         setTimeout(function(){
            $('.setting').toggleClass('setting-full')
         }, 300)
         $('#getHits').toggleClass('play__btn-hit-show')
         $('#blockHits').toggleClass('play__hits-block_show')
         switch(numOfDiff){
            case '1':
               attempts.innerHTML = 10
               break;
            case '2':
               attempts.innerHTML = 15
               break;
            case '3':
               attempts.innerHTML = 20
               break;
            case '4':
               attempts.innerHTML = 25
               break;
         }
         j = 0
      }
   })
})

/* difficulty */
let all1 = document.querySelectorAll('.difficulty-block');
for (let a = 0; a < all1.length; a++){ 
   let radios = all1[a].querySelectorAll('.difficulty-block__input');
   let i = 1;
   all1[a].style.setProperty('--options',radios.length);
   radios.forEach((input)=>{
      input.setAttribute('data-pos',i);
      input.addEventListener('click',(e)=>{
         all1[a].style.setProperty('--options-active',e.target.getAttribute('data-pos'));
         numOfDiff = e.target.getAttribute('data-pos')
         
         switch(numOfDiff){
            case '1':
               numOfAttempts = 10
               if(checkbox.checked){
                  attempts.innerHTML = numOfAttempts - numOfHits
               }else(attempts.innerHTML = numOfAttempts)
               break;
            case '2':
               numOfAttempts = 15
               if(checkbox.checked){
                  attempts.innerHTML = numOfAttempts - numOfHits
               }else(attempts.innerHTML = numOfAttempts)
               break;
            case '3':
               numOfAttempts = 20
               if(checkbox.checked){
                  attempts.innerHTML = numOfAttempts - numOfHits
               }else(attempts.innerHTML = numOfAttempts)
               break;
            case '4':
               numOfAttempts = 25
               if(checkbox.checked){
                  attempts.innerHTML = numOfAttempts - numOfHits
               }else(attempts.innerHTML = numOfAttempts)
               break;
         }
         
      });
      i++;
   });
};

/* Hits */
let all2 = document.querySelectorAll('.hits-block');
for (let a = 0; a < all2.length; a++){ 
   let radios = all2[a].querySelectorAll('.hits-block__input');
   let i = 1;
   all2[a].style.setProperty('--options',radios.length);
   radios.forEach((input)=>{
      input.setAttribute('data-pos',i);
      input.addEventListener('click',(e)=>{
         all2[a].style.setProperty('--options-active',e.target.getAttribute('data-pos'));
         numOfHits = e.target.getAttribute('data-pos')
         btnHits.innerHTML = `Подсказка (${numOfHits} шт.)`
         attempts.innerHTML = numOfAttempts - numOfHits
      });
      i++;
   });
};

function start(){
   $('#setting').fadeOut()
   setTimeout(function(){
      $('#play').fadeIn()
   }, 500)
   let min = 1
   switch(numOfDiff){
      case '1':
         max = 100
         break;
      case '2':
         max = 1000
         break;
      case '3':
         max = 10000
         break;
      case '4':
         max = 100000
         break;
   }
   RandomNum = Math.floor(Math.random() * (max - min + 1)) + min
   console.log(RandomNum)
   NoMoreAttempts.innerHTML = attempts.innerHTML
}

function submit(){
   let b;
   if (input.value != '' && input.value != ' '){ 
      switch(true){
         case input.value > max:
            b = document.createElement("p");
            b.innerHTML = input.value + ' - ваше число вне диапазона, попробуйте меньше';
            document.querySelector('.play__box').prepend(b)
            break;
         case input.value > RandomNum:
            b = document.createElement("p");
            b.innerHTML = input.value + ' - загаданное число меньше';
            document.querySelector('.play__box').prepend(b)
            NoMoreAttempts.innerHTML -= 1
            break;
         case input.value < RandomNum:
            b = document.createElement("p");
            b.innerHTML = input.value + ' - загаданное число больше';
            document.querySelector('.play__box').prepend(b)
            NoMoreAttempts.innerHTML -= 1
            break;
         case input.value == RandomNum:
            b = document.createElement("p");
            b.innerHTML = input.value + ' вы угадали!';
            document.querySelector('.play__box').prepend(b)
            break;
      }
      if (NoMoreAttempts.innerHTML  == 0){
         b = document.createElement("p");
         b.innerHTML = `Вы проиграли. У вас закончились попытки и вы не отгадали число ${RandomNum}` ;
         document.querySelector('.play__box').prepend(b)
         let a = document.querySelector('.play__btn-submit')
         a.setAttribute('disabled', 'true')
         input.setAttribute('disabled', 'true')
         btnHits.setAttribute('disabled', 'true')
      }
      input.value = ''
   }
}


function getHits(){
   let b, a, num, num1, num2, num3, num4, result
   num = RandomNum
   if(btnHits.innerHTML == "Подсказка (1 шт.)"){
      btnHits.setAttribute('disabled', 'true')
      btnHits.innerHTML = 'Подсказок нет'
   }else{
      btnHits.innerHTML = `Подсказка (${--numOfHits} шт.)`
   }
   result = 0
   arr.sort(() => Math.random() - 0.6)
   console.log(arr[result])
   
   //1 - загаданное число в диапазлне между ___ и ____
   //2 - проверка на четность первой цифры
   //3 - есть ли в числе цифра 14524
   //4 - проверка на четность числа
   //5 - количество цифр
   //6 - сумма всех цифр

   
   switch(arr[result]){
      case 1:
         //загаданное число в диапазлне
         function range(max){
            num1 =  Math.floor(Math.random() * (max - 1)) + 1
            num2 = RandomNum - num1
            num2 = parseInt(num2).toLocaleString('ru-Ru')
            num1 =  Math.floor(Math.random() * (max - 1)) + 1
            num3 = RandomNum + num1
            num3 = parseInt(num3).toLocaleString('ru-Ru')
            return a = `Загаданное число больше ${num2} и меньше ${num3}`
         }
         switch(String(RandomNum).length){
            case 1:
               a = 'Загаданное число меньше 30'
               break;
            case 2:
               range(50)
               break;
            case 3:
               range(100)
               break;
            case 4:
               range(1000)
               break;
            case 5:
               range(10000)
               break;
         }
         b = document.createElement("p");
         b.innerHTML = a;
         document.querySelector('.play__hits-block').prepend(b)
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
         console.log(arr)
         break;
      case 2:
         //проверка на четность первой цифры
         a = String(RandomNum);
         a[0] % 2 == 0 ? a = 'четная' : a = 'нечетная';
         b = document.createElement("p");
         b.innerHTML = `Первая цифра ${a}`;
         document.querySelector('.play__hits-block').prepend(b)
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
         console.log(arr)
         break;
      case 3:
         //есть ли в числе цифра 14524
         b = document.createElement("p")
         function Random() {
            let r
            r = Math.floor(Math.random() * (9 - 0 + 1)) + 0
               if(String(RandomNum).includes(r)){
                  return result = `есть цифра ${r}`
               }
               return result = `нет цифры ${r}`
         }
      
         switch(String(RandomNum).length){
            case 2:
               num = Random()
               b.innerHTML = `В загаданном числе ${num}`;
               document.querySelector('.play__hits-block').prepend(b)
               break;
            case 3:
               num1 = Random()
               num2 = Random()
               while(num2 == num1){
                  num2 = Random()
               }
               b.innerHTML = `В загаданном числе ${num1} и ${num2}`;
               document.querySelector('.play__hits-block').prepend(b)
               break;
            case 4:
               num1 = Random()
               num2 = Random()
               while(num2 == num1){
                  num2 = Random()
               }
               num3 = Random()
               while(num3 == num2 || num3 == num1){
                  num3 = Random()
               }
               b.innerHTML = `В загаданном числе ${num1}, ${num2} и ${num3}`;
               document.querySelector('.play__hits-block').prepend(b)
               break;
            case 5:
               num1 = Random()
               num2 = Random()
               while(num2 == num1){
                  num2 = Random()
               }
               num3 = Random()
               while(num3 == num2 || num3 == num1){
                  num3 = Random()
               }
               num4 = Random()
               while(num4 == num3 || num4 == num2 || num4 == num1){
                  num4 = Random()
               }
               b.innerHTML = `В загаданном числе ${num1}, ${num2}, ${num3} и ${num4}`;
               document.querySelector('.play__hits-block').prepend(b)
               break;
         }
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
         console.log(arr)
         break;
      case 4:
         //проверка на четность числа
         RandomNum % 2 == 0 ? a = 'четное' : a = 'нечетное';
         b = document.createElement("p");
         b.innerHTML = `Загаданное число ${a}`;
         document.querySelector('.play__hits-block').prepend(b)
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
         console.log(arr)
         break;
      case 5:
         //Колличество цифр в числе
         switch(String(RandomNum).length){
            case 1:
               a = 'цифра'
               break;
            case 2:
            case 3:
            case 4:
               a = 'цифры'
               break;
            case 6:
            case 5:
               a = 'цифр'
               break;
         }
         b = document.createElement("p");
         b.innerHTML = `В числе ${String(RandomNum).length} ${a}`;
         document.querySelector('.play__hits-block').prepend(b)
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
         console.log(arr)
         break;
      case 6:
         //сумма всех цифр
         a = 0;
         while (num) {
            a += num % 10;
            num = Math.floor(num / 10);
         }
         b = document.createElement("p");
         b.innerHTML = `Сумма цифр в числе равна ${a}`;
         document.querySelector('.play__hits-block').prepend(b)
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
         console.log(arr)
         break;
   }
}
console.log(1 + ' - загаданное число в диапазлне' + '\r\n' + 2 + ' - проверка на четность первой цифры' + '\r\n' + 3 + ' - есть ли в числе цифра 14524' + '\r\n' + 4 + ' - проверка на четность числа' + '\r\n' + 5 + ' - количество цифр' + '\r\n' + 6 + ' - сумма всех цифр')