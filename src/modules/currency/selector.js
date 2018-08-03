export const getCurrentCurrencyPurchase = state =>
  state.currency[getSelectedCurrency(state)][0] ? state.currency[getSelectedCurrency(state)][0].purchase : 0;

export const getCurrentCurrencySell = state =>
  state.currency[getSelectedCurrency(state)][0] ? state.currency[getSelectedCurrency(state)][0].sell : 0;

export const getSelectedCurrency = state => state.currency.selected;

export const getOffset = state => state.currency.offset;
