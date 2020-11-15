/* 
СЛОЖНОСТЬ            ПОПЫТОК
Легко: 1-100         10
Средне: 1-1 000      15
Сложно: 1-10 000     20
Эксперт: 1-100 000   25
*/

const btnHits = document.getElementById('getHits')




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
         j = 1
      }else{
         $('#hits-block').toggleClass('hits-block-full')
         setTimeout(function(){
            $('.setting').toggleClass('setting-full')
         }, 300)
         $('#getHits').toggleClass('play__btn-hit-show')
         $('#blockHits').toggleClass('play__hits-block_show')
         j = 0
      }
   })
   $('#start').click(function(){
      $('#setting').fadeOut()
      setTimeout(function(){
         $('#play').fadeIn()
      }, 500)
   })
})

/* difficulty */
let all1 = document.querySelectorAll('.difficulty-block');
let attempts = document.getElementById('attempts');
let numOfDiff
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
               attempts.innerHTML = "Попыток: 10" 
            break;
            case '2':
               attempts.innerHTML = "Попыток: 15" 
            break;
            case '3':
               attempts.innerHTML = "Попыток: 20" 
            break;
            case '4':
               attempts.innerHTML = "Попыток: 25" 
            break;
         }
      });
      i++;
   });
};


/* Hits */
let all2 = document.querySelectorAll('.hits-block');
let numOfHits
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
         
      });
      i++;
   });
};





function getHits(){
   if(btnHits.innerHTML == "Подсказка (1 шт.)"){
      btnHits.setAttribute('disabled', 'true')
      btnHits.innerHTML = 'Подсказок нет'
   }else{
      btnHits.innerHTML = `Подсказка (${--numOfHits} шт.)`
   }
}




/* let name = prompt("Введите свое имя")
while (name == null || name == "") {
   name = prompt(`Введите свое имя снова`)
}
do {
   numberOfInput = 1
   let NumMax = +prompt("Введите максимальное число, которое можно угадать")
      while (NumMax == null || NumMax == "") {
         NumMax = prompt(`Введите максимальное число, которое можно угадать еще раз`)
      }
      let NumRandom = Math.ceil(Math.random() * NumMax)
      console.log(NumRandom)
      alert(`Привет, ${name}! Программа загадала число от 0 до ${NumMax}. В конце, если ты отгадаешь я покажу тебе число попыток.`)
      input = +prompt("Какое число я загадал?")
      while (input == null || input == "") {
         input = prompt(`Введите еще раз число, которое я загадал`)
      }
      while (input != NumRandom) {
         if (input < NumRandom) {
            input = +prompt("Мало, попробуй еще")
            numberOfInput = ++numberOfInput;
         }
         else if (input > NumRandom) {
            input = +prompt("Много, попробуй еще")
            numberOfInput = ++numberOfInput;
         }
      }
      startEnd = confirm(`Ты отгадал, это число ${NumRandom}. Тебе потребовалось попыток - ${numberOfInput} Сыграть еще раз?`)
}
   while (startEnd == true) {
      alert("До свидания!")
   } */