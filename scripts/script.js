const btnhints = document.getElementById('gethints');


const checkbox = document.getElementById('checkbox1');
const input = document.getElementById('playInput');
let NumberOfHints = document.getElementById('NumberOfHints');
let NoMoreAttempts = document.getElementById('NoMoreAttempts');
let attempts = document.getElementById('attempts');
let numOfAttempts = 10;
let numOfDiff = '1';
let arr = [1, 2, 3, 4, 5, 6];
let RandomNum, max, r, i;
let languagesCheck = 1



$(function(){
   // появление блока first-block
   setTimeout(function(){
      $('.first-block').animate({opacity: 1}, 500)
   }, 300)
   
   // кнопка ENTER
   $('#playInput').keyup(function(event){
      if (event.keyCode === 13) {
          $("#btn-submit").click();
      }
   });
})

// radio-block diff
let all2 = document.querySelectorAll('.first-block__diff');
for (let a = 0; a < all2.length; a++){ 
   let radios = all2[a].querySelectorAll('.first-block__diff>span>input');
   i = 1;
   all2[a].style.setProperty('--options',radios.length);
   radios.forEach((input)=>{
      input.setAttribute('data-pos',i);
      input.addEventListener('click',(e)=>{
         all2[a].style.setProperty('--options-active',e.target.getAttribute('data-pos'));
         numOfDiff = e.target.getAttribute('data-pos')

         function attemptsOfDiff(num){
            numOfAttempts = num
            if(checkbox.checked){
               attempts.innerHTML = numOfAttempts - NumberOfHints.innerHTML
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

// radio-block hints
let all3 = document.querySelectorAll('.first-block__hints');
for (let a = 0; a < all3.length; a++){ 
   let radios = all3[a].querySelectorAll('.first-block__hints>span>input');
   i = 1;
   all3[a].style.setProperty('--options',radios.length);
   radios.forEach((input)=>{
      input.setAttribute('data-pos',i);
      input.addEventListener('click',(e)=>{
         all3[a].style.setProperty('--options-active',e.target.getAttribute('data-pos'));
         NumberOfHints.innerHTML = e.target.getAttribute('data-pos')
         r = Number(NumberOfHints.innerHTML)
         attempts.innerHTML = numOfAttempts - NumberOfHints.innerHTML
      });
      i++;
   });
};

// radio-block lang
let all1 = document.querySelectorAll('.setting__lang');
for (let a = 0; a < all1.length; a++){ 
   let radios = all1[a].querySelectorAll('.setting__lang>span>input');
   i = 1;
   all1[a].style.setProperty('--options', radios.length);
   radios.forEach((input)=>{
      input.setAttribute('data-pos',i);
      input.addEventListener('click',(e)=>{
         all1[a].style.setProperty('--options-active', e.target.getAttribute('data-pos'));
         
         // change language text 
         languagesCheck = e.target.getAttribute('data-pos')
         console.log(languagesCheck)
         if (languagesCheck == 1){
            $('.language-rus').css({'display' : 'block'})
            $('.language-eng').css({'display' : 'none'})
            $('.block-check').css({'left' : '120px'})
            document.querySelector('.subtitle:nth-child(1)').innerHTML = 'Осталось попыток <span id="NoMoreAttempts"></span>'
            document.querySelector('.subtitle:nth-child(10)').innerHTML = `Попытки <span id="attempts">${attempts.innerHTML}</span>`
            attempts = document.getElementById('attempts');
            $('button:contains("Play")').text('Играть')
            $('#playInput').attr("placeholder", "Твои преположения")
            btnhints.innerHTML = 'Подсказка (<span id="NumberOfHints">1</span> шт.)'
            $('button:contains("Give up")').text('Сдаться')
            $('button:contains("Restart")').text('Начать заново')
         }else{
            $('.language-eng').css({'display' : 'block'})
            $('.language-rus').css({'display' : 'none'})
            $('.block-check').css({'left' : '67px'})
            document.querySelector('.subtitle:nth-child(1)').innerHTML = 'Attempts left <span id="NoMoreAttempts"></span>'
            document.querySelector('.subtitle:nth-child(10)').innerHTML = `Attempts <span id="attempts">${attempts.innerHTML}</span>`
            attempts = document.getElementById('attempts');
            $('button:contains("Играть")').text('Play')
            $('#playInput').attr("placeholder", "Your assumptions")
            btnhints.innerHTML = 'Hints left <span id="NumberOfHints">1</span>'
            $('button:contains("Сдаться")').text('Give up')
            $('button:contains("Начать заново")').text('Restart')
         }
      })
      i++
   })
}

function openSetting() {
   $(".pop-bg").fadeIn()
   $(".setting").fadeIn()
}

function closeSetting(){
   $(".pop-bg").fadeOut()
   $(".setting").fadeOut()
}

function checkboxCheck(){
   if (checkbox.checked){
      //показать блок подсказок
      $('.first-block').toggleClass('first-block__full-size')
      setTimeout(function(){
         $('.first-block__hints').toggleClass('first-block__hints-show')
      }, 300)
      $('.second-block__btn-hint').css({'display' : 'block'})
      $('.second-block__box:nth-child(6)').css({'display' : 'block'})
      attempts.innerHTML = numOfAttempts - NumberOfHints.innerHTML
   }else{
      //скрыть блок подсказок
      $('.first-block__hints').toggleClass('first-block__hints-show')
      setTimeout(function(){
         $('.first-block').toggleClass('first-block__full-size')
      }, 300)
      $('.second-block__btn-hint').css({'display' : 'none'})
      $('.second-block__box:nth-child(6)').css({'display' : 'none'})
      
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
   }
}

function start(){
   $('.first-block').fadeOut()
   setTimeout(function(){
      $('.second-block').fadeIn()
   }, 500)
   
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
   RandomNum = Math.floor(Math.random() * (max - 1 + 1)) + 1
   console.log(RandomNum)
   NoMoreAttempts = document.getElementById('NoMoreAttempts')
   NoMoreAttempts.innerHTML = attempts.innerHTML
   NumberOfHints = document.getElementById('NumberOfHints');
   if (r != undefined){
      NumberOfHints.innerHTML = r
   }else {
      NumberOfHints.innerHTML = 1
   }
}

function submit(){
   let b, a;

   function addAttempt(inner2){
      b = document.createElement("p");
      b.className = "second-block__box_item";
      b.innerHTML = parseInt(input.value).toLocaleString('ru-Ru') + inner2;
      document.querySelector('.second-block__box').prepend(b)
   }

   //сравнение вводимого с загаданным числом
   if (input.value != '' && input.value != ' '){ 
      NoMoreAttempts.innerHTML -= 1
      switch(true){
         //угадал
         case input.value == RandomNum:
            $('.pop-block__random-number').html(RandomNum.toLocaleString('ru-Ru')) 
            $("#win-block").fadeIn()
            $(".pop-bg").fadeIn()
            a = attempts.innerHTML - NoMoreAttempts.innerHTML 
            break;

         //не угадал
         case NoMoreAttempts.innerHTML == '0':
            input.setAttribute('disabled', 'true')
            $('.pop-block__random-number').html(RandomNum.toLocaleString('ru-Ru')) 
            $("#game-over-block").fadeIn()
            $(".pop-bg").fadeIn()
            break;
         
         //вводимое число больше максимально возможного загаданного числа
         case input.value > max:
            a = input.value
            a.replace(/\s/g, '')
            a.toLocaleString('ru-Ru')
            if (languagesCheck == 1){
               addAttempt(` - ваше число вне диапазона. Загаданное число больше 0 и меньше ${max}`)
            }else{addAttempt(` - your number is out of range. The hidden number is greater than 0 and less than ${max}`)}
            break;
         
         //вводимое число больше загаданного
         case input.value > RandomNum:
            if (languagesCheck == 1){
               addAttempt(' - загаданное число меньше')
            }else{addAttempt(' - the hidden number is less')}
            break;
         
         //вводимое число меньше загаданного
         case input.value < RandomNum:
            if (languagesCheck == 1){
               addAttempt(' - загаданное число больше')
            }else{addAttempt(' - the hidden number is greater')}
            break;
      }
      input.value = ''
   }
}

function gethints(){
   let b, a, num, num1, num2, num3, num4, num5, result = 0
   num = RandomNum

   if (NumberOfHints.innerHTML == 1){
      --r
      btnhints.setAttribute('disabled', 'true')
      if (languagesCheck == 1){
         btnhints.innerHTML = 'Подсказок нет'
      }else{btnhints.innerHTML = 'No hints'}
   }else{
      NumberOfHints.innerHTML = --r
   }

   arr.sort(() => Math.random() - 0.6)

   function createAndPrepend(inner){
         b = document.createElement("p");
         b.className = "second-block__box_item";
         b.innerHTML = inner;
         document.querySelector('.second-block__box:nth-child(6)').prepend(b)
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
            if (languagesCheck == 1){
               a = `Загаданное число больше ${num2} и меньше ${num3}`
            }else{a = `The hidden number is greater than ${num2} and less than ${num3}`}
            return a
         }
         switch(String(RandomNum).length){
            case 1:
               if (languagesCheck == 1){a = 'Загаданное число меньше 30'
               }else{a = 'The hidden number is less than 30'}
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
         if (a[0] % 2 == 0){
            if (languagesCheck == 1){
               a = 'четная'
            }else{
               a = 'even'
            }
         }else{
            if (languagesCheck == 1){
               a = 'нечетная'
            }else{
               a = 'odd'
            }
         }
         if (languagesCheck == 1){
            createAndPrepend(`Первая цифра ${a}`)
         }else{
            createAndPrepend(`The first digit is ${a}`)
         }
         break;
      
      //есть ли в числе цифра 14524
      case 3:
         function Random() {
            let r = Math.floor(Math.random() * (9 - 0 + 1)) + 0
            if(String(RandomNum).includes(r)){
               if (languagesCheck == 1){
                  result = `есть цифра ${r}`
               }else{result = `there is ${r}`}
               return result
            }
            if (languagesCheck == 1){
               result = `нет цифры ${r}`
            }else{result = `there isn't ${r}`}
            return result
         }
         switch(String(RandomNum).length){
            case 2:
               num = Random()
               if (languagesCheck == 1){
                  createAndPrepend(`В загаданном числе ${num}`)
               }else{createAndPrepend(`In the number ${num}`)}
               break;
            case 3:
               num1 = Random()
               num2 = Random()
               while(num2 == num1){
                  num2 = Random()
               }
               if (languagesCheck == 1){
                  createAndPrepend(`В загаданном числе ${num1} и ${num2}`)
               }else{createAndPrepend(`In the number ${num1} and ${num2}`)}
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
               if (languagesCheck == 1){
                  createAndPrepend(`В загаданном числе ${num1}, ${num2} и ${num3}`)
               }else{createAndPrepend(`In the number ${num1}, ${num2} and ${num3}`)}
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
               if (languagesCheck == 1){
                  createAndPrepend(`В загаданном числе ${num1}, ${num2}, ${num3} и ${num4}`)
               }else{createAndPrepend(`In the number ${num1}, ${num2}, ${num3} and ${num4}`)}
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
               if (languagesCheck == 1){
                  createAndPrepend(`В загаданном числе ${num1}, ${num2}, ${num3}, ${num4} и ${num5}`)
               }else{createAndPrepend(`In the number ${num1}, ${num2}, ${num3}, ${num4} and ${num5}`)}
               break;
         }
         break;
      
      //загаданное число четная/не четная
      case 4:
         if (RandomNum % 2 == 0){
            if (languagesCheck == 1){
               a = 'четное'
            }else{
               a = 'even'
            }
         }else{
            if (languagesCheck == 1){
               a = 'нечетное'
            }else{
               a = 'odd'
            }
         }
         if (languagesCheck == 1){
            createAndPrepend(`Загаданное число ${a}`)
         }else{
            createAndPrepend(`The hidden number is ${a}`)
         }
         break;
      
      //В числе N цифр
      case 5:
         if (languagesCheck == 1){
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
         }else{
            createAndPrepend(`In the hidden number ${String(RandomNum).length} digits`)
         }
         break;
      
      //сумма цифр в числе равна
      case 6:
         a = 0;
         while (num) {
            a += num % 10;
            num = Math.floor(num / 10);
         }
         if (languagesCheck == 1){
            createAndPrepend(`Сумма цифр в числе равна ${a}`)
         }else{createAndPrepend(`The sum of the digits in the number is equal to ${a}`)}
         break;
   }
}

function surrender(){
   NoMoreAttempts.innerHTML = 0
   $("#game-over-block").fadeIn()
   $(".pop-bg").fadeIn()
   $('.pop-block__random-number').text(RandomNum.toLocaleString('ru-Ru'))
}

function restart(){
   $('.second-block').fadeOut()
   $('.pop-block').fadeOut()
   $('.pop-bg').fadeOut()
   setTimeout(function(){
      window.location.reload()
   }, 350)
}