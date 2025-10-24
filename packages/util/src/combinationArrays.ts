const combinationArrays = <T>(...arrays: T[][]): T[][] => {
  return arrays.reduce((acc, curr) => acc.flatMap((a: any) => curr.map((b: any) => [...a, b])), [
    [],
  ] as T[][]);
};

export default combinationArrays;
