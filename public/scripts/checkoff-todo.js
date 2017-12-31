$(function() {
  $('body').on('click', 'p', function(event) {
    $(this).closest('.todo-box').toggleClass("redlike");
  });

  // $('body').on('click', 'h2', function(event) {
  //   $(this).closest('').toggle();
  // });

});
