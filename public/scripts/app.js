// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// Temp test data
const data = {
  title: 'My poll for stuff',
  option1: 'option1',
  option2: 'option2',
  option3: 'option3',
  option4: 'option4',
  email: 'admin@example.com'
};

$(document).ready(function() {

  function renderPoll(data) {
    const $poll = $('.poll-container');
    const $title = $('<h1>').text(data.title).appendTo($poll);
    const $list = $('<ul>').attr('id', 'sortable').appendTo($poll);
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    $('<li>').addClass('ui-state-default').text(data.option1).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').text(data.option2).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').text(data.option3).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').text(data.option4).append($sortSpan).appendTo($list);
  }

  renderPoll(data);

  $('#sortable').sortable({});
  $('#sortable').disableSelection();

});
