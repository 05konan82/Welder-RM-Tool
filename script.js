let side = 'long';

function setSide(value) {
  side = value;
  document.querySelectorAll('.side-buttons button')
    .forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function calculate() {
  const deposit = Number(document.getElementById('deposit').value);
  const deal = Number(document.getElementById('entryAmount').value);
  const leverage = Number(document.getElementById('leverage').value) || 1;
  const price = Number(document.getElementById('entryPrice').value);

  if (!deposit || !deal || !price) return;

  const riskUsd = deposit * 0.008;
  const realDeal = deal / leverage;
  const stopPercent = (riskUsd / realDeal) * 100;

  const stopPrice = side === 'long'
    ? price * (1 - stopPercent / 100)
    : price * (1 + stopPercent / 100);

  document.getElementById('result').innerHTML = `
    <b>Сторона:</b> ${side.toUpperCase()}<br>
    <b>Фактическая сумма:</b> ${realDeal.toFixed(2)} $<br>
    <b>Риск:</b> 0.8% (${riskUsd.toFixed(2)} $)<br>
    <b>Стоп:</b> ${stopPercent.toFixed(2)} %<br>
    <b>Цена стопа:</b> ${stopPrice.toFixed(2)}
  `;
}
