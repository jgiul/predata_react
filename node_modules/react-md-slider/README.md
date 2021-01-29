# react-md-slider

A simple and reusable React draggable slider component. ([Demo](https://react-md-slider-ss.netlify.app/))

[![NPM](https://img.shields.io/npm/v/react-md-slider.svg)](https://www.npmjs.com/package/react-md-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install --save react-md-slider
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-md-slider
```

## Usage

```jsx
import React from 'react';
import './App.css';
import Slider from 'react-md-slider';
import 'react-md-slider/dist/index.css';

function App() {
  const [value, setValue] = useState(10);

  return (
    <div className="App">

      <h1>React Number Slider</h1>
      <h4>Value: {value}</h4>

      <div className='example-container'>
        <Slider
          onChange={setValue}
          value={value}
          max={200}
          min={10}
          step={10}
          label="Number slider"¸
          highlighted
        />
      </div>
    </div >
  );
}

export default App;

```
### API Documentation

For component props, methods, and living examples, please see the [Demo](https://react-md-slider-ss.netlify.app/):

## License

MIT © [shreyass27](https://github.com/shreyass27)
