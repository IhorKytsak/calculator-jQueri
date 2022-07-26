let num1 = null;
let num2 = null;
let operator = null;
let total = 0;
let screenLog = '';

$(document).ready(function () {
  $('#clear').on('click', function () {
    $('.screen').css('color', '#000');
    reset();
    displayScreen(total);
  });

  $('.digit').on('click', function (e) {
    $('.screen').css('color', '#000');
    handleDigit(e);
  });

  $('.operation').on('click', function (e) {
    if (num1 === null) {
      return;
    } else if (num2 === null) {
      operator = e.target.value;
      displayScreen(num1 + operator);
    } else {
      num1 = compute(num1, num2);
      operator = e.target.value;
      num2 = null;
      displayScreen(num1 + operator);
    }
  });

  $('.equal').on('click', function () {
    if (num1 === null || num2 === null) {
      return;
    }

    if (num1) {
      if (!operator) {
        total = num1;
        displayScreen(num1);
        return;
      }
    }

    if (num2 === '0' && operator === '/') {
      displayScreen('ERROR');
      $('.screen').css('color', 'red');
      reset();
      return;
    }

    total = compute(num1, num2);
    $('.log').prepend(
      `<div class='logWrap'>
        <div class='circle'>
        </div><div class='result'>${num1} ${operator} ${num2} = ${total}</div><div class='closeRow'>&#10006;</div>
      </div>`
    );
    logsFilter();
    displayScreen(total);
    reset();
  });

  $('.log').on('click', function (e) {
    if (e.target.className === 'closeRow') {
      e.target.closest('.logWrap').remove();
    }
  });
  $('.log').on('click', '.circle', function () {
    $(this).toggleClass('closeRow-red');
  });

  $('.log').on('scroll', function () {
    console.log($('.log').scrollTop());
  });
});

function logsFilter() {
  const regExp = /48/;
  $('.result').each(function () {
    if (regExp.test($(this).text())) {
      $(this).css('text-decoration', 'underline');
    }
  });
}

function compute(stringA, stringB) {
  let a = parseFloat(stringA);
  let b = parseFloat(stringB);
  switch (operator) {
    case '/':
      return (a / b).toFixed(0);
    case '-':
      return (a - b).toFixed(0);
    case '+':
      return (a + b).toFixed(0);
    case '*':
      return (a * b).toFixed(0);
    default:
      break;
  }
}

function displayScreen(text) {
  $('.screen').text(text);
}

function handleDigit(e) {
  if (num1 === null) {
    num1 = e.target.value;
    displayScreen(num1);
  } else if (operator === null) {
    num1 += e.target.value;
    displayScreen(num1);
  } else {
    if (num2 === null) {
      num2 = e.target.value;
      displayScreen(num1 + operator + num2);
    } else {
      num2 += e.target.value;
      displayScreen(num1 + operator + num2);
    }
  }
}

function reset() {
  num1 = null;
  num2 = null;
  operator = null;
  total = 0;
}
