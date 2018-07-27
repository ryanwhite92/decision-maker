$(document).ready(function() {

  // Sorts array of options and assigns points mased on position in array

  function rankSortOptions(arr) {
    const ranked = [];
    arr = arr.reverse();

    for (let i = 0; i < arr.length; i++) {
      let idx = arr.indexOf(i);
      ranked.push(idx);
    }

    return scores;
  }

  function getPoints(arr) {
    let scores = [];
    for (let i = 0; i < arr.length; i++) {
      scores.push(arr.length - (arr.indexOf(i)) - 1);
    }

    return scores;
  }

  let count = 2;

  function renderPoll(data) {
    const $poll = $('.poll-container');
    const $list = $('<ul>').attr('id', 'sortable').prependTo($poll);
    const $title = $('<h1>').text(data.question).prependTo($poll);
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    for (let i = 0; i < data.options.length; i++) {
      $('<li>').addClass('ui-state-default').attr('id', i).text(data.options[i]).append($sortSpan).appendTo($list);
    }
  }

  function renderNewOption() {
    count++;
    const $addoption = $(".add-option-div");
    let $input = $('<input>').addClass("form-control").attr('id', 'option' + count).attr('name', 'option' + count).attr('type', 'text');
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    $('<div>').addClass("form-group").append($input).insertBefore($addoption);
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
    let rankedPoints = getPoints(rankedOptions);
    console.log(rankedPoints);
    getRanks(rankedPoints)
  });



  $('.poll-submit').on('click', function(event) {
    $(":input#email.form-control").each(function() {
      if($('input#email.form-control').val() === "") {
        $('#missing-email').slideDown();
        event.preventDefault();
      }
    });
    $(":input#question.form-control").each(function() {
      if($('input#question.form-control').val() === "") {
        $('#missing-question').slideDown();
        event.preventDefault();
      }
    });
    $(":input#option1.form-control").each(function() {
      if($('input#option1.form-control').val() === "") {
        $('#missing-option1').slideDown();
        event.preventDefault();
      }
    });
    $(":input#option2.form-control").each(function() {
      if($('input#option2.form-control').val() === "") {
        $('#missing-option2').slideDown();
        event.preventDefault();
      }
    });
    $(":input#emails.form-control").each(function() {
      if($('input#emails.form-control').val() === "") {
        $('#missing-recipients').slideDown();
        event.preventDefault();
      }
    });
    function f() {
      $('.err').slideUp();
    }
    setTimeout(f, 5000)

  });



});


