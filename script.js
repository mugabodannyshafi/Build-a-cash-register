let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let changeDue = [];
  let totalCID = 0;

  for (let item of cid) {
    totalCID += item[1];
  }

  if (totalCID < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  else if (totalCID === change) {
    return { status: "CLOSED", change: cid };
  } else {
    
    for (let i = cid.length - 1; i >= 0; i--) {
      const currency = cid[i][0];
      const unitValue = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
      }[currency];
      let availableAmount = cid[i][1];
      let count = 0;
      while (change >= unitValue && availableAmount > 0) {
        change -= unitValue;
        change = Math.round(change * 100) / 100;
        availableAmount -= unitValue;
        count++;
      }

      if (count > 0) {
        changeDue.push([currency, count * unitValue]);
      }
    }

    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
      return { status: "OPEN", change: changeDue };
    }
  }
}

document.getElementById("purchase-btn").addEventListener("click", function() {
  let cashProvided = parseFloat(document.getElementById("cash").value);
  if (cashProvided < price) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  }
  if (cashProvided === price) {
    document.getElementById("change-due").innerText = "No change due - customer paid with exact cash.";
    return;
  }
  let result = checkCashRegister(price, cashProvided, cid);
  let changeDueElement = document.getElementById("change-due");

  // Handle different status
  switch (result.status) {
    case "INSUFFICIENT_FUNDS":
      changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
      break;
    case "CLOSED":
      changeDueElement.innerText = "Status: CLOSED " + result.change.map(item => `${item[0]}: $${item[1]}`).join(", ");
      break;
    case "OPEN":
      changeDueElement.innerText = "Status: OPEN " + result.change.map(item => `${item[0]}: $${item[1]}`).join(", ");
      break;
  }
});
