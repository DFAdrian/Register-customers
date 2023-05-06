const customerName = document.getElementById('name')
const lastName = document.getElementById('lastName')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const address = document.getElementById('address')
const ul = document.getElementById('ul')
const addBtn = document.getElementById('add-btn')
const form = document.getElementById('form')
const requiredInputs = document.querySelectorAll('input');
const search = document.getElementById('search');
const article = document.getElementById('article');
const fragment = document.createDocumentFragment()
const clear = document.getElementById('reset-btn')

// customer class 

class Customers{
    constructor(name,phone,email,address){
        this.name = name,
        this.phone = phone,
        this.email = email,
        this.address = address
    }
}

// array of customers 
let customers = [];


// check local storage 

if(!localStorage.getItem('data')){
    localStorage.setItem('data',JSON.stringify(customers))
}else{
    customers = JSON.parse(localStorage.getItem('data'))
    display(customers)
    fillSelect(customers)
}




// add customers function 

function addCustomer(list){
    const newCustomer = new Customers(`${customerName.value} ${lastName.value}`,phone.value,email.value,address.value)
    list.push(newCustomer)
}

function display(data){
    data.map(client=>ul.innerHTML += `<li class="list-item"><b>Name:</b>${client.name}<b>Phone:</b>${client.phone}<b>Email:</b>${client.email}<b>Address:</b>${client.address}</li>`)
}


// search customer

function fillSelect(data){
    data.map(opt=>{
        search.innerHTML += `<option value="${opt.name.toLowerCase()}">${opt.name.toUpperCase()}</option>`
    })
}



// form Event('')

addBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    ul.innerHTML = ''
    search.innerHTML = ''
    addCustomer(customers)
    localStorage.setItem('data',JSON.stringify(customers))
    display(customers)
    fillSelect(customers)
    form.reset();
})


// reset event 

clear.addEventListener('click',()=>{
    localStorage.clear()
    location.reload()
})


//search event


search.addEventListener('change',()=>{
    article.innerHTML = ''
    let selected = search.selectedIndex;
    const p = document.createElement('p')
    p.setAttribute('class','show-search list-item')
    p.innerHTML=`<b>Name:</b>${customers[selected].name}<b>Phone:</b>${customers[selected].phone}<b>Email:</b>${customers[selected].email}<b>Address:</b>${customers[selected].address}`
    fragment.appendChild(p)
    article.append(fragment)
})



