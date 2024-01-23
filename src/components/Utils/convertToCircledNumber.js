const convertToCircledNumber = (number) => {
  if (number < 0 || number > 9) {
    throw new Error('Number should be between 0 and 9');
  }
  
  const circledNumbers = [
    '\u24EA', // ⓪
    '\u2460', // ①
    '\u2461', // ②
    '\u2462', // ③
    '\u2463', // ④
    '\u2464', // ⑤
    '\u2465', // ⑥
    '\u2466', // ⑦
    '\u2467', // ⑧
    '\u2468'  // ⑨
  ];

  return circledNumbers[number];
}

export default convertToCircledNumber;