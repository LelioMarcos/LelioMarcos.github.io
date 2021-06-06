let canPlay = true;
let turn = true;

function desenhar(x) {
  table = $('<table></table>').appendTo(draw);

  for (let i = 0; i < x; i++) {
    tr = $('<tr></tr>').appendTo(table);

    for (let j = 0; j < x; j++) {
      td = $('<td></td>').appendTo(tr);

      td.attr('lin', i);
      td.attr('col', j);
    }

    let square = $('td');

    square.each(function () {
      $(this).on('click', clicando);
    })
  }

  function clicando() {
    if (canPlay) {
      lin = $(this).attr('lin');
      col = $(this).attr('col');

      if ($(this).text() == '') {
        $(this).animate({ 'opacity': '100%' }, 140);
        if (turn) {
          text = 'X';
          boardArray[lin][col] = 1;
        } else {
          text = 'O';
          boardArray[lin][col] = -1;
        }

        $(this).text(text);
        turn = !turn;

        checkWin(lin, col);
      }
    }
  }

  function checkWin(lin, col) {
    let somaLin = 0;
    let somaCol = 0;
    let somaDi1 = 0;
    let somaDi2 = 0;
    let orderInvert = order - 1;

    for (let j = 0; j < order; j++) {
      somaLin += boardArray[lin][j];
      somaCol += boardArray[j][col];
      somaDi1 += boardArray[j][j];
      somaDi2 += boardArray[j][orderInvert];
      orderInvert -= 1;
    }

    if (somaDi1 == order || somaDi2 == order || somaLin == order || somaCol == order) {
      win('X');
    } else if (somaDi1 == -order || somaDi2 == -order || somaLin == -order || somaCol == -order) {
      win('O');
    }
  }

  function win(x) {
    canPlay = false;

    relaod = $("<button name='reload' type='button'>Reiniciar</button>").appendTo(draw);

    winner = $('<h2></h2>').text(x + ' GANHOU');
    winner.appendTo(draw);

    relaod.on('click', function () {
      winner.remove();
      relaod.remove();

      for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
          boardArray[i][j] = 0;
        }
      }

      $('table').remove();

      canPlay = true;
      turn = true;

      desenhar(order);

      return;
    })

    for (let k = 0; k <= 2000; k++) {
      winner.animate({ fontSize: '20px' });
      winner.animate({ fontSize: '40px' });
    }
  }
}
