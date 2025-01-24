const cartBtn = document.querySelectorAll(".add-btn");

// add eventListener to cart button
for (let btn of cartBtn) {
  btn.addEventListener("click", function (e) {
    const name = e.target.parentNode.childNodes[1].innerText;
    const price = e.target.parentNode.childNodes[3].childNodes[1].innerText;
    const category = e.target.parentNode.childNodes[5].childNodes[1].innerText;

    // upgrade budget
    const check = updateBudget("budget", parseInt(price));

    // validation check for budget cart left
    if (check === 0) return;

    const left = stringToNumber("left");
    const cart = stringToNumber("cart");
    if (cart + 1 > 6 || left - 1 < 0) {
      alert("Don't exceed cart or left limit");
      return;
    }
    // once add cart click it will disable
    e.target.parentNode.childNodes[7].setAttribute("disabled", false);
    e.target.parentNode.style.backgroundColor = 'gray';
    // upgrade cart
    updateInnerText("cart", cart + 1);

    // upgrade left
    updateInnerText("left", left - 1);

    //create div and p tag dynamically append it to the cart section
    const cartContainer = document.getElementById("selected-players-container");
    const div = document.createElement("div");
    cartContainer.append(div);

    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");

    p1.innerText = name;
    p2.innerText = price;
    p3.innerHTML = category;

    div.classList.add("selected-players");

    div.append(p1, p2, p3);

    TotalCost(price);
    // Before apply coupon code
    grandTotalCost();
  });
}
// update budget
function updateBudget(budget, price) {
  const currentBudget = stringToNumber(budget);
  if (currentBudget - price < 0) {
    alert("Low Budget");
    return 0;
  } else {
    updateInnerText("budget", currentBudget - parseInt(price));
  }
}

// update cart

// update left

// update total cost
function TotalCost(value) {
  const total = stringToNumber("total-cost");
  let sumTotal = total + parseInt(value);
  updateInnerText("total-cost", sumTotal);
}

// update grand total cost
function grandTotalCost(discount) {
  const totalCost = stringToNumber("total-cost");
  const CouponCode = document.getElementById("coupon-code").value;
  const grandCost = stringToNumber("grand-total");
  if (discount == undefined) {
    updateInnerText("grand-total", totalCost);
  } else {
    if (CouponCode == "dom20%") {
      const discountCost = grandCost * 0.2;
      updateInnerText("grand-total", grandCost - discountCost);
    } else alert("Provide your coupon code!");
  }
}

// Convert string to number and return to the calling function.
function stringToNumber(id) {
  const value = document.getElementById(id).innerText;
  const convertedValue = parseInt(value);
  return convertedValue;
}

// update innerText common function
function updateInnerText(id, value) {
  document.getElementById(id).innerText = value;
}
