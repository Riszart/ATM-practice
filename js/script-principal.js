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
        messajeShowFinish(localStorage.user, money, result, availableBalance, page)
      }else if(page === 'withdraw' && money <= 10000 && money >= 100){
        result = availableBalance - money
        messajeShowFinish(page, countUser, localStorage.user, money, result, availableBalance)
      }else if(page === 'transfer' && money <= availableBalance && money <= 100000 && money >= 10){
        const countTranferOther = document.querySelector('.input__transfer-count')
        if(countTranferOther.value.length == 8){
          countTranferOther.style.border = "solid 1px #0defee"
          result = availableBalance - money
          messajeShowFinish(localStorage.user, money, result, availableBalance, page)
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
        messajeShowFinish(localStorage.user, money, result, availableBalance, page)
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
function messajeShowFinish(page, countBank, user, money, result, availableBalance){
  const obj = callObj(page, countBank, user, money, result, availableBalance)
  /*let stringOne = `Porfavor-espere-un-momento-Sr.${user}`
  let stringTwo = `Sr.${user}-su-operacion-fue-aprobada`
  let stringThree = `saldo-actual:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.')
  let stringFour = `saldo-a-retirar:`.padEnd(70, '.') + `$${money}`.padStart(10, '.')
  let stringFive = `saldo-disponible-en-su-cuenta:`.padEnd(70, '.') + `$${result}`.padStart(10, '.')
  let stringSix = `Eso-es-todo-gracias-por-su-preferencia`*/
  //finishOperation(stringOne, stringTwo, stringThree, stringFour, stringFive, stringSix, page)
  finishOperation(obj, page, user)
}

function processWrite(stringLoad, lockedPoint, page){
  return new Promise((resolve,reject)=>{
    const textWindows = document.querySelector(`.${page}__detail`)
    let pLoad = document.createElement('p')
    textWindows.appendChild(pLoad)
    let arraypoints = ['.','.','.']
    let iterationArray = arrayIterate(stringLoad.split(''))
    let countPointLoad = 0
    let locked = false
    let completeLoad = 0
    const proces = setInterval(()=>{
      if(stringLoad != pLoad.innerText && locked == false){
        pLoad.innerText = pLoad.innerText + iterationArray.next().value
        if(pLoad.innerText === stringLoad)locked = true
      }else {
        if(completeLoad == 20 || lockedPoint == true){
          pLoad.innerText = stringLoad
          clearInterval(proces)
          resolve()
        }else if(lockedPoint === false){
          pLoad.innerText = pLoad.innerText + arraypoints[countPointLoad]
          countPointLoad++
          if(countPointLoad === 4){
            pLoad.innerText = stringLoad
            countPointLoad = 0
            completeLoad++
          }
        }
      }
    },50)
  })
}
async function finishOperation(obj, page){
  for(let element in obj){
    await processWrite(obj[element].string, obj[element].action, page)
  }
  processWrite('*'.padEnd(70, '*')+'*'.padStart(10, '*'), true, page)


  /*await processWrite(stringLoad, false, page)
  await processWrite(two, true, page)
  await processWrite(three, true, page)
  await processWrite(four, true, page)
  await processWrite(five, true, page)
  await processWrite(six, true, page)
  await processWrite('*'.padEnd(70, '*')+'*'.padStart(10, '*'), true, page)
  window.location.reload()*/
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
function* arrayIterate(array){
  for(let values of array){
    yield values
  }
}
function callObj(operationObj, countBank, user, money, result, availableBalance){
  switch(operationObj){
    case 'withdraw':
      return objWithdraw = {
      one: {string:`Porfavor-espere-un-momento-por-su-retiro-Sr(a).${user}`,action:false},
      Two: {string:`Cuenta-bancaria:${countBank}`,action:true},
      three: {string:`Sr(a).${user}-su-retiro-fue-aprobado`,action:true},
      four: {string:`saldo-en-su-cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
      five: {string:`saldo-a-retirar-de-su-cuenta:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
      six: {string:`saldo-disponible-en-su-cuenta:`.padEnd(70, '.') + `$${result}`.padStart(10, '.'),action:true},
      seven: {string:`Eso-es-todo-gracias-por-su-preferencia-Sr(a).${user}`,action:true},
      }
    case 'transfer':
      return objTransfer = {
        one: {string:`Porfavor-espere-un-momento-por-su-transferencia-Sr(a).${user}`,action:false},
        two: {string:`Sr(a).${user}-su-transferencia-fue-aprobada`,action:true},
        three: {string:`saldo-anterior-en-su-cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
        four: {string:`saldo-a-retirar-de-su-cuenta:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
        five: {string:`saldo-actual-en-su-cuenta:`.padEnd(70, '.') + `$${result}`.padStart(10, '.'),action:true},
        six: {string:`Eso-es-todo-gracias-Sr(a).${user}`,action:true},
      }
    case 'deposit':
      return objDeposit = {
        one: {string:`Porfavor-espere-un-momento-por-su-deposito-Sr(a).${user}`,action:false},
        two: {string:`Sr(a).${user}-su-deposito-fue-aprobada`,action:true},
        three: {string:`saldo-anterior-en-su-cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
        four: {string:`saldo-a-retirar-de-su-cuenta:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
        five: {string:`saldo-actual-en-su-cuenta:`.padEnd(70, '.') + `$${result}`.padStart(10, '.'),action:true},
        six: {string:`Eso-es-todo-gracias-Sr(a).${user}`,action:true},
      }
    case 'transactions':
      return objTransactions = {
        one: {string:`Porfavor-espere-un-momento-por-su-transacsion-Sr(a).${user}`,action:false},
        two: {string:`Sr(a).${user}-su-transacsion-fue-aprobada`,action:true},
        three: {string:`saldo-anterior-en-su-cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
        four: {string:`saldo-a-retirar-de-su-cuenta:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
        five: {string:`saldo-actual-en-su-cuenta:`.padEnd(70, '.') + `$${result}`.padStart(10, '.'),action:true},
        six: {string:`Eso-es-todo-gracias-Sr(a).${user}`,action:true},
      }
  }
}