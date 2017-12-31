$(() => {

  //need to add the current user id to the new todo being created

   function createTodoElement(value){
      var str = value.category_id;
      var catVar;
      var apiResult;

      if(str === 1) {
        catVar = "Movie";
        var apiquery = value.todo;
        var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else if (str === 2) {
        catVar = "Book";
        var apiquery = value.todo;
        var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else if (str === 3) {
        catVar = "Restaurant";
         var apiquery = value.todo;
         var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else if (str === 4) {
        catVar = "Product";
        var apiquery = value.todo;
        var apiQueryWithoutCategory = apiquery.substr(apiquery.indexOf(' ') + 1);
      } else {
        let apiQueryWithoutCategory = value.todo;
      }

      if (catVar === "Book") {
        apiResult = "learn more about this book!";
      }
       if (catVar === "Movie") {
        apiResult = "learn more about this movie!";
      }
       if (catVar === "Product") {
        apiResult = "learn more about this product!";
      }
       if (catVar === "Restaurant") {
        apiResult = "learn more about this restaurant!";
      }

    const $h2 = $('<h2>').text(catVar).addClass("category");
    const $header = $('<header>').addClass("todo-header");
    const $apiInfo = $('<h3>').text(apiResult).addClass("api-info");
    const $content = $('<p>').text(value.todo).addClass("todo-text");
    const $categorychanger = $('<div>').addClass("toggle-button");
    const $categoryMovie = $('<div>').text('Movie').addClass("movie-toggle");
    const $categoryBook = $('<div>').text('Book').addClass("book-toggle");
    const $categoryPurchase = $('<div>').text('Purchase').addClass("purchase-toggle");
    const $categoryRestaurant = $('<div>').text('Restaurant').addClass("restaurant-toggle");
    return $('<article>')
      .addClass("todo-box")
      .attr("todo", value.todo)
      .attr("id", value.id)
      .attr("category", value.category_id)
      .append($header, $content, $apiInfo, $categorychanger, $categoryMovie, $categoryBook, $categoryPurchase, $categoryRestaurant, $h2);
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
      loadTodos();
    });
  });

  loadTodos = function() {
    $.ajax({
      url: '/todo/index',
      method: 'GET',
      dataType: 'JSON',
      success: function (moreTodos) {
        renderTodos(moreTodos.reverse());
      }
    });
  };

  loadTodos();

  $( ".toggleButton" ).click(function() {
    $( ".wrapper" ).slideToggle( 80, function() {
      $( ".textarea-new-todo" ).focus();
    });
  });

  var apisearch = function(id, category) {
    if (category === '1') {
      $.ajax ({
        url: `/todo/${id}`,
        method: 'GET'
      }).
      done((data) => {
        $('.information-from-api').replaceWith(`<div class="information-about information-from-api">${data.results['0'].title}, ${data.results['0'].overview}</div>`);
      });
    } if (category === '4') {
      $.ajax ({
        url: `/todo/${id}`,
        method: 'GET'
      }).
      done((data) => {
        $('.information-from-api').replaceWith(`<div class="information-about information-from-api">${data.name} costs: $${data.salePrice} description: ${data.shortDescription}</div>`);
      });
    } if (category === '2') {
      $.ajax ({
        url: `/todo/${id}`,
        method: 'GET'
      }).
      done((data) => {
        $('.information-from-api').replaceWith(`<div class="information-about information-from-api">${data.name} - Book Description: ${data.shortDescription}</div>`);
      });
    } if (category === '3') {
       $.ajax ({
        url: `/todo/${id}`,
        method: 'GET'
      }).
      done((data) => {
        $('.information-from-api').replaceWith(`<div class="information-about information-from-api">price: ${data.price} rating: $${data.rating} address: ${data.location.address1}</div>`);
      });
    }
  };

  $('.container').on('click', 'article', function() {
    let category = $(this).attr('category');
    let id = $(this).attr('id');
    apisearch(id, category);
  });

    $('body').on('click', '.movie-toggle', function(event) {
    $(this).closest('.movie-toggle').toggleClass("selected-cat");
    let currentId = $(this).closest('article').attr("id");
    $(this).closest('article').children('h2').text('Movie');
    $.ajax({
      url: `/todo/${currentId}/update/movie`,
      method: 'POST',
      success: function(moreTodos) {
        loadTodos();
      }
    })
  });

  $('body').on('click', '.book-toggle', function(event) {
    $(this).closest('.movie-toggle').toggleClass("selected-cat");
    let currentId = $(this).closest('article').attr("id");
    $(this).closest('article').children('h2').text('Book')
    $.ajax({
      url: `/todo/${currentId}/update/book`,
      method: 'POST',
      success: function (moreTodos) {
        loadTodos();
      }
    });
  });

  $('body').on('click', '.restaurant-toggle', function(event) {
    $(this).closest('.movie-toggle').toggleClass("selected-cat");
    let currentId = $(this).closest('article').attr("id");
    $(this).closest('article').children('h2').text('Restaurant')
    $.ajax({
      url: `/todo/${currentId}/update/restaurant`,
      method: 'POST',
      success: function (moreTodos) {
        loadTodos();
      }
    })
  });

  $('body').on('click', '.purchase-toggle', function(event) {
    $(this).closest('.movie-toggle').toggleClass("selected-cat");
    let currentId = $(this).closest('article').attr("id");
    $(this).closest('article').children('h2').text('Product')
     $.ajax({
      url: `/todo/${currentId}/update/purchase`,
      method: 'POST',
      success: function (moreTodos) {
        loadTodos();
      }
      });
  });



