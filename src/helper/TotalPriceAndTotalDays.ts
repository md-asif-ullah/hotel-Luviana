type Props = {
  price: number;
  roomQuantity: number;
  fromDate: Date;
  toDate: Date;
};

export const TotalPriceAndTotalDays = ({
  price,
  roomQuantity,
  fromDate,
  toDate,
}: Props) => {
  const timeDifference = toDate.getTime() - fromDate.getTime();
  const totalDays =
    timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) : 0;

  const totalPrice = parseFloat((totalDays * price * roomQuantity).toFixed(2));

  return { totalPrice, totalDays };
};
