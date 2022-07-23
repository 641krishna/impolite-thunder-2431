import shopAllProducts from "../components/shop-all-objects.js";
import popup from "../components/pop-up.js";
import { navbar, footer } from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer();

// home redirect
let logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

//cart item count
let cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];
let sumCount = 0;
let displayCartCount = (data) => {
  if (!data) return;
  let total_cart_item = document.getElementById("total-cart-item");
  data.forEach((element) => {
    sumCount += element.count;
  });
  total_cart_item.innerText = sumCount;
};
displayCartCount(cart_items);

// redirect to account/login
let loginUser = JSON.parse(localStorage.getItem("loginUser")) || null;
let login_icon = document.getElementById("login-icon");
login_icon.addEventListener("click", () => {
  if (loginUser) {
    window.location.href = "account.html";
  } else {
    window.location.href = "login.html";
  }
});

// display product List
let displayProductList = (data) => {
  if (!data) return;

  let products = document.getElementById("product-list");
  products.innerHTML = "";

  data.forEach((el) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    card.addEventListener("click", () => {
      localStorage.setItem("productDetails", JSON.stringify(element));
      window.location.href = "product-details.html";
    });

    let love_btn = document.createElement("button");
    love_btn.setAttribute("class", "heart-back");
    love_btn.innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i>`;

    love_btn.addEventListener("click", (e) => {
      love_btn.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
    });

    let img_box = document.createElement("div");
    img_box.setAttribute("class", "img-box");

    let img = document.createElement("img");
    img.src = el.image;
    img.loading = "lazy";
    img_box.append(img);

    let title = document.createElement("a");
    title.innerText = el.head;
    title.setAttribute("class", "prod-title");

    // hover effect
    card.addEventListener("mouseover", (e) => {
      img.src = el.hovimage;
      title.style.borderBottom = "1px solid #121212";
    });
    card.addEventListener("mouseout", (e) => {
      img.src = el.image;
      title.style.borderBottom = "1px solid transparent";
    });

    let price = document.createElement("p");
    price.innerText = `$${el.price.toFixed(2)}`;
    price.setAttribute("class", "prod-price");

    card.append(love_btn, img_box, title, price);
    products.append(card);
  });
};

// function invoke
let data = shopAllProducts();
displayProductList(data);

// Best Selling Filter
let sorting = () => {
  let x = document.querySelector("#selector").value;
  if (x === "Bestselling") {
    for (let i = 0; i < data.length; i++) {
      let compare = data[i].tag;
      if (compare === "Bestselling") {
        return data[i];
      }
    }
    displayProductList(data);

    // A to Z Filter
  } else if (x === "A-Z") {
    data.sort(function (a, b) {
      if (a.head > b.head) {
        return 1;
      }
      if (b.head > a.head) {
        return -1;
      }
      return 0;
    });
    displayProductList(data);

    // Z to A Filter
  } else if (x === "Z-A") {
    data.sort(function (a, b) {
      if (a.head < b.head) {
        return 1;
      }
      if (b.head < a.head) {
        return -1;
      }
      return 0;
    });
    displayProductList(data);

    // Price Low to High Filter
  } else if (x === "low-to-high") {
    data.sort(function (a, b) {
      return a.price - b.price;
    });
    displayProductList(data);

    // Price High to Low Filter
  } else if (x === "high-to-low") {
    data.sort(function (a, b) {
      return b.price - a.price;
    });
    displayProductList(data);

    // Old to New Product
  } else if (x === "old-new") {
    data.sort(function (a, b) {
      return a.date - b.date;
    });
    displayProductList(data);

    // New to Old Product
  } else if (x === "new-old") {
    data.sort(function (a, b) {
      return b.date - a.date;
    });
    displayProductList(data);
  }
};

// filter function invoke
document.querySelector("#selector").addEventListener("change", sorting);
