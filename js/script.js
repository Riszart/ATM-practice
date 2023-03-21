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
          localStorage.setItem('789456', JSON.stringify({
            countUser: name,
            id: 789456,
            password: passwordNumber,
            count01:{
              countBank: '987-6543210987',
              countBalance: random(),
            },
            count02:{
              countBank: '654-1233210987',
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
  localStorage.setItem('456123', JSON.stringify({
    countUser: 'kim jisoo',
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
  localStorage.setItem('789123', JSON.stringify({
    countUser: 'park rose',
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
    if(typeof JSON.parse(localStorage.getItem(localStorage.key(i))) == 'object'){
    arrayCount.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
  }
  inputName.addEventListener('keypress', (event)=>{
    if((inputName.value + event.key).length <= 20){
      document.querySelector('.name-letter').innerText = inputName.value + event.key
    }
  })
  document.querySelector('.botton').addEventListener('click', ()=>{
    let selectUser = selectCount(inputName.value, inputPassword.value, arrayCount)
    if(selectUser[0]){
      localStorage.setItem('login', selectUser[1])
      if(window.location.pathname == '/index.html'){
        setTimeout(()=>{window.open(`/html/principal.html`, "_self")}, 1000)
      }
      else{
        setTimeout(()=>{window.open(`${window.location.pathname}/html/principal.html`, "_self")}, 1000)
      }
    }else{
      inputPassword.style.border = 'solid 2px red'
      inputName.style.border = 'solid 2px red'
      return 
    }

  })
}
function selectCount(name, password, options){
  console.log(options)
  for(let i of options){
    if(i.countUser === name){
      if(i.password == password){
        return [true, i.id]
      }
      else{
        return false
      }
    }
  }
  return false
}
function random(){
  let a = Math.random()*1000000
  return Math.floor(a)
}