// Review Handlers
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const author = urlParams.get("author");
  if (title && author) {
    document.querySelector("#title").value = title;
    document.querySelector("#author").value = author;
  }
};

const stars = document.querySelector(".stars");
stars.style.width = "20%";

const rate = (rating) => {
  const userInput = document.querySelector("#rating").value;

  switch (userInput) {
    case "1":
      stars.style.width = "20%";
      break;
    case "2":
      stars.style.width = "40%";
      break;
    case "3":
      stars.style.width = "60%";
      break;
    case "4":
      stars.style.width = "80%";
      break;
    case "5":
      stars.style.width = "100%";
      break;
    default:
      rating = "1";
      break;
  }
};

document.getElementById("rating").addEventListener("change", rate);

const postHandler = async (e) => {
  e.preventDefault();
  // Get the values from the form
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const content = document.querySelector("#review").value.trim();
  const rating = document.querySelector("#rating").value.trim();

  // Get the book id from the URL
  const path = window.location.pathname;
  const parts = path.split("/");
  const book_id = Number(parts[parts.length - 1]);
  console.log(book_id);

  // If the URL doesn't have a book id, find the book by title and author
  if (isNaN(book_id)) {
    if (title && author && content && rating) {
      // Find the book by title and author and return the book id
      const response = await fetch(`/api/reviews/findBook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });
      if (response.ok) {
        const data = await response.json();
        const bookId = data.bookId;
        console.log(bookId);
        // Post the review with the book id
        const reviewResponse = await fetch(`/api/reviews/${bookId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ book_id: bookId, content, rating }),
        });
        if (reviewResponse.ok) {
          // Redirect to the book page
          document.location.replace(`/book/${bookId}`);
          console.log("Review posted");
        } else {
          alert("Failed to post review");
        }
      } else {
        alert("Failed to find book");
      }
    } else {
      alert("Failed to post review");
    }
  } else {
    // If the URL has a book id, post the review with the book id
    if (title && author && content) {
      const reviewResponse = await fetch(`/api/reviews/${book_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id, content, rating }),
      });
    } else {
      alert("Failed to post review");
    }
  }
};

if (document.querySelector("#submit-review")) {
  document
    .querySelector("#submit-review")
    .addEventListener("click", postHandler);
}

const editHandler = async (e) => {
  e.preventDefault();

  const reviewCard = e.target.closest(".review-card");
  const book_id = reviewCard.getAttribute("data-book-id");
  const review_id = reviewCard.getAttribute("data-review-id");

  const pElement = reviewCard.querySelector(".review-content");
  const content = pElement.textContent;
  const textArea = document.createElement("textarea");
  textArea.textContent = content;

  pElement.replaceWith(textArea);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.className = "submit-edit";

  textArea.insertAdjacentElement("afterend", submitButton);

  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const newContent = textArea.value.trim();

    console.log("book_id:", book_id);
    console.log("newContent:", newContent);

    const response = await fetch(`/api/reviews/${review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id, content: newContent }),
    });

    if (response.ok) {
      document.location.reload();
    }
  });
};

if (document.querySelector(".edit-btn")) {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", editHandler);
  });
}

const deleteHandler = async (e) => {
  e.preventDefault();

  const reviewCard = e.target.closest(".review-card");
  const review_id = reviewCard.getAttribute("data-review-id");

  const response = await fetch(`/api/reviews/${review_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.reload();
  }
};

if (document.querySelector(".delete-btn")) {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteHandler);
  });
}
