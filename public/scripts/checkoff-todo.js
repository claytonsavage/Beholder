$(function() {
  $('body').on('click', '.todo-box', function(event) {
    $(this).closest('.todo-text').toggleClass("redlike");
    const idOfTweet = $(this).closest('.todo-box').data('id');
  });



});