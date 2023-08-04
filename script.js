const customerName = document.getElementById("name");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const estimate = document.getElementById("estimate");
const ul = document.getElementById("ul");
const addBtn = document.getElementById("add-btn");
const form = document.getElementById("form");
const requiredInputs = document.querySelectorAll("input");
const search = document.getElementById("search");
const article = document.getElementById("article");
const clear = document.getElementById("reset-btn");

// customer class

class Customers {
  constructor(name, phone, email, address,estimate) {
    (this.name = name),
      (this.phone = phone),
      (this.email = email),
      (this.address = address),
      (this.estimate = estimate),
      (this.day = new Date().getDate()),
      (this.month = new Date().getMonth() + 1),
      (this.year = new Date().getFullYear());
  }
}

// array of customers
let customers = [];

// check local storage

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(customers));
} else {
  customers = JSON.parse(localStorage.getItem("data"));
  display(customers);
  fillSelect(customers);
}

// add customers function

function addCustomer(list) {
  const newCustomer = new Customers(
    `${customerName.value} ${lastName.value}`,
    phone.value,
    email.value,
    address.value,
    estimate.value
  );
  list.push(newCustomer);
}

//display function

function display(data) {
  const fragment = document.createDocumentFragment();
  ul.innerHTML = "";
  
  if (data.length <= 0) {
    const p = document.createElement("p");
    p.textContent = "No customers";
    fragment.appendChild(p);
  } else {
    data.map((client, index) => {
      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `<span>${client.month}/${client.day}/${client.year}</span><b>Name:</b>${client.name}<b>Phone:</b>${client.phone}<b>Email:</b>${client.email}<b>Address:</b>${client.address}<b>Estimate:</b>${client.estimate}`;
      li.id = index;
      fragment.appendChild(li);
    });
  }
  ul.appendChild(fragment);
}

// search customer

function fillSelect(data) {
  const fragment = document.createDocumentFragment();
  search.innerHTML = "";
  data.map((opt) => {
    const option = document.createElement("option");
    option.value = `${opt.name.toLowerCase()}`;
    option.textContent = `${opt.name.toUpperCase()}`;
    fragment.appendChild(option);
  });
  search.appendChild(fragment);
}

// form Event('')

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ul.innerHTML = "";
  search.innerHTML = "";
  addCustomer(customers);
  localStorage.setItem("data", JSON.stringify(customers));
  display(customers);
  fillSelect(customers);
  form.reset();
});

// reset event

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//search event


search.addEventListener("change", () => {
  article.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const div = document.createElement("div");
  div.className = "search-card";
  let selected = search.selectedIndex;
  const p = document.createElement("p");
  p.setAttribute("class", "show-search list-item");
  p.innerHTML = `<b>Name:</b>${customers[selected].name}<b>Phone:</b>${customers[selected].phone}<b>Email:</b>${customers[selected].email}<b>Address:</b>${customers[selected].address}`;
  div.appendChild(p);
  fragment.appendChild(div);
  article.append(fragment);
});
