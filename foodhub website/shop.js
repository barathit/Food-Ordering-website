const categoryToggle = document.querySelector(".category-toggle");
const categoryList = document.getElementById("category-list");
const productContainer = document.getElementById("product-container");
const cartItems = document.getElementById("cart-items");

const messData = {
  "Anu Mess": [
    { name: "Idli", price: 30, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
    { name: "Dosa", price: 40, quantity: 10 },
  ],
  "Annai Mess": [
    { name: "Pongal", price: 50, quantity: 10 },
    { name: "Sambar Rice", price: 60, quantity: 10 },
    { name: "Pongal", price: 50, quantity: 10 },
    { name: "Pongal", price: 50, quantity: 10 },
    { name: "Pongal", price: 50, quantity: 10 },
    { name: "Pongal", price: 50, quantity: 10 },
    { name: "Pongal", price: 50, quantity: 10 },
  ],
  "CFC Restaurant": [
    { name: "Chicken Biryani", price: 120, quantity: 10 },
    { name: "Mutton Curry", price: 150, quantity: 10 },
    { name: "Mutton Biryani", price: 180, quantity: 0 },
    { name: "CFC Chicken", price: 130, quantity: 6 },
    { name: "Malabar Biryani", price: 150, quantity: 19 },
    { name: "Chilli Chicken", price: 100, quantity: 18 },
    { name: "Pepper Chicken ", price: 120, quantity: 0 },
    { name: "Grill Chicken", price: 170, quantity: 10 },
  ],
  "Gowri Mess": [
    { name: "Parotta", price: 20, quantity: 10 },
    { name: "Kothu Parotta", price: 60, quantity: 10 },
    { name: "Kothu Parotta", price: 60, quantity: 10 },
    { name: "Kothu Parotta", price: 60, quantity: 10 },
    { name: "Kothu Parotta", price: 60, quantity: 10 },
    { name: "Kothu Parotta", price: 60, quantity: 10 },
    { name: "Kothu Parotta", price: 60, quantity: 10 },
  ],
  "SS Mess": [
    { name: "Fish Curry", price: 100, quantity: 10 },
    { name: "Egg Curry", price: 80, quantity: 10 },
    { name: "Egg Curry", price: 80, quantity: 10 },
    { name: "Egg Curry", price: 80, quantity: 10 },
    { name: "Egg Curry", price: 80, quantity: 10 },
  ],
};

categoryToggle.addEventListener("click", () => {
  categoryList.classList.toggle("hidden");
});

categoryList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const messName = e.target.dataset.mess;
    const foods = messData[messName];

    productContainer.innerHTML = foods
      .map(
        (food) =>
          `<div class="product">
             <h4>${food.name}</h4>
             <p>₹${food.price}</p>
             <p>Available: ${food.quantity}</p>
             <button class="add-to-cart" data-name="${food.name}" data-price="${food.price}" data-quantity="${food.quantity}">Add to Cart</button>
           </div>`
      )
      .join("");
  }
});

productContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.dataset.name;
    const price = e.target.dataset.price;
    let quantity = parseInt(e.target.dataset.quantity);

    if (quantity > 0) {
      // Update cart
      const listItem = document.createElement("li");
      listItem.textContent = `${name} - ₹${price}`;

      // Create delete button for cart item
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-item");
      listItem.appendChild(deleteBtn);
      cartItems.appendChild(listItem);

      // Reduce the quantity of the food in the product list
      quantity--;
      e.target.dataset.quantity = quantity;

      // Update the product container to reflect the reduced quantity
      const productDiv = e.target.closest(".product");
      const quantityText = productDiv.querySelector("p:nth-child(3)");
      quantityText.textContent = `Available: ${quantity}`;

      // Disable button if out of stock
      if (quantity === 0) {
        e.target.disabled = true;
        e.target.textContent = "Out of stock";
      }
    }
  }
});

// Handle item deletion from cart
cartItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    const listItem = e.target.closest("li");
    const itemText = listItem.textContent.replace("Delete", "").trim();
    const [foodName, price] = itemText.split(" - ₹");

    // Find the food in messData to update its quantity
    for (let mess in messData) {
      messData[mess].forEach((food) => {
        if (food.name === foodName) {
          food.quantity++; // Increase the quantity as the item is deleted from the cart
        }
      });
    }

    // Update the product list to reflect the increased quantity
    const productDiv = [
      ...productContainer.getElementsByClassName("product"),
    ].find((div) => div.querySelector("h4").textContent === foodName);
    if (productDiv) {
      const quantityText = productDiv.querySelector("p:nth-child(3)");
      const currentQuantity = parseInt(
        quantityText.textContent.replace("Available: ", "")
      );
      quantityText.textContent = `Available: ${currentQuantity + 1}`;
    }

    // Remove the item from the cart
    listItem.remove();

    // Enable the "Add to Cart" button if quantity is greater than 0
    const productBtn = [
      ...productContainer.querySelectorAll(".add-to-cart"),
    ].find((btn) => btn.dataset.name === foodName);
    if (productBtn && parseInt(productBtn.dataset.quantity) > 0) {
      productBtn.disabled = false;
      productBtn.textContent = "Add to Cart";
    }
  }
});
