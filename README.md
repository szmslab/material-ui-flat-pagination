# material-ui-flat-pagination

[![Build Status](https://travis-ci.org/szmslab/material-ui-flat-pagination.svg?branch=master)](https://travis-ci.org/szmslab/material-ui-flat-pagination)
[![Coverage Status](https://coveralls.io/repos/github/szmslab/material-ui-flat-pagination/badge.svg?branch=master)](https://coveralls.io/github/szmslab/material-ui-flat-pagination?branch=master)
[![npm version](https://img.shields.io/npm/v/material-ui-flat-pagination.svg)](https://www.npmjs.com/package/material-ui-flat-pagination)

A pagination component for [Material-UI](https://material-ui.com/) using Button component.

## Compatibility

#### Supported Versions

| material-ui-flat-pagination | Material-UI |
| --------------------------- | ----------- |
| &gt;=3.0.0 | &gt;=1.0.0 |
| 2.x | 0.x |

## Installation

```bash
npm install material-ui-flat-pagination
```

## Demo

[![Demo](./docs/demo.gif)](https://szmslab.github.io/material-ui-flat-pagination/)

#### [Demo](https://szmslab.github.io/material-ui-flat-pagination/)

## Example

```javascript
import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={10}
          offset={this.state.offset}
          total={100}
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`limit`** * | number |  | The number of rows per page. Allow a number greater than or equal to `1`. |
| **`offset`** * | number |  | The number of rows to skip. Allow a number greater than or equal to `0`. |
| **`total`** * | number |  | The total number of rows. Allow a number greater than or equal to `0`. |
| `centerRipple` | bool | false | If true, the ripples of all buttons will be centered. |
| `classes` | object |  | Override or extend the styles applied to the component. See [CSS API](#user-content-css-api) below for more details. |
| `component` | union:<br>&nbsp;string &#124;<br>&nbsp;func &#124;<br>&nbsp;object | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| `currentPageColor` | enum:<br>&nbsp;'default' &#124;<br>&nbsp;'inherit' &#124;<br>&nbsp;'primary' &#124;<br>&nbsp;'secondary' | 'secondary' | The color of the current page button. |
| `disabled` | bool | false | If true, all buttons will be disabled. |
| `disableFocusRipple` | bool | false | If true, the keyboard focus ripple of all buttons will be disabled. |
| `disableRipple` | bool | false | If true, the ripple effect of all buttons will be disabled. |
| `fullWidth` | bool | false | If true, all buttons will take up the full width of its container. |
| `nextPageLabel` | node | '>' | The content of the next page button. |
| `onClick` | func |  | Callback fired when the button is clicked.<br><br>Signature:<br>`function(event: object, offset: number) => void`<br>event: The event source of the callback.<br>offset: The number of new offset. |
| `otherPageColor` | enum:<br>&nbsp;'default' &#124;<br>&nbsp;'inherit' &#124;<br>&nbsp;'primary' &#124;<br>&nbsp;'secondary' | 'primary' | The color of the buttons of other pages excluding the current page. |
| `previousPageLabel` | node | '>' | The content of the previous page button. |
| `reduced` | bool | false | If true, the number of displayed buttons will be reduced. |
| `size` | enum:<br>&nbsp;'small' &#124;<br>&nbsp;'medium' &#124;<br>&nbsp;'large' | 'medium' | The size of all buttons. |

Any other properties supplied will be spread to the root element.

## CSS API

| Name | Description |
| ---- | ----------- |
| `root` | Styles applied to the root element. |
| `rootCurrent` | Styles applied to the root element of the current page button. |
| `rootEllipsis` | Styles applied to the root element of the ellipsis page button. |
| `rootEnd` | Styles applied to the root element of the end page button. |
| `rootStandard` | Styles applied to the root element of the standard page button. |
| `label` | Styles applied to the span element of the page button that wraps the children. |
| `text` | Styles applied to the root element of the page button. |
| `textPrimary` | Styles applied to the root element of the page button if `currentPageColor="primary"` or `otherPageColor="primary"`. |
| `textSecondary` | Styles applied to the root element of the page button if `currentPageColor="secondary"` or `otherPageColor="secondary"`. |
| `colorInherit` | Styles applied to the root element of the page button if `currentPageColor="inherit"` or `otherPageColor="inherit"`. |
| `colorInheritCurrent` | Styles applied to the root element of the current page button if `currentPageColor="inherit"`. |
| `colorInheritOther` | Styles applied to the root element of the other page button if `otherPageColor="inherit"`. |
| `disabled` | Styles applied to the root element of the page button if `disabled={true}`. |
| `sizeSmall` | Styles applied to the root element of the page button if `size="small"`. |
| `sizeLarge` | Styles applied to the root element of the page button if `size="large"`. |
| `fullWidth` | Styles applied to the root element of the page button if `fullWidth={true}.` |

## License

MIT, see [LICENSE](https://github.com/szmslab/material-ui-flat-pagination/blob/master/LICENSE) for details.
