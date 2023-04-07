const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
    showLoadingSpinner();
// To pick a random quote from apiQuotes array
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Check if Author field is blank
!quote.author ? authorText.textContent = 'Unknown' : authorText.textContent = quote.author;

// Check quote ength to determine styling
quote.text.length > 100 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

quoteText.textContent = quote.text;
removeLoadingSpinner() 
}

// Get Quotes From API
async function getQuotes() {
showLoadingSpinner();
const apiUrl ="https://jacintodesign.github.io/quotes-api/data/quotes.json";

try {
    const response = await fetch(apiUrl);
    // newQuote();
    if(!response.ok) {
        throw new Error('Error, quotes not found!');
    }
    apiQuotes = await response.json();
    newQuote();
} catch(err) {
    alert(err.message)
}
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// On Load 
getQuotes()



