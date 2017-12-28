$(() => {

  //need to add the current user id to the new todo being created

   function createTodoElement(value){
    // change value.user.name
      var str = value.todo;
      var watchResult = RegExp('watch', 'i').test(str);
      var bookResult = RegExp('read', 'i').test(str);
      var restuarantResult = RegExp('eat', 'i').test(str);
      var productResult = RegExp('buy', 'i').test(str);
      // console.log('result ========>', result);
      var catVar;
      var apiResult = "hello world";

      if(watchResult === true) {
        catVar = "Movie";
        var apiquery = value.todo;
        var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else if (bookResult === true) {
        catVar = "Book";
        var apiquery = value.todo;
        var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else if (restuarantResult === true) {
        catVar = "Restaurant";
         var apiquery = value.todo;
         var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else if (productResult === true) {
        catVar = "Product";
        var apiquery = value.todo;
        var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      }
      //pass apiquery to api based on catVar
      // start with hardcoded then go from there
      // cant bring  in api here
      if (catVar === "Book") {
        apiResult = "This is a great book!";
      }
       if (catVar === "Movie") {
        apiResult = "This is a great movie!";
      }
       if (catVar === "Product") {
        apiResult = "This is a great product!";
      }
       if (catVar === "Restaurant") {
        apiResult = "This is a great restaurant!";
      }

    //console.log('CATEGORY -------->', value.category_id);
    const $h2 = $('<h2>').text(catVar).addClass("category");
    const $header = $('<header>').addClass("todo-header").append($h2);
    const $apiInfo = $('<h3>').text(apiResult).addClass("api-info").append($h2);
    // change value.content.text
    const $content = $('<p>').text(value.todo).addClass("todo-text");
    return $('<article>')
      .addClass("todo-box")
      .data("id", value._id)
      .append($header, $content, $apiInfo);
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
       // console.log(morePostsJSON);
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


$.ajax ({
  url: '/todo/1', // NEED TO CHANGE ===================
  method: 'GET'
}).
done((data) => {
  console.log(`Review: ${data['results'][0]['vote_average']} Overview: ${data['results'][0]['overview']}`);
  // console.log('Price: ', data.price, 'Rating: ', data.rating, 'Address', data.location.address1);
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
