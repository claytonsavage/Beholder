$(function() {
  $('body').on('click', '.todo-box', function(event) {
    $(this).closest('.todo-box').toggleClass("redlike");
    //console.log('liked', $(this).closest('.todo-box').data('id'));
    const idOfTweet = $(this).closest('.todo-box').data('id');

    let likeCounter = 0;
    if ($(this).hasClass( "redlike" ) === true) {
      likeCounter++;
    } else {
      likeCounter--;
    }



  $.ajax({
        method: 'PUT',
        //might need to fix this
        url: `/odo/${idOfTodo}`,
        data: $(this).hasClass( "redlike" ),
      }).done(function () {
        // update DOM after hearing back from server
        loadTweets();
      });

  });


});