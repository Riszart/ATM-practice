document.querySelector('.recharge').addEventListener('click', ()=>changePage('rechange'))
document.querySelector('.pay').addEventListener('click', ()=>changePage('pay'))
document.querySelector('.transactions').addEventListener('click', ()=>changePage('transactions'))
document.querySelector('.other').addEventListener('click', ()=>changePage('other'))

document.querySelector('.widthdraw').addEventListener('click', ()=>changePage('withdraw'))
document.querySelector('.question').addEventListener('click', ()=>changePage('question'))
document.querySelector('.transfer').addEventListener('click', ()=>changePage('transfer'))
document.querySelector('.deposit').addEventListener('click', ()=>changePage('deposit'))


function ckecked(side, page){
const count01 = document.querySelector(`.${page}-count__one-input`)
const count02 = document.querySelector(`.${page}-count__two-input`)
const count01Container = document.querySelector(`.${page}-count__one`)
const count02Container = document.querySelector(`.${page}-count__two`)
  if(side === 'count01'){
    count01.checked = true
    count02.checked = false
    count01Container.style.backgroundColor = '#316966'
    count02Container.style.backgroundColor = '#ff8c00'
    balance('.money-count', "count01")
  }else if(side === 'count02'){
    count01.checked = false
    count02.checked = true
    count02Container.style.backgroundColor = '#316966'
    count01Container.style.backgroundColor = '#ff8c00'
    balance('.money-count', "count02")
  }
return side
}

function balance(classcount, selectCount){
  const array = document.querySelectorAll(classcount)
  for(let item of array){
    item.innerText = localStorage.getItem(selectCount)
  }
}

balance('.name-count', "user")

function changePage(page){
  if(page == 'rechange' || page == 'pay'|| page == 'other' || page == 'question'){
    document.querySelector('.name-page-undefined').innerText = page
    let error = document.querySelector('.undefined-content')
    error.style.display  = "block"
    setTimeout(()=>error.style.display = "none", 2000)
    return
  }
  document.querySelector('.principal').style.display = "none"
  document.querySelector(`.${page}-container`).style.display = "block"
  operation(page)
}

function operation(page){
  document.querySelector(`.${page}-count__one`,'count01').addEventListener('click', ()=>countUser = ckecked('count01', page))
  document.querySelector(`.${page}-count__two`,'count01').addEventListener('click', ()=>countUser = ckecked('count02', page))
  let countUser
  let availableBalance
  let money
  let result
  document.querySelector(`.botton-send__${page}`).addEventListener('click', ()=>{
    if(countUser != undefined){
      money = Number(document.querySelector(`.input__${page}`).value)
      console.log(money)
      availableBalance = Number(localStorage.getItem(countUser))
      if(page === 'deposit' && money <= 10000 && money >= 10){
        result = availableBalance + money
      }else if(page === 'withdraw' && money <= 10000 && money >= 100){
        result = availableBalance - money
      }else if(page === 'transfer' && money <= availableBalance && money <= 100000 && money >= 10){
        const countTranferOther = document.querySelector('.input__transfer-count')
        if(countTranferOther.value.length == 8){
          countTranferOther.style.border = "solid 1px #0defee"
          result = availableBalance - money
        }else{
          countTranferOther.style.border = "solid 1px red"
          return
        }
      }else if(page === 'transactions' && money <= availableBalance){
        let secondCount
        if(countUser === 'count01')secondCount = 'count02'
        else if(countUser === 'count02') secondCount = 'count01'
        result = availableBalance - money
        localStorage.setItem(secondCount, money + Number(localStorage.getItem(secondCount)))
      }else {
        errorAction(page)
        return
      }
      localStorage.setItem(countUser, result)
      endAction(page, countUser)
    }else {
      showMessaje(page, "seleccione un cuenta para realizar la operacion")
    }
  })
  document.querySelector(`.botton-cancel__${page}`).addEventListener('click', ()=>{
    window.location.reload()
  })
}
function endAction(page, countUser){
  balance('.money-count', countUser)
  document.querySelector(`.input__${page}`).value = ""
  if(document.querySelector(`.input__${page}-count`) != undefined){
    document.querySelector(`.input__${page}-count`).value = ""
  }
}
function errorAction(page){
  let messaje
  if(page === 'deposit'){
    messaje = `deposito mayor a 10,00.00 en ajente`
  }else if(page === 'withdraw'){
    messaje = `retiro aceptado mayor a 10.00 y menor de 10,00.00`
  }else if(page === 'transfer'){
    messaje = `monto mayor a 100 y menor 100,000.00`
  }else if(page === 'transactions'){
    messaje = `no tiene el monto disponible`
  }
  showMessaje(page, messaje)
}
function showMessaje(page, messaje){
  const pageShow = document.querySelector(`.${page}-content`)
  const div = document.createElement('div')
  div.classList.add('failure-container')
  const p = document.createElement('p')
  p.innerText += messaje
  div.appendChild(p)
  pageShow.appendChild(div)
  setTimeout(()=>{
    document.querySelector('.failure-container').remove()
  }, 2000)
}