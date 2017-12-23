$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.todo).appendTo($("body"));
    }
  });;

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
