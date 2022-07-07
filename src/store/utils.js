export const formatNum = (num, locale, options = {}) => {
  return new Intl.NumberFormat(locale, options).format(num);
};

export const arCount = (
  count,
  {sng = 'مرة', pair = 'مرتين', plr = 'مرات', zero = 'صفر'},
  decimal = 2
) => {
  const modCount = Math.floor(count);
  return modCount === 0
    ? `${zero}`
    : modCount === 1
    ? `${sng}`
    : modCount === 2
    ? `${pair}`
    : modCount >= 3 && modCount <= 10
    ? `${count.toLocaleString('ar-EG', {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })} ${plr}`
    : modCount >= 11 && modCount <= 99
    ? `${count.toLocaleString('ar-EG', {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })} ${sng}\u064B${sng[sng.length - 1] !== '\u0629' ? '\u0627' : ''}`
    : `${count.toLocaleString('ar-EG', {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })} ${sng}\u064D`;
};
