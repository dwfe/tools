export const isNumeric = data =>
  !isNaN(data) && !isNaN(parseFloat(data)) && isFinite(data)
;
