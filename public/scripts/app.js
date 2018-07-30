$(document).ready(function() {
  let count = 2;

  // Get points using Borda Count
  function getPoints(arr) {
    let scores = [];
    for (let i = 0; i < arr.length; i++) {
      scores.push(arr.length - (arr.indexOf(i)) - 1);
    }
    return scores;
  }

  function randomQuestion() {
    const questionList = ["Where do you want to go for dinner on Wednesday?", "Do you like pizza?", "What movie should we watch?", "What is the flight velocity of an unladen swallow?"];
    const optionList1 = ["Somewhere cheap", "Yes", "Return of the Jedi", "What do you mean? An African or European swallow?"];
    const optionList2 = ["Somewhere delicious", "I am stupid", "The Last Crusade", "Huh? I.. I don't know that... AAARRRRRGGH!"];

    let rando = Math.floor(Math.random() * questionList.length);
    let arr = [questionList[rando], optionList1[rando], optionList2[rando]];

    $('#question').attr("placeholder", arr[0]);
    $('#option1').attr("placeholder", arr[1]);
    $('#option2').attr("placeholder", arr[2]);
  }

  function renderPoll(data) {
    const $poll = $('.poll-container');
    const $list = $('<ul>').attr('id', 'sortable').prependTo($poll);
    const $small = $('<small>').text('(Order your preferences from top to bottom)').prependTo($poll);
    const $title = $('<h1>').text(data.question).prependTo($poll);
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');

    for (let i = 0; i < data.options.length; i++) {
      $('<li>')
        .addClass('ui-state-default')
        .attr('id', i)
        .text(data.options[i])
        .append($sortSpan)
        .appendTo($list);
    }
  }

  function renderNewOption() {
    count++;
    const $addoption = $(".add-option-div");
    const $sortSpan = $('<span>').addClass('ui-icon ui-icon-arrowthick-2-n-s');
    const $input = $('<input>')
      .addClass("form-control")
      .attr('id', 'option' + count)
      .attr('name', 'option' + count)
      .attr('type', 'text');

    $('<div>').addClass("form-group").append($input).insertBefore($addoption);
    return count;
  }

  function getPollData() {
    $.ajax({
      method: "GET",
      url: "/api/users/"
    }).done((table) => {
      renderPoll(table[table.length - 1]);
      $('#sortable').sortable();
    });
  }

  function getRanks(response, email) {
    let data = "ranking=" + JSON.stringify(response);
    $.ajax({
      method: "POST",
      url: "/api/users" + window.location.pathname + "/results",
      data: { ranking: response, email: email },
    })
    .done((res) => {
      console.log('Success: posted to ' + window.location.pathname + "results");
      window.location.pathname = res.redirect;
    });
  };

  // Simple email validation
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Checks to see if the user has permission to vote on this poll
  // Gets array of options in order that the user ranked them

  function timer() {
    $('.err').slideUp();
  }

  randomQuestion();
  getPollData();

  $('.rank-btn').on('click', function(event) {
    let $email = $('#email').val();
    let rankedOptions = $('#sortable').sortable('toArray');
    rankedOptions = rankedOptions.map(function(option) { return Number(option); });
    let rankedPoints = getPoints(rankedOptions);

    // Check if email field is empty and display error
    if (!$email) {
      console.log("Error")
      $('#no-email').slideDown();
      setTimeout(timer, 5000);
      return false;
    }

    $.ajax({
      method: "GET",
      url: "/api/users" + window.location.pathname
    }).done((table) => {
      if (table[0].emails.includes($email) || table[0].email.includes($email)) {
        console.log('Works')
        getRanks(rankedPoints, $email);
      } else {
        console.log("Error")
        $('#bad-email').slideDown();
        event.preventDefault();
      }
    });
    setTimeout(timer, 5000)
  });

  // Add another option to poll form when clicked
  $(".add-option").click(function(event) {
    event.stopPropagation();
    renderNewOption();
  });

  // Check that all fields are filled in on submit and that emails entered are valid
  $('.poll-submit').on('click', function(event) {
    $(":input#email.form-control").each(function() {
      if($('input#email.form-control').val() === "") {
        $('#missing-email').slideDown();
        event.preventDefault();
      } else if (!validateEmail($('input#email.form-control').val())) {
        $('#invalid-email').slideDown();
        event.preventDefault();
      }
    });
    $(":input#question.form-control").each(function() {
      if($('input#question.form-control').val() === "") {
        $('#missing-question').slideDown();
        event.preventDefault();
      }
    });
    $('[id^=option]').each(function() {
      if($('[id^=option]').val() === "") {
        $('#missing-option1').slideDown();
        event.preventDefault();
      }
    });
    $(":input#emails.form-control").each(function() {
      if($('input#emails.form-control').val() === "") {
        $('#missing-recipients').slideDown();
        event.preventDefault();
      }
    });
    setTimeout(timer, 5000)

    let $emails = $('#emails').val();
    $emails = $emails.split(/,\s*/g);

    for (let i = 0; i < $emails.length; i++) {
      if (!validateEmail($emails[i])) {
        $('#invalid-emails').slideDown();
        event.preventDefault();
      }
    }
  });
});
