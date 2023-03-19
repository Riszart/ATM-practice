const inputName = document.querySelector('.name-ower-cart')
const inputPassword = document.querySelector('.name-password-cart')

createElemntsLocal()
function createElemntsLocal(){
  if(localStorage.length === 0){
    alert('AUTOR: Tendras una oportunidad de agregar una cuenta con tu nombre para que se use como ejemplo')
    if(confirm('AUTOR: Deseas agregar una cuenta propia')){
      let name = prompt('AUTOR: ingrese su nombre')
      let passwordNumber = parseInt(prompt('AUTOR: ingrese una contraseña de 6 digitos solo numero del 0 - 9'))
      if(name === null){
        alert('AUTOR: Has cancelado')
        return
      }
      if(name == ''){
        alert('AUTOR: no ingresaste tu nombre, ACCION CANCELADA')
        return
      }
      if(passwordNumber === null){
        alert('AUTOR: Has cancelado')
        return
      }
      if(passwordNumber === ''){
        alert('AUTOR: no ingresaste la contraseña, ACCION CANCELADA')
        return
      }
      else{
        if(typeof passwordNumber === 'number'){
          localStorage.setItem('user03', JSON.stringify({
            countUser: name,
            id: 789456,
            password: passwordNumber,
            count01:{
              countBank: '987-6543210987',
              countBalance: random(),
            }
          }))
        }else{
          alert('AUTOR: la contraseña tiene letras, ACCION CANCELADA')
          return
        }
      }
    }
  }
  localStorage.setItem('user01', JSON.stringify({
    countUser: 'Kim Jisoo',
    id: 456123,
    password: 123456,
    count01:{
      countBank: '123-4567890123',
      countBalance: random(),
    },
    count02:{
      countBank: '321-1234567890',
      countBalance: random(),
    }
  }))
  localStorage.setItem('user02', JSON.stringify({
    countUser: 'Park Rose',
    id: 789123,
    password: 654321,
    count01:{
      countBank: '980-7060540321',
      countBalance: random(),
    }
  }))
}

verifyAccount()
function verifyAccount(){
  const arrayCount = []
  for(let i = 0; i < localStorage.length; i++){
    arrayCount.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
  console.log(arrayCount)
  inputName.addEventListener('keypress', (event)=>{
    if((inputName.value + event.key).length <= 20){
      document.querySelector('.name-letter').innerText = inputName.value + event.key
    }
  })
  document.querySelector('.botton').addEventListener('click', ()=>{
    if(inputPassword.value == 1234 && inputName.value.length >=5 ){
      if(!localStorage["user"])create(inputName)
      if(document.querySelector(".name-ower-cart").value === localStorage["user"]){
        inputName.value = ""
        if(window.location.pathname == '/index.html'){
          setTimeout(()=>{window.open(`/html/principal.html`, "_self")}, 1000)
        }else {
          setTimeout(()=>{window.open(`${window.location.pathname}/html/principal.html`, "_self")}, 1000)
        } 
      }
    }
    else {
      inputPassword.style.border = 'solid 2px red'
      inputName.style.border = 'solid 2px red'
    }
  })
}

function random(){
  let a = Math.random()*1000000
  return Math.floor(a)
}