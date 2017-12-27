$(() => {

  //need to add the current user id to the new todo being created

   function createTodoElement(value){
    // change value.user.name
    const $h2 = $('<h2>').text('category').addClass("category");
    const $header = $('<header>').addClass("todo-header").append($h2);
    // change value.content.text
    const $content = $('<p>').text(value.todo).addClass("todo-text");
    return $('<article>')
      .addClass("todo-box")
      .data("id", value._id)
      .append($header, $content);
  }

   function renderTodos(todos){
    $('#todo-container').empty().append(todos.map(createdTodo => createTodoElement(createdTodo)));
  }

  $('#todoform').on('submit', function(event) {
    event.preventDefault()
    const formText = ($('.textarea-new-todo').val());
    const trimText = formText.trim();
    if (!trimText) {
      $('.infoForUser').replaceWith('<div class="error infoForUser" >todo missing</div>');
      return;
    }
    $.ajax({
      method: 'POST',
      url: '/todo/create',
      data: $(this).serialize()
    }).done(function () {
      event.target.reset();
      $('.error').replaceWith('<div class="infoForUser"><div>');
      // update DOM after hearing back from server
      loadTodos();
    });
  });
  // $.ajax({
  //   method: "GET",
  //   url: "/todo/index"
  //   data: $(this).serialize()
  // }).done((todos) => {
    // for(individual of todos) {
      // $("<div>").text(individual.todo).appendTo($("body"));

  loadTodos = function() {
    $.ajax({
      url: '/todo/index',
      method: 'GET',
      dataType: 'JSON',
      success: function (morePostsJSON) {
        renderTodos(morePostsJSON.reverse());
      }
    });
  };

  loadTodos();

  $( ".toggleButton" ).click(function() {
    $( ".wrapper" ).slideToggle( 80, function() {
      $( ".textarea-new-todo" ).focus();
    });
  });


// $('.logoutbutton').on('click', function(event) {
//   event.preventDefault()
//   $.ajax({
//     url: '/logout',
//     method: 'POST',
//     success: function(){


//     }
//   });

//this is what we want to do
   // $('#add-todo').on('click', function () {

   //    var task = {
   //      user_id: req.session.userID,
   //      todo: req.body.todo,
   //    };


  //  $.ajax({
  //   method: "POST",
  //   url: "/todo/create"
  // })
  // .done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.todo).appendTo($("todos"));
  //   }
  // });
// });

});
