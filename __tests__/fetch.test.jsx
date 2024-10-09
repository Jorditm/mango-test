import jest from "jest"
import { getPrices, getArrayPrices } from '@/actions';
import { beforeEach } from "node:test";


global.fetch = jest?.fn();

describe('getPrices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches prices correctly', async () => {
    const mockPrices = { min: 3, max: 200 };

    global.fetch?.mockResolvedValueOnce({
      json: jest?.fn().mockResolvedValueOnce(mockPrices)
    });

    const result = await getPrices();

    expect(result).toEqual(mockPrices);
  });
});

describe('getArrayPrices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches fixed prices correctly', async () => {
    const mockPrices = { "rangeValues": [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] };

    global.fetch?.mockResolvedValueOnce({
      json: jest?.fn().mockResolvedValueOnce(mockPrices)
    });

    const result = await getArrayPrices();

    expect(result).toEqual(mockPrices);
  });
});