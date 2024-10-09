# Mango Test

## Getting Started

First, run the development server:

```bash
npm install
----
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Exercise
- [x] You have to create the following component: <Range />
- [x] You have to use Nextjs to create the soluBon.

This component has two use modes:
- [x] 1.Normal range from min to max number
- [x] 2.Fixed number of options range

### Normal Range:

- [x] Provide a [http://localhost:8080/exercise1](http://localhost:8080/exercise1) route with the following:

- [x] The component CAN'T be a HTML5 input range. It has to be a custom one.
- [x] The user can drag two bullets through the range line.
- [x] The user can click on both currency number label values (min or max) and set a new value.
- [x] The value will never be less than min or greater than max input values.
- [x] When some bullet is on hover, this bullet has to be bigger and change cursor's type into draggable.
- [x] Dragging a bullet turns cursor to dragging
- [x] Min value and max value can't be crossed in range
- [x] For this example, provide a mocked http service returning min and max values that have to be used in the component. Example: {min: 1, max: 100}. Use https://www.mockable.io/ or a custom mocked server.
- [x] Do as many unit tests as you can.


### Fixed values range:

- [x] Provide a [http://localhost:8080/exercise2](http://localhost:8080/exercise2) route with the following:

- [x] The component CAN'T be a HTML5 input range. It has to be a custom one.
- [x] Given a range of values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] the user will only be able to select those values in range.
- [x] Provide a mocked http service that returns the array of numbers: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]. Use https://www.mockable.io/ or a custom mocked server.
- [x] For this type of range, currency values are not input changable. They have to be only a label
- [x] The user can drag two bullets through the range line.
- [x] Min value and max value can't be crossed in range.
- [x] For this example, provide a mocked service returning min and max values that have to be used in the component. Example: {rangeValues: []}
- [x] Do as many unit tests as you can.
