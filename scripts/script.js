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
let numOfAttempts = 10;
let numOfDiff = '1';
let numOfHits = 1;
let InputAttempts = 0;
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
   /* $('#setting').fadeOut()
   setTimeout(function(){
      $('#play').fadeIn()
   }, 500) */
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
   console.log(max)
   console.log(RandomNum)
}

function submit(){
   if (input.value != '' && input.value != ' '){
      let b;
      switch(true){
         case input.value > max:
            b = document.createElement("p");
            b.innerHTML = input.value + ' - ваше число вне диапазона, попробуйте меньше';
            document.querySelector('.play__box').prepend(b)
            InputAttempts++
            break;
         case input.value > RandomNum:
            b = document.createElement("p");
            b.innerHTML = input.value + ' - загаданное число меньше';
            document.querySelector('.play__box').prepend(b)
            InputAttempts++
            break;
         case input.value < RandomNum:
            b = document.createElement("p");
            b.innerHTML = input.value + ' - загаданное число больше';
            document.querySelector('.play__box').prepend(b)
            InputAttempts++
            break;
         case input.value == RandomNum:
            b = document.createElement("p");
            b.innerHTML = input.value + ' вы угадали!';
            document.querySelector('.play__box').prepend(b)
            break;
      }
      if (InputAttempts >= attempts.innerHTML){
         b = document.createElement("p");
         b.innerHTML = 'у вас закончились попытки';
         document.querySelector('.play__box').prepend(b)
         let a = document.querySelector('.play__btn-submit')
         a.setAttribute('disabled', 'true')
         input.setAttribute('disabled', 'true')
      }
      input.value = ''
   }
}

let arr = [1,2,3,4,5,6]
function getHits(){
   let b, hit1, hit2, hit3, hit4, hit6, result
   if(btnHits.innerHTML == "Подсказка (1 шт.)"){
      //btnHits.setAttribute('disabled', 'true')
      btnHits.innerHTML = 'Подсказок нет'
   }else{
      btnHits.innerHTML = `Подсказка (${--numOfHits} шт.)`
   }
   result = Math.floor(Math.random() * arr.length)
   switch(arr[result]){
      case 6:
         /* сумма всех цифр */
         hit2 = 0;
         while (RandomNum > 0) {
            hit2 += RandomNum % 10
            RandomNum = Math.floor(RandomNum/10)
         }
         b = document.createElement("p");
         b.innerHTML = `Сумма цифр в числе равна ${hit2}`;
         document.querySelector('.play__hits-block').prepend(b)
         console.log(arr)
         arr.splice(result, 1)
         console.log(arr)
         break;
      case 1:
         /* произведение всех цифр */
         hit3 = 1;
         while (RandomNum > 0) {
            hit3 *= RandomNum % 10
            RandomNum = Math.floor(RandomNum/10)
         }
         b = document.createElement("p");
         b.innerHTML = `Произведение цифр в числе равна ${hit3}`;
         document.querySelector('.play__hits-block').prepend(b)
         console.log(arr)
         arr.splice(result, 1)
         console.log(arr)
         break;
      case 2:
         /* проверка на четность первой цифры */
         hit4 = String(RandomNum);
         hit4[0] % 2 == 0 ? hit4 = 'четное' : hit4 = 'нечетное';
         b = document.createElement("p");
         b.innerHTML = `Первая цифра ${hit4}`;
         document.querySelector('.play__hits-block').prepend(b)
         console.log(arr)
         arr.splice(result, 1)
         console.log(arr)
         break;
      case 3:
         /* есть ли в числе цифра 14524 */
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
         console.log(arr)
         arr.splice(result, 1)
         console.log(arr)
         break;
      case 4:
         /* проверка на четность числа */
         RandomNum % 2 == 0 ? hit1 = 'четное' : hit1 = 'нечетное';
         b = document.createElement("p");
         b.innerHTML = `Загаданное число ${hit1}`;
         document.querySelector('.play__hits-block').prepend(b)
         console.log(arr)
         arr.splice(result, 1)
         console.log(arr)
         break;
      case 5:
         /* Последне число четное/нечетное */
         hit6 = String(RandomNum);
         (hit6.length - 1) % 2 == 0 ? hit6 = 'четная' : hit6 = 'нечетная';
         b = document.createElement("p");
         b.innerHTML = `Последняя цифра ${hit6}`;
         document.querySelector('.play__hits-block').prepend(b)
         console.log(arr)
         arr.splice(result, 1)
         console.log(arr)
         break;
   }

}
