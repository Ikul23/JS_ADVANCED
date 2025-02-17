document.addEventListener("DOMContentLoaded", () => {
  const addReviewBtn = document.getElementById("addReview");
  const productList = document.getElementById("productList");
  const reviewSection = document.getElementById("reviewSection");
  const reviewsList = document.getElementById("reviewsList");
  const selectedProduct = document.getElementById("selectedProduct");


  function getReviews() {
    return JSON.parse(localStorage.getItem("reviews")) || {};
  }

  function saveReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  
  if (addReviewBtn) {
    addReviewBtn.addEventListener("click", () => {
      const productName = document.getElementById("productName").value.trim();
      const reviewText = document.getElementById("reviewText").value.trim();

      if (!productName || !reviewText) {
        alert("Введите название продукта и отзыв.");
        return;
      }

      const reviews = getReviews();

      if (!reviews[productName]) {
        reviews[productName] = [];
      }

      reviews[productName].push(reviewText);
      saveReviews(reviews);

      document.getElementById("productName").value = "";
      document.getElementById("reviewText").value = "";

      alert("Отзыв добавлен!");
    });
  }

    if (productList) {
    const reviews = getReviews();
    productList.innerHTML = "";

    Object.keys(reviews).forEach((product) => {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.textContent = product;
      li.addEventListener("click", () => showReviews(product));
      productList.appendChild(li);
    });
  }


  function showReviews(product) {
    reviewSection.classList.remove("d-none");
    selectedProduct.textContent = `Отзывы о "${product}"`;
    reviewsList.innerHTML = "";

    const reviews = getReviews()[product] || [];
    reviews.forEach((review, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${review}
        <button class="btn btn-sm btn-danger" onclick="deleteReview('${product}', ${index})">Удалить</button>
      `;
      reviewsList.appendChild(li);
    });
  }


  window.deleteReview = function (product, index) {
    const reviews = getReviews();
    reviews[product].splice(index, 1);
    if (reviews[product].length === 0) {
      delete reviews[product];
    }
    saveReviews(reviews);
    showReviews(product);
  };
});
