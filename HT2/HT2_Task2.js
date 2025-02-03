
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];


function displayReviews() {
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = ""; 

  initialData.forEach((product) => {
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.product;
    productTitle.className = "mt-4 mb-3";
    reviewsContainer.appendChild(productTitle);

    product.reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.className = "review";
      reviewElement.innerHTML = `<p>${review.text}</p>`;
      reviewsContainer.appendChild(reviewElement);
    });
  });
}


function addReview(text) {
  if (text.length < 50 || text.length > 500) {
    throw new Error("Отзыв должен содержать от 50 до 500 символов.");
  }


  initialData[0].reviews.push({
    id: String(Date.now()), 
    text: text,
  });


  displayReviews();
}


document.getElementById("submitReview").addEventListener("click", () => {
  const reviewInput = document.getElementById("reviewInput");
  const text = reviewInput.value.trim();

  try {
    addReview(text);
    reviewInput.value = ""; 
    alert("Отзыв успешно добавлен!");
  } catch (error) {
    alert(error.message); 
  }
});


displayReviews();