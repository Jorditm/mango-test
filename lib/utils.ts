export const findClosestValue = (target: number, array: number[]): number => {
    let closest = array[0];
    let minDiff = Math.abs(target - closest);

    array.forEach(value => {
        const diff = Math.abs(target - value);
        if (diff < minDiff) {
            minDiff = diff;
            closest = value;
        }
    })

    return closest;
  };
