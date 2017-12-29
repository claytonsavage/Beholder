$(function() {
  $('body').on('click', '.todo-box', function(event) {
    $(this).closest('.todo-box').toggleClass("redlike");
    //console.log('todo data', $(this).closest('.todo-box').data('id'));
    const idOfTweet = $(this).closest('.todo-box').data('id');

  // $.ajax({
  //       method: 'PUT',
  //       //might need to fix this
  //       url: `/todo/${idOfTweet}`,
  //       data: $(this).hasClass( "redlike" ),
  //     }).done(function () {
  //       // update DOM after hearing back from server
  //       loadTweets();
  //     });

  });


});