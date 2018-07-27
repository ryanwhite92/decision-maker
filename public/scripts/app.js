// Temp test data
// const data = {
//   title: 'My poll for stuff',
//   option1: 'option1',
//   option2: 'option2',
//   option3: 'option3',
//   option4: 'option4',
//   email: 'admin@example.com'
// };

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

  let count = 2;

  function renderPoll(data) {

    console.log(data)

    const $poll = $('.poll-container');
    const $title = $('<h1>').text(data.title).prependTo($poll);
    const $list = $('<ul>').attr('id', 'sortable').prependTo($poll);
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    for (let i = 0; i < data.options.length; i++) {
      $('<li>').addClass('ui-state-default').attr('id', i).text(data.options[i]).append($sortSpan).appendTo($list);
    }
  }

  function renderNewOption() {
    count++;
    const $addoption = $(".add-option-div");
    let $input = $('<input>').addClass("form-control").attr('name', 'option' + count).attr('type', 'text');
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    $('<div>').addClass("form-group").append($input).append($sortSpan).insertBefore($addoption);
    return count;
  }

  $(".add-option").click(function(event) {
    event.stopPropagation();
    renderNewOption();
  });
  


  function getPollData(table) {
    $(() => {
      $.ajax({
        method: "GET",
        url: "/api/users/"
      }).done((table) => {
        renderPoll(table[table.length - 1]);
        $('#sortable').sortable();
      });
    });
  }

  function getRanks(response) {
    let data = "ranking=" + JSON.stringify(response);
    $(() => {
      $.ajax({
        method: "POST",
        url: "/api/users" + window.location.pathname + "/results",
        data: data,
      })
      .done((res) => {
        console.log('Success: posted to ' + window.location.pathname + "/results");
        window.location.pathname = res.redirect;
      });
    });
  };

  getPollData("poll")

  // Gets array of options in order that the user ranked them
  $('.rank-btn').on('click', function(event) {
    let rankedOptions = $('#sortable').sortable('toArray');
    rankedOptions = rankedOptions.map(function(option) { return Number(option); });
    let rankedPoints = rankSortOptions(rankedOptions);
    console.log(rankedPoints);
    getRanks(rankedPoints)
  });
});


