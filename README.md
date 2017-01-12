# namespace-css-module-loader

Webpack CSS Module loader to namespace all rules with a single hash.

## input
```css
.a {
  background: blue;
}
.b {
  background: red;
}
```
## output
### with regular CSS Modules:
a different hash for each rule:
```css
.dz1R8A {
  background: blue;
}
.JkxzOD {
  background: red;
}
```
### with **this** module:
a different hash for each ***file*** shared by all rules in it:
```css
.2Jlr3B .a {          // both “wrapped” in the same hash
  background: blue;
}
.2Jlr3B .b {          // giving your rules a single namespace
  background: red;
}
```
The hash is available as named export: `{style}`. You only need to include this in the parent `div`:
```js
import {style} from './style.scss';
export default () => <div>
    <div className={style}>
        <div class='a'></div> // blue
        <div class='a'></div> // red
    </div>
    <div>
        <div class='a'></div> // not blue
        <div class='a'></div> // not red
    </div>
</div>;
```

## Install
```sh
npm i namespace-css-module-loader
```
## Usage
In your webpack config:
```json
loader: 'css-loader!namespace-css-module-loader'
```
Use it after pre-processors, it only works on pure CSS
```json
loader: 'css-loader?importLoaders=3!postcss-loader!namespace-css-module-loader!sass-loader'
                                         ...      <-          ^               <-  pre
```
Pass an `'id=…'` to change the default named import `{style}`:
```json
loader: 'css-loader!namespace-css-module-loader?id=root'
```
```js
import {root} from './style.scss';
...
<div className={root}>
```
