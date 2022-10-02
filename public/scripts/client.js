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

const renderTweets = function(tweets) {
  for (let tweetData of tweets) {
    const time = timeago.format(tweetData.created_at);
    const $tweet = createTweetElement(tweetData, time);
    //console.log($tweet);
    $(()=>{$('#tweets-container').append($tweet);})
  }
};

$(() => { 
  $( "form" ).submit(function( event ) {
    event.preventDefault();
    const data = $( this ).serialize();
    $.ajax('/tweets', { method: 'POST', data});
  });

  $(() => 
    $.ajax('/tweets', { method: 'GET'})
    .then(function(tweets) {
      renderTweets(tweets);
    })
  )});