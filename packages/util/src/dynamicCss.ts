const dynamicCss = (componentName: string, style: Record<string, string | number>) => {
  return Object.entries(style).reduce(
    (result: Record<string, string | number>, [CssProperty, CssValue]) => {
      const dynamicKey = `--dynamic-${componentName}-${CssProperty}`;
      result[dynamicKey] = CssValue;

      return result;
    },
    {}
  );
};

export default dynamicCss;
