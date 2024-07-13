const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#qte");
const authorText = document.querySelector("#authour");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const stars = document.querySelectorAll(".ratings i");

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
      console.log(index2);
    });
  });
});

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}  ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

function newQuote() {
  stars.forEach((star) => {
    star.classList.remove("active");
  });

  const quote = apiQuotes[0];
  if (!quote.author) {
    authorText.textContent = "- Unknown";
  } else {
    authorText.textContent = `- ${quote.author}`;
  }
  if (quote.quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = `" ${quote.quote} "`;
}

let apiQuotes = [];

async function getQuotes() {
  const apiKey = "9Q+kNC29AWaSP56aXzzuDg==yxoq3qiCLYk84APR";
  const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=education";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (response.ok) {
      apiQuotes = await response.json();
      newQuote();
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
