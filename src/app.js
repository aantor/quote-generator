const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const quoteContainer = $('#quoteContainer');
const quoteText = $('#quoteText');
const authorText = $('#authorText');
const tweetBtn = $('#tweetBtn');
const newQuoteBtn = $('#newQuoteBtn');
const loader = $('#loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=100';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.quotes.map((quote) => {
      const { author, text } = quote;
      //   if Author is blank, add 'unknown'
      if (author === '') {
        authorText.innerText = 'unknown';
      } else {
        authorText.innerText = author;
      }
      // reduce font size for long quotes
      if (text.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = text;
    });
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log('--whoops, no data--', error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
