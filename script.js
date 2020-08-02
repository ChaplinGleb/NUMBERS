numberOfInput = 0
let name = prompt("Введите свое имя")
while (name == null || name == "") {
   name = prompt(`Введите свое имя снова`)
}
do {
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
   }