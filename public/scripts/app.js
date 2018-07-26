$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

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

  // Sorts array of options and assigns points mased on position in array
  function rankSortOptions(arr) {
    const ranked = [];
    arr = arr.reverse();

    for (let i = 1; i <= arr.length; i++) {
      let idx = arr.indexOf(i);
      ranked.push(idx);
    }

    return ranked;
  }

  function renderPoll(data) {
    const $poll = $('.poll-container');
    const $title = $('<h1>').text(data.title).appendTo($poll);
    const $list = $('<ul>').attr('id', 'sortable').appendTo($poll);
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    $('<li>').addClass('ui-state-default').attr('id', '1').text(data.option1).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').attr('id', '2').text(data.option2).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').attr('id', '3').text(data.option3).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').attr('id', '4').text(data.option4).append($sortSpan).appendTo($list);

    $('<button>').addClass('rank-btn').text('Submit').appendTo($poll);
  }

  renderPoll(data);

  $('#sortable').sortable();

  // Gets array of options in order that the user ranked them
  $('.rank-btn').on('click' , function(event) {
    let rankedOptions = $('#sortable').sortable('toArray');
    rankedOptions = rankedOptions.map(function(option) { return Number(option); });
    let rankedPoints = rankSortOptions(rankedOptions);
    console.log(rankedPoints);
  });

});
