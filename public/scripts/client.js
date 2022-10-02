/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1664555553994
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1664641953994
  }
]

const createTweetElement = function(tweet) {
  let $tweet = `<article class="tweet">
  <header>
    <div>
      <i class="fa-solid fa-paw"></i>
      <span class="username">${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
   <span class="footer-date">${tweet.created_at}</span>
   <div class="footer-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
  </footer>
</article>`;

  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweetData of tweets) {
    const $tweet = createTweetElement(tweetData);
    //console.log($tweet);
    $(()=>{$('#tweets-container').append($tweet);})
  }
};

renderTweets(tweets);

$(() => { 
  $( "form" ).submit(function( event ) {
    event.preventDefault();
    console.log('form submitted');
  });
});