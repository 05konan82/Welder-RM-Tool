let side = 'long';

function setSide(s) {
  side = s;
  longBtn.classList.toggle('active', s === 'long');
  shortBtn.classList.toggle('active', s === 'short');
}

function calculate() {
  const deposit = +deposit.value;
  const dealAmount = +entryAmount.value;
  const leverage = +leverage.value || 1;
  const entryPrice = +entryPrice.value;

  if (!deposit || !dealAmount || !entryPrice) return;

  // риск 0.8% от депозита
  const riskUsd = deposit * 0.008;

  // фактическая сумма в сделке
  const realDealAmount = dealAmount / leverage;

  // процент стопа
  const stopPercent = (riskUsd / realDealAmount) * 100;

  // цена стопа
  const stopPrice = side === 'long'
    ? entryPrice * (1 - stopPercent / 100)
    : entryPrice * (1 + stopPercent / 100);

  result.classList.remove('hidden');
  result.innerHTML = `
    <b>Фактическая сумма в сделке:</b> ${realDealAmount.toFixed(2)} $<br>
    <b>Стоп-лосс:</b> ${stopPercent.toFixed(2)} %<br>
    <b>Цена стопа:</b> ${stopPrice.toFixed(2)}
  `;
}
