//document.querySelector('.recharge').addEventListener('click', ()=>changePage('rechange'))
//document.querySelector('.pay').addEventListener('click', ()=>changePage('pay'))
document.querySelector('.transactions').addEventListener('click', ()=>changePage('transactions'))
//document.querySelector('.other').addEventListener('click', ()=>changePage('other'))

document.querySelector('.widthdraw').addEventListener('click', ()=>changePage('withdraw'))
//document.querySelector('.question').addEventListener('click', ()=>changePage('question'))
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
  document.querySelector('.principal').style.display = "none"
  document.querySelector(`.${page}-container`).style.display = "block"
  operation(page)
}

function operation(page){
  console.log(page)
  document.querySelector(`.${page}-count__one`,'count01').addEventListener('click', ()=>countUser = ckecked('count01', page))
  document.querySelector(`.${page}-count__two`,'count01').addEventListener('click', ()=>countUser = ckecked('count02', page))
  let countUser
  let availableBalance
  let money
  let result
  document.querySelector(`.botton-send__${page}`).addEventListener('click', ()=>{
    if(countUser != undefined){
      money = Number(document.querySelector(`.input__${page}`).value)
      availableBalance = Number(localStorage.getItem(countUser))
      if(page === 'deposit' && money < 10000){
        result = availableBalance + money
      }else if(page === 'withdraw' && money <= availableBalance){
        result = availableBalance - money
      }else if(page === 'transfer' && money < availableBalance && money < 100000){
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
      }else{
        errorAction(page, countUser)
        return
      }
      localStorage.setItem(countUser, result)
      endAction(page, countUser)
    }
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
  let msm
  if(page === 'deposit'){
    msm = `el cajero no acepta depositos mayores a 10,000`
  }else if(page === 'withdraw'){
    msm = `monto insuficiente para retirar en su cuenta`
  }else if(page === 'transfer'){
    msm = `no tiene la cantidad disponible`
  }else if(page === 'transactions'){
    msm = `no tiene el monto disponible`
  }
  document.querySelector(`.${page}-content`).innerHTML += `<div class="failure-container"><p>${msm}</p></div>`
  setTimeout(()=>window.location.reload(), 1000)
}




