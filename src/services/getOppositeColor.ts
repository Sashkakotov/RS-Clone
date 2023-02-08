const getOppositeColor = (color: string) => {
  const MAX_COLOR = 'FFFFFF';
  const maxColorDecimal = parseInt(MAX_COLOR, 16);
  const colorDecimal = parseInt(color.slice(1), 16);
  const oppositeDecimal = maxColorDecimal - colorDecimal;
  return `#${oppositeDecimal.toString(16)}`;
};

export default getOppositeColor;
