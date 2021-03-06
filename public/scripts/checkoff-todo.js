$(function() {
  $('body').on('click', '.notdone', function(event) {
    let currentId = $(this).closest('article').attr("id");
    $.ajax({
      url: `/todo/${currentId}/update/completed`,
      method: 'POST',
      success: function (moreTodos) {
        loadTodos();
      }
    });
  });

  $('body').on('click', '.redlike', function(event) {
    let currentId = $(this).closest('article').attr("id");
    $.ajax({
      url: `/todo/${currentId}/update/incomplete`,
      method: 'POST',
      success: function (moreTodos) {
        loadTodos();
      }
    });
  });

  $('body').on('click', '#updatetoggle', function(event) {
    $('.update').toggleClass("hidden");
  });

  $('body').on('click', '#registertoggle', function(event) {
    $('.regupdate').toggleClass("hidden");
  });

});
