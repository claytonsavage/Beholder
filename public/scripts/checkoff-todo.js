$(function() {
  $('body').on('click', '.tweet-box', function(event) {
    $(this).closest('.tweet-box').toggleClass("redlike");
    console.log('liked', $(this).closest('.tweet-box').data('id'));
    const idOfTweet = $(this).closest('.tweet-box').data('id');

    let likeCounter = 0;
    if ($(this).hasClass( "redlike" ) === true) {
      likeCounter++;
    } else {
      likeCounter--;
    }



  $.ajax({
        method: 'PUT',
        url: `/tweets/${idOfTweet}`,
        data: $(this).hasClass( "redlike" ),
      }).done(function () {
        console.log(likeToggler);
        $('.counter').text('140');
        $('.error').replaceWith('<div class="infoForUser"><div>');
        // update DOM after hearing back from server
        loadTweets();
      });

  });


});