/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(tweet, time) {
  let $tweet = `<article class="tweet">
  <header>
    <div>
      <i class="fa-solid fa-paw"></i>
      <span class="username">${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <p>${escapeXSS(tweet.content.text)}</p>
  <footer>
   <span class="footer-date">${time}</span>
   <div class="footer-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
  </footer>
</article>`;

  return $tweet;
};

//escape tags to avoid XSS attack
const escapeXSS = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//returns a single html tweet from json object
const parseTweet = function(tweetData) {
  const time = timeago.format(tweetData.created_at);
  const $tweet = createTweetElement(tweetData, time);
  return $tweet;
};

//adds new tweet to top of tweet container element
const prependTweet = function(parsedTweet) {
  $(()=>{
    $('#tweets-container').prepend(parsedTweet);
  });
};

//adds tweet to bottom of tweet container element
const appendTweet = function(parsedTweet) {
  $(()=>{
    $('#tweets-container').append(parsedTweet);
  });
};

// renders tweets in html
const renderTweets = function(tweets) {
  for (let tweetData of tweets.reverse()) {
    const $tweet = parseTweet(tweetData);
    appendTweet($tweet);
  }
};

// grabs all the tweets in the DB and returns them
const getTweets = function() {
  let tweets;
  $.ajax('/tweets', { method: 'GET', async: false})
    .done(async function(data) {
      tweets =  data;
    });
  return tweets;
};

//loads and displays tweets
const showCurrentTweets = function() {
  const tweets = getTweets();
  renderTweets(tweets);
};

//inserts the most recent tweet from the db and places it at the top of the tweets container
const appendHeadTweet = function() {
  const tweet = getTweets().at(-1);
  const $tweet = parseTweet(tweet);
  prependTweet($tweet);
};

$(() => {
  $("form").submit(function(event) {
    event.preventDefault();
    $("#empty").slideUp("fast");
    $("#too_long").slideUp("fast");
    if ($("#tweet-text").val().length > 0) {
      if ($("#tweet-text").val().length <= 140) {
        //tweet is neither too long or too short ~~goldylocks~~
        const data = $(this).serialize();
        $("#tweet-text").val("");
        $.ajax('/tweets', { method: 'POST', data})
          .done(() => { //after successful completion get the data, clear the existing tweets and then show the new tweets.
            setTimeout(() => {  //a small set timeout avoids a race condition not dealt with via promise chaining.
              appendHeadTweet();
            },100);
          });
      } else {
        //tweet is too long
        $("#too_long").slideDown("slow");
      }
    } else {
      //tweet is empty
      $("#empty").slideDown("slow");
    }
  });
});

$(() =>
  showCurrentTweets()
);