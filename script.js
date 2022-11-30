"use strict";

const container = document.getElementById("container");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let allQuotes = [];

const showLoadingSpinner = function () {
  loader.hidden = false;
  container.hidden = true;
};
const hideLoadingSpinner = function () {
  container.hidden = false;
  loader.hidden = true;
};
const newQuote = function () {
  showLoadingSpinner();
  let quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
};

// const newQuote = function () {};
const getQuoteFromAPI = async function () {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    allQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
};

const tweetQuote = function () {
  const newQuote = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(newQuote, "_blank");
};

//Event Listeners
newQuoteBtn.addEventListener("click", getQuoteFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

getQuoteFromAPI();
