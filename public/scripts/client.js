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
  <p>${tweet.content.text}</p>
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

//returns a single html tweet from json object
const parseTweet = function (tweetData) {
  const time = timeago.format(tweetData.created_at);
  const $tweet = createTweetElement(tweetData, time);
  return $tweet;
};

// renders tweets in html
const renderTweets = function(tweets) {
  for (let tweetData of tweets.reverse()) {
    const $tweet = parseTweet(tweetData);
    $(()=>{$('#tweets-container').append($tweet);})
  }
};
//loads and displays tweets
const showCurrentTweets = function() {
  $.ajax('/tweets', { method: 'GET'})
  .then(function(tweets) {
    renderTweets(tweets);
  })
};



$(() => { 
  $( "form" ).submit(function( event ) {
    event.preventDefault();

      if ($("#tweet-text").val().length > 0 ) {
        const data = $( this ).serialize();
        $.ajax('/tweets', { method: 'POST', data})
        .done(() => { //after successful completion get the data, clear the existing tweets and then show the new tweets. 
          setTimeout(() => {  //a small set timeout avoids a race condition not dealt with via promise chaining.
            $.ajax('/tweets', { method: 'GET'})
            .then(function(tweets) {
              $("#tweets-container").empty();
              renderTweets(tweets);
            }, 200)});
        });
      } else {
        alert('put stuff in tweets');
      }
    });
  });

  $(() => 
    showCurrentTweets()
  );