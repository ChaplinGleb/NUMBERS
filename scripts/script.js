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
let RandomNum, max, r


$(function(){
   setTimeout(function(){
      $('.setting').animate({
         opacity: 1,
      }, 500)
   }, 300)
   

   let j = 0
   //показать/скрыть блок подсказок
   $('#checkbox1').click(function(){
      if (j == 0){
         //показать блок подсказок
         $('.setting').toggleClass('setting-full')
         setTimeout(function(){
            $('#hits-block').toggleClass('hits-block-show')
         }, 300)
         $('#getHits').toggleClass('play__btn-hit-show')
         $('#blockHits').toggleClass('play__hits-block_show')
         attempts.innerHTML = numOfAttempts - numOfHits
         j = 1
      }else{
         //скрыть блок подсказок
         $('#hits-block').toggleClass('hits-block-show')
         setTimeout(function(){
            $('.setting').toggleClass('setting-full')
         }, 300)
         $('#getHits').toggleClass('play__btn-hit-show')
         $('#blockHits').toggleClass('play__hits-block_show')
         //возврат попыток без подсказок
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
               attempts.innerHTML = 20
               break;
         }
         j = 0
      }
   })

   // кнопка ENTER
   $('#playInput').keyup(function(event){
      if (event.keyCode === 13) {
          $("#btn-submit").click();
      }
   });

   //игрыть заново
   $('.restart').click(function(){
      $('#play').fadeOut()
      $('.past-block').fadeOut()
      $('.past-block-bg').fadeOut()
      setTimeout(function(){
         window.location.reload()
      }, 350)
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

         function attemptsOfDiff(num){
            numOfAttempts = num
            if(checkbox.checked){
               attempts.innerHTML = numOfAttempts - numOfHits
            }else(attempts.innerHTML = numOfAttempts)
         }

         switch(numOfDiff){
            case '1':
               attemptsOfDiff(10)
               break;
            case '2':
               attemptsOfDiff(15)
               break;
            case '3':
               attemptsOfDiff(20)
               break;
            case '4':
               attemptsOfDiff(20)
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
         r = Number(numOfHits)
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
         max = 1000000
         break;
   }
   RandomNum = Math.floor(Math.random() * (max - min + 1)) + min
   console.log(RandomNum)
   NoMoreAttempts.innerHTML = attempts.innerHTML
   $('.past-block__random-number').html(RandomNum.toLocaleString('ru-Ru')) 
   
}

function submit(){
   let b, a, c;

   function addAttempt(inner2){
      b = document.createElement("p");
      b.className = "play__box_item";
      b.innerHTML = parseInt(input.value).toLocaleString('ru-Ru') + inner2;
      document.querySelector('.play__box').prepend(b)
   }

   //сравнение вводимого с загаданным числом
   if (input.value != '' && input.value != ' '){ 
      NoMoreAttempts.innerHTML -= 1
      switch(true){
         //угадал
         case input.value == RandomNum:
            $("#win-block").fadeIn(600)
            $(".past-block-bg").fadeIn(600)
            a = attempts.innerHTML - NoMoreAttempts.innerHTML 
            switch(true){
               case a == 1 || a == 21:
                  c = `потребовалась ${a} попытка`
                  break;
               case a >=2 && a <= 4 || a >= 22 && a <= 24:
                  c = `потребовалось ${a} попытки`
                  break;
               case a == 0 || a >= 5 && a <= 20:
                  c = `потребовалось ${a} попыток`
                  break;
            }
            document.querySelector('.past-block__attempts').innerHTML = `Для этого тебе ${c}`;
            break;
            
         //не угадал
         case NoMoreAttempts.innerHTML == '0':
            input.setAttribute('disabled', 'true')
            $("#game-over-block").fadeIn(600)
            $(".past-block-bg").fadeIn(600)
            $(".past-block__random-number").toggleClass("past-block__random-number-lose")
            break;
         
         //вводимое число больше максимально возможного загаданного числа
         case input.value > max:
            a = input.value
            a.replace(/\s/g, '')
            a.toLocaleString('ru-Ru')
            addAttempt(` - ваше число вне диапазона. Загаданное число больше 0 и меньше ${max}`)
            break;
         
         //вводимое число больше загаданного
         case input.value > RandomNum:
            addAttempt(' - загаданное число меньше')
            break;
         
         //вводимое число меньше загаданного
         case input.value < RandomNum:
            addAttempt(' - загаданное число больше')
            break;
      }
      input.value = ''
   }
}

function getHits(){
   let b, a, num, num1, num2, num3, num4, num5, result = 0
   num = RandomNum
   if(btnHits.innerHTML == "Подсказка (1 шт.)"){
      --r
      btnHits.setAttribute('disabled', 'true')
      btnHits.innerHTML = 'Подсказок нет'
   }else{
      btnHits.innerHTML = `Подсказка (${--r} шт.)`
   }
   arr.sort(() => Math.random() - 0.6)

   function createAndPrepend(inner){
         b = document.createElement("p");
         b.className = "play__box_item";
         b.innerHTML = inner;
         document.querySelector('.play__hits-block').prepend(b)
         arr.splice(result, 1)
         arr.sort(() => Math.random() - 0.5)
   }
   
   switch(arr[result]){
      //загаданное число больше N и меньше N 
      case 1:
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
            case 6:
               range(100000)
               break;
         }
         createAndPrepend(a)
         break;
      
      //первая цифра четная/не четная
      case 2:
         a = String(RandomNum);
         a[0] % 2 == 0 ? a = 'четная' : a = 'нечетная';
         createAndPrepend(`Первая цифра ${a}`)
         break;
      
      //есть ли в числе цифра 14524
      case 3:
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
               createAndPrepend(`В загаданном числе ${num}`)
               break;
            case 3:
               num1 = Random()
               num2 = Random()
               while(num2 == num1){
                  num2 = Random()
               }
               createAndPrepend(`В загаданном числе ${num1} и ${num2}`)
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
               createAndPrepend(`В загаданном числе ${num1}, ${num2} и ${num3}`)
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
               createAndPrepend(`В загаданном числе ${num1}, ${num2}, ${num3} и ${num4}`)
               break;
            case 6:
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
               num5 = Random()
               while(num5 == num4 || num5 == num3 || num5 == num2 || num5 == num1){
                  num5 = Random()
               }
               createAndPrepend(`В загаданном числе ${num1}, ${num2}, ${num3}, ${num4} и ${num5}`)
               break;
         }
         break;
      
      //загаданное число четная/не четная
      case 4:
         RandomNum % 2 == 0 ? a = 'четное' : a = 'нечетное';
         createAndPrepend(`Загаданное число ${a}`)
         break;
      
      //В числе N цифр
      case 5:
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
         createAndPrepend(`В числе ${String(RandomNum).length} ${a}`)
         break;
      
      //сумма цифр в числе равна
      case 6:
         a = 0;
         while (num) {
            a += num % 10;
            num = Math.floor(num / 10);
         }
         createAndPrepend(`Сумма цифр в числе равна ${a}`)
         break;
   }
}

function surrender(){
   NoMoreAttempts.innerHTML = 0
   $("#game-over-block").fadeIn(600)
   $(".past-block-bg").fadeIn(600)
}