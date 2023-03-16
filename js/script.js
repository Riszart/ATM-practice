const inputName = document.querySelector('.name-ower-cart')
const inputPassword = document.querySelector('.name-password-cart')

inputName.addEventListener('keypress', (event)=>{
  if((inputName.value + event.key).length <= 20){
    document.querySelector('.name-letter').innerText = inputName.value + event.key
  }
})

document.querySelector('.botton').addEventListener('click', ()=>{
  if(inputPassword.value == 1234 && inputName.value.length >=5 ){
    if(!localStorage["user"])create(inputName)
    if(document.querySelector(".name-ower-cart").value === localStorage["user"]){
      document.querySelector('.index').style.display = 'none'
      inputName.value = ""
      setTimeout(()=>{ window.open(`${window.location.pathname}html/principal.html`, "_self")}, 1000)
    }
  }
  else {
    inputPassword.style.border = 'solid 2px red'
    inputName.style.border = 'solid 2px red'
  }
})

function create(inputName){
  if(!localStorage["count01"]){
    localStorage.setItem("count01" , random())
  }
  if(!localStorage["count02"]){
    localStorage.setItem("count02" , random())
  }
  if(!localStorage["user"]){
    localStorage.setItem("user" , inputName.value)
  }
}
function random(){
  let a = Math.random()*100000
  return Math.floor(a)
}