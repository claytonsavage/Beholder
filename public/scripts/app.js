$(() => {
  $.ajax({
    method: "GET",
    url: "/todo/index"
  }).done((todos) => {
    console.log('todos', todos);
    for(individual of todos) {
      $("<div>").text(individual.todo).appendTo($("body"));
    }
  });

//this is what we want to do
  //  $.ajax({
  //   method: "POST",
  //   url: "/todo/create"
  // })//.done((users) => {
  //   // for(user of users) {
  //   //   $("<div>").text(user.todo).appendTo($("body"));
  //   // }
  // //});

});
