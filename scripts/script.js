$(function(){
   let j = 0
   $('#checkbox1').click(function(){
      if (j == 0){
         $('.container').toggleClass('container-full')
         setTimeout(function(){
            $('#hits-block').toggleClass('hits-block-full')
         }, 300)
         j = 1
      }else{
            $('#hits-block').toggleClass('hits-block-full')
            setTimeout(function(){
               $('.container').toggleClass('container-full')
            }, 300)
            j = 0
      }
   })
})



let all = document.querySelectorAll('.difficulty-block');
for (let a = 0; a < all.length; a++){ 
    let radios = all[a].querySelectorAll('.difficulty-block__input');
    let i = 1;
    all[a].style.setProperty('--options',radios.length);
    radios.forEach((input)=>{
        input.setAttribute('data-pos',i);
        input.addEventListener('click',(e)=>{
            all[a].style.setProperty('--options-active',e.target.getAttribute('data-pos'));
        });
        i++;
    });
}; 






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