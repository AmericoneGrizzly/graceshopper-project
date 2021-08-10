export const displayPrice = (price) => {
  const cents = String(price).slice(String(price).length - 2);
  const dollars = String(price).slice(0, String(price).length - 2);
  return `${dollars}.${cents}`;
};
