type Props = {
  price: number;
  fromDate: Date;
  toDate: Date;
};

export const TotalPriceAndTotalDays = ({ price, fromDate, toDate }: Props) => {
  if (!fromDate || !toDate || fromDate >= toDate) {
    return { totalPrice: 0, totalDays: 0 };
  }

  const timeDifference = toDate.getTime() - fromDate.getTime();
  const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const totalPrice = parseFloat((totalDays * price).toFixed(2));

  return { totalPrice, totalDays };
};
