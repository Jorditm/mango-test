interface RangePropsBase {
    isArrayMode: boolean
  }
  
  interface DefaultRangeProps {
    rangeValues?: never;
    min: number;
    max: number;
  
  }
  
  interface FixedRangeProps {
    rangeValues: number[];
    min?: never;
    max?: never;
  }
  
  export type RangeProps = RangePropsBase & (DefaultRangeProps | FixedRangeProps);

  