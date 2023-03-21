document.querySelector('.recharge').addEventListener('click', ()=>changePage('rechange'))
document.querySelector('.pay').addEventListener('click', ()=>changePage('pay'))
document.querySelector('.transactions').addEventListener('click', ()=>changePage('transactions'))
document.querySelector('.other').addEventListener('click', ()=>changePage('other'))

document.querySelector('.widthdraw').addEventListener('click', ()=>changePage('withdraw'))
document.querySelector('.question').addEventListener('click', ()=>changePage('question'))
document.querySelector('.transfer').addEventListener('click', ()=>changePage('transfer'))
document.querySelector('.deposit').addEventListener('click', ()=>changePage('deposit'))

let arrayCount
function ckecked(side, page){
  const count01 = document.querySelector(`.${page}-count__one-input`)
  const count01Container = document.querySelector(`.${page}-count__one`)
  let count02
  let count02Container
  if(arrayCount.count02){
    count02 = document.querySelector(`.${page}-count__two-input`)
    count02Container = document.querySelector(`.${page}-count__two`)
  }
    if(side === 'count01'){
      count01.checked = true
      if(arrayCount.count02)count02.checked = false
      count01Container.style.backgroundColor = '#316966'
      if(arrayCount.count02)count02Container.style.backgroundColor = '#ff8c00'
      side = arrayCount.count01
      balance('.money-count', side.countBalance)
    }else if(side === 'count02'){
        count01.checked = false
        count02.checked = true
        count02Container.style.backgroundColor = '#316966'
        count01Container.style.backgroundColor = '#ff8c00'
        side = arrayCount.count02
        balance('.money-count', side.countBalance)
    }
  return side
}
function balance(classcount, selectCount){
  const array = document.querySelectorAll(classcount)
  for(let item of array){
    item.innerText = selectCount
  }
}
const userBank = localStorage.getItem('login')
for(let i = 0; i < localStorage.length; i++){
  if(JSON.parse(localStorage.getItem(localStorage.key(i))).id == userBank){
    arrayCount = JSON.parse(localStorage.getItem(localStorage.key(i)))
  }
}

balance('.name-count', arrayCount.countUser)

function changePage(page){
  document.querySelector(`.${page}-number-count__one`).innerText = arrayCount.count01.countBank
  if(arrayCount.count02){
    document.querySelector(`.${page}-number-count__two`).innerText = arrayCount.count02.countBank
  }

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
  document.querySelector(`.${page}-count__one`,'count01').addEventListener('click', ()=>countCheck = ckecked('count01', page))
  if(arrayCount.count02)document.querySelector(`.${page}-count__two`,'count02').addEventListener('click', ()=>countCheck = ckecked('count02', page))
  let countCheck
  let availableBalance
  let money
  let result
  document.querySelector(`.botton-send__${page}`).addEventListener('click', ()=>{
    if(countCheck != undefined){
      money = Number(document.querySelector(`.input__${page}`).value)
      availableBalance = Number(countCheck.countBalance)
      if(page === 'deposit' && money <= 10000 && money >= 10){
        result = availableBalance + money
        messajeShowFinish(page, countCheck, money, availableBalance)
      }else if(page === 'withdraw' && money <= 10000 && money >= 100){
        result = availableBalance - money
        messajeShowFinish(page, countCheck, money, availableBalance)
      }else if(page === 'transfer' && money <= availableBalance && money <= 100000 && money >= 10){
        const countTranferOther = document.querySelector('.input__transfer-count')
        const userDestiny = seachCount(countTranferOther.value, money)
        if(!countTranferOther.value.length == 13){
          countTranferOther.style.border = "solid 1px red"
          return   
        }else if(userDestiny[2]){
          countTranferOther.style.border = "solid 1px #0defee"
          result = availableBalance - money
          messajeShowFinish(page, countCheck, money, availableBalance, userDestiny)
        }else{
          return
        }
      }else if(page === 'transactions' && money <= availableBalance){
        const countTranferOther = document.querySelector('.input__transactions-count')
        if(!countTranferOther.value.length == 15){
          countTranferOther.style.border = "solid 1px red"
          return   
        }else{
          countTranferOther.style.border = "solid 1px #0defee"
          result = availableBalance - money
          messajeShowFinish(page, countCheck, money, availableBalance, countTranferOther.value)
        }
      }else {
        errorAction(page)
        return
      }
      countCheck.countBalance = result
      localStorage.setItem(arrayCount.id, JSON.stringify(arrayCount))
      endAction(page, countCheck.countBalance)
    }else {
      showMessaje(page, "seleccione un cuenta para realizar la operacion")
    }
  })
  document.querySelector(`.botton-cancel__${page}`).addEventListener('click', ()=>{
    window.location.reload()
  })
}
function messajeShowFinish(page, countCheck, money, availableBalance, destiny){
  const obj = callObj(page, countCheck, money, availableBalance, destiny)
  finishOperation(obj, page)
}
function removeSpace(string){
  let arrayString = string.split(``)
  let a = false
  let newstring = arrayString.map(element => {
    if(element == ` `){
      a = true
    }else if(a == true){
      a = false
      return ` ${element}`
    }else{
      return element
    }
  })
  return newstring.filter(element=> element !== undefined)
}
function processWrite(stringLoad, lockedPoint, page){
  return new Promise((resolve,reject)=>{
    const textWindows = document.querySelector(`.${page}__detail`)
    let pLoad = document.createElement('p')
    textWindows.appendChild(pLoad)
    let stringArray = removeSpace(stringLoad)
    let arraypoints = ['.','.','.']
    let countPointLoad = 0
    let locked = false
    let completeLoad = 0
    let iterationArray = arrayIterate(stringArray)
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
    },1)
  })
}
async function finishOperation(obj, page){
  for(let element in obj){
    await processWrite(obj[element].string, obj[element].action, page)
  }
  processWrite('*'.padEnd(70, '*')+'*'.padStart(10, '*'), true, page)
} 

function endAction(page, newBalance){
  balance('.money-count', newBalance)
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
function callObj(operationObj, countCheck, money, availableBalance, countDestiny){
  switch(operationObj){
    case 'withdraw':
      return objWithdraw = {
      one: {string:`Porfavor espere un momento por su retiro Sr(a).${arrayCount.countUser}`,action:false},
      Two: {string:`Sr(a).${arrayCount.countUser} su retiro fue aprobado`,action:true},
      three: {string:`Cuenta bancaria de origen:`.padEnd(66, '.') + `${countCheck.countBank}`,action:true},
      four: {string:`saldo en su cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
      five: {string:`saldo a retirar de su cuenta:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
      six: {string:`saldo disponible en su cuenta:`.padEnd(70, '.') + `$${countCheck.countBalance - money}`.padStart(10, '.'),action:true},
      seven: {string:`Eso es todo gracias por su preferencia Sr(a).${arrayCount.countUser}`,action:true},
      }
    case 'transfer':
      return objTransfer = {
        one: {string:`Porfavor espere un momento por su transferencia Sr(a).${arrayCount.countUser}`,action:false},
        two: {string:`Sr(a).${arrayCount.countUser} su transferencia fue aprobada`,action:true},
        three: {string:`Cuenta bancaria de origen de la tranferencia:`.padEnd(66, '.') + `${countCheck.countBank}`,action:true},
        four: {string:`Cuenta bancaria destinataria:`.padEnd(66, '.') + `${countDestiny[1]}`,action:true},
        five: {string:`Nombre de la cuenta de destino:`.padEnd(71, '.') + `${countDestiny[0]}`,action:true},
        six: {string:`saldo anterior en su cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
        seven: {string:`saldo a tranferir de su cuenta:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
        eight: {string:`saldo actual en su cuenta:`.padEnd(70, '.') + `$${countCheck.countBalance - money}`.padStart(10, '.'),action:true},
        nine: {string:`Eso es todo gracias Sr(a).${arrayCount.countUser}`,action:true},
      }
    case 'deposit':
      return objDeposit = {
        one: {string:`Porfavor espere un momento por su deposito Sr(a).${arrayCount.countUser}`,action:false},
        two: {string:`Sr(a).${arrayCount.countUser} por confiarnos su dinero`,action:true},
        three: {string:`Cuenta bancaria del destino del deposito:`.padEnd(66, '.') + `${countCheck.countBank}`,action:true},
        four: {string:`saldo anterior en su cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
        five: {string:`saldo a depositar:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
        six: {string:`saldo actual en su cuenta:`.padEnd(70, '.') + `$${countCheck.countBalance - money}`.padStart(10, '.'),action:true},
        seven: {string:`Eso es todo gracias Sr(a).${arrayCount.countUser}`,action:true},
      }
    case 'transactions':
      return objTransactions = {
        one: {string:`Porfavor espere un momento por su transacsion Sr(a).${arrayCount.countUser}`,action:false},
        two: {string:`Sr(a).${arrayCount.countUser} su transacsion fue aprobada`,action:true},
        three: {string:`Cuenta bancaria de origen de la transacsion:`.padEnd(66, '.') + `${countCheck.countBank}`,action:true},
        four: {string:`Cuenta bancaria del destinatario:`.padEnd(65, '.') + `${countDestiny}`,action:true},
        six: {string:`saldo anterior en su cuenta:`.padEnd(70, '.') + `$${availableBalance}`.padStart(10, '.'),action:true},
        seven: {string:`saldo de la transacsion:`.padEnd(70, '.') + `$${money}`.padStart(10, '.'),action:true},
        eight: {string:`saldo actual en su cuenta:`.padEnd(70, '.') + `$${countCheck.countBalance - money}`.padStart(10, '.'),action:true},
        nine: {string:`Eso es todo gracias Sr(a).${arrayCount.countUser}`,action:true},
      }
  }
}
function seachCount(numberCount, money){
  for(let i = 0; i < localStorage.length; i++){
    let arrayCountExist = JSON.parse(localStorage.getItem(localStorage.key(i)))
    if(typeof arrayCountExist == 'object'){
      for(let item in arrayCountExist){
        if(typeof arrayCountExist[item] == 'object'){
          let numberCountDestiny = arrayCountExist[item].countBank.split('').filter(element=>element !== '-')
          let one = document.querySelector(`.transfer-count__one-input`).checked
          let two = document.querySelector(`.transfer-count__two-input`).checked
          let number = document.querySelector('.input__transfer-count')
          let selectone = document.querySelector('.transfer-number-count__one').innerText.split('').filter(element=>element !== '-').join('')
          let selecttwo = document.querySelector('.transfer-number-count__two').innerText.split('').filter(element=>element !== '-').join('')
          if(one && number.value == selectone || two && number.value == selecttwo){
            return finishOperation({one: {string:`no se permite la misma cuenta`,action:false}},"transfer")
          }
          if(numberCount == numberCountDestiny.join('')){
            arrayCountExist[item].countBalance = arrayCountExist[item].countBalance + money
            if(arrayCount.id == arrayCountExist.id)arrayCount = arrayCountExist
            localStorage.setItem(arrayCountExist.id, JSON.stringify(arrayCountExist))
            return [arrayCountExist.countUser,  arrayCountExist[item].countBank, true]
          }
        }
      }
    }
  }
  return finishOperation({
    one: {string:`Porfavor espere un momento por su transacsion Sr(a).${arrayCount.countUser}`,action:false},
    two: {string:`Sr(a).${arrayCount.countUser} su transacsion fue rechasada`,action:true},
    three: {string:`Cuenta bancaria ingresado:`.padEnd(66, '.') + `${numberCount}`,action:true},
    four: {string:`la cuenta bancaria del destinatario no esxiste:`.padEnd(66, '.'),action:true},
    eight: {string:`porfavor ingrese un numero de cuenta existente (13 digitos).`,action:true},
  }, "transfer")
}

241730