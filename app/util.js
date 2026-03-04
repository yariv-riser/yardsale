export function formatPrice(num) {
  const ILShekel = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });

  return ILShekel.format(num);
}