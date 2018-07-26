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
    const $title = $('<h1>').text(data.title).prependTo($poll);
    const $list = $('<ul>').attr('id', 'sortable').prependTo($poll);
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    $('<li>').addClass('ui-state-default').attr('id', '1').text(data.question).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').attr('id', '2').text(data.email).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').attr('id', '3').text(data.option3).append($sortSpan).appendTo($list);
    $('<li>').addClass('ui-state-default').attr('id', '4').text(data.option4).append($sortSpan).appendTo($list);
  }

  // Gets array of options in order that the user ranked them
  $('.rank-btn').on('click' , function(event) {
    console.log('CLicked')
    let rankedOptions = $('#sortable').sortable('toArray');
    rankedOptions = rankedOptions.map(function(option) { return Number(option); });
    let rankedPoints = rankSortOptions(rankedOptions);
    console.log(rankedPoints);
  });

  function getPollData(table) {
    $(() => {
      $.ajax({
        method: "GET",
        url: "/api/users/"
      }).done((table) => {
        renderPoll(table[0]);
        $('#sortable').sortable();
      });;
    });
  }

  getPollData("poll")

});
