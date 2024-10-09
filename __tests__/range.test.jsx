import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Range from "@/components/Range";


describe("Range", () => {
  it("renders a range with range mode", () => {
    render(<Range isArrayMode={false} min={0} max={10} />);

    const range = screen.getByRole("range");

    expect(range).toBeInTheDocument();
  }),

  it("renders an array of values with array mode", () => {
    render(<Range isArrayMode={true} rangeValues={[5.99, 10.99, 20.99]} />);

    const range = screen.getByRole("range");

    expect(range).toBeInTheDocument();
  }),


    it('renders slider-min and slider-max in the document with range mode', () => {
      render(<Range isArrayMode={false} min={0} max={100} />);

      const sliderMin = screen.getByTestId('slider-min');
      const sliderMax = screen.getByTestId('slider-max');

      expect(sliderMin).toBeInTheDocument();
      expect(sliderMax).toBeInTheDocument();
    }),

    it("receives a numerical value in min and a numerical value in max, they appear in the inputs", () => {
      const mockMin = 5;
      const mockMax = 10;
      render(<Range isArrayMode={false} min={mockMin} max={mockMax} />);

      const minValueInput = screen.getByTestId("min-input");
      const maxValueInput = screen.getByTestId("max-input");

      expect(minValueInput).toHaveValue(mockMin);
      expect(maxValueInput).toHaveValue(mockMax);
    }),

    it("receives a NaN as min value and returns 0", () => {
      render(<Range isArrayMode={false} min={undefined} max={10} />);

      const minValue = screen.getByTestId("min-input");

      expect(minValue).toHaveValue(0);
    }),

    it("receives a NaN as max value and returns min value plus 25", () => {
      const mockMin = 5;
      const expectedValue = mockMin + 25;
      render(<Range isArrayMode={false} min={mockMin} max={undefined} />);

      const maxValue = screen.getByTestId("max-input");

      expect(maxValue).toHaveValue(expectedValue);
    }),

    it("reders a € symbol", () => {

      render(<Range isArrayMode={false} min={2} max={10} />);

      const symbolMin = screen.getByTestId("symbol-min");
      const symbolMax = screen.getByTestId("symbol-max");

      expect(symbolMin).toHaveTextContent("€");
      expect(symbolMax).toHaveTextContent("€");
    }),

    it("should print the min - 5 value when input is more than max", () => {
      const mockMin = 5;
      render(<Range isArrayMode={false} min={mockMin} max={30} />);
  
      const minValueInput = screen.getByTestId("min-input");
  
      fireEvent.change(minValueInput, { target: { value: 32 } });
  
      expect(minValueInput).toHaveValue(25);
    }),

    it("should print the min value on blur if input is less than min", () => {
      const mockMin = 5;
      render(<Range isArrayMode={false} min={mockMin} max={10} />);
  
      const minValueInput = screen.getByTestId("min-input");
  
      fireEvent.change(minValueInput, { target: { value: 3 } });
      expect(minValueInput).toHaveValue(3); 
      
      fireEvent.blur(minValueInput);
      expect(minValueInput).toHaveValue(mockMin);
    }),


    it("should print the max value when input is more than max", () => {
      const mockMax = 50;
      render(<Range isArrayMode={false} min={0} max={mockMax} />);
  
      const maxValueInput = screen.getByTestId("max-input");
  
      fireEvent.change(maxValueInput, { target: { value: 55 } });
  
      expect(maxValueInput).toHaveValue(mockMax);
    }),

    it('renders slider-min and slider-max in the document with array mode', () => {
      render(<Range isArrayMode={true} rangeValues={[5.99, 10.99, 20.99]} />);
      
      const sliderMin = screen.getByTestId('slider-min');
      const sliderMax = screen.getByTestId('slider-max');
  
      expect(sliderMin).toBeInTheDocument();
      expect(sliderMax).toBeInTheDocument();
    }),
  
      it("receives a numerical array values, they appear in the labels", () => {
  
        const rangeValues = [1.99, 2.99, 3.99];
      render(<Range isArrayMode={true} rangeValues={rangeValues} />);
  
        const minValue = screen.getByTestId("min-label");
        const maxValue = screen.getByTestId("max-label");
  
      const expectedMinValue = new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(rangeValues[0]);
      const expectedMaxValue = new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(rangeValues[rangeValues.length-1]);

      expect(minValue.textContent.trim()).toBe(expectedMinValue);
      expect(maxValue.textContent.trim()).toBe(expectedMaxValue);
    }),
  
  it("receives an empty array, return an array with [1.99, 19.99]", () => {
    render(<Range isArrayMode={true} rangeValues={[]} />);

    const minValue = screen.getByTestId("min-label");
      const maxValue = screen.getByTestId("max-label")
  
      
    const expectedMinValue = new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(1.99);
    const expectedMaxValue = new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(19.99);

    expect(minValue.textContent.trim()).toBe(expectedMinValue);
    expect(maxValue.textContent.trim()).toBe(expectedMaxValue);
  }),

  it("receives an array with two NaN elements, it returns an array with [1.99, 19.99] ", () => {

    const range = [NaN, NaN];
      render(<Range isArrayMode={true} rangeValues={range} />);

      const minValue = screen.getByTestId("min-label");
      const maxValue = screen.getByTestId("max-label");

      const expectedMinValue = new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(1.99);
      const expectedMaxValue = new Intl.NumberFormat("es-ES", { style: 'currency', currency: 'EUR' }).format(19.99);

      expect(minValue.textContent.trim()).toBe(expectedMinValue);
      expect(maxValue.textContent.trim()).toBe(expectedMaxValue);

    })
});
