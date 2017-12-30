$(function() {
  $('body').on('click', '.todo-box', function(event) {
    $(this).closest('.todo-box').toggleClass("redlike");
    const idOfTweet = $(this).closest('.todo-box').data('id');
  });

  $('body').on('click', '.movie-toggle', function(event) {
    $(this).closest('.movie-toggle').toggleClass("selected-cat");
    let currentId = $(this).closest('article').attr("id");
     $.ajax({
      url: `/todo/${currentId}/update`,
      method: 'POST',
      dataType: 'JSON',
      success: function (morePostsJSON) {
        renderTodos(morePostsJSON.reverse());
      }
    });
  });
});