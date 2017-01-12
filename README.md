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

### Options

#### `id`

Change the default named export `{style}`:
```json
loader: 'css-loader!namespace-css-module-loader?id=root'
```
```js
import {root} from './app.scss';
...
<div className={root}>
```

#### `descendant`

(default: true)

Making rule a descendant of the namespace (default)
```json
loader: 'css-loader!namespace-css-module-loader?descendant'
```
input:
```css
.a .b {...}
```
output:
```css
.2Jlr3B .a .b {...}
```

#### `combine`

Combine the rule with the namespace instead of making it a descendant
```json
loader: 'css-loader!namespace-css-module-loader?combine'
```
input:
```css
.a .b {...}
```
output:
```css
.a.2Jlr3B .b {...}
```

#### `combine` & `descendant`

Both options can be used together to group the rules:
```json
loader: 'css-loader!namespace-css-module-loader?combine&descendant'
```
input:
```css
.a .b {...}
```
output:
```css
.a.2Jlr3B .b, .2Jlr3B .a .b {...}
```

## Issues

### Hot Module Replacement

It probably has nothing to do with this module but if HMR isn't working correctly try adding [webpack-module-hot-accept] to all your JS files.

> it hot-reloads only if [you] have a module.hot.accept() call in the JS that require-s the CSS Module. ([react-css-modules#51](https://github.com/gajus/react-css-modules/issues/51))

related: [css-loader#186](https://github.com/webpack/css-loader/issues/186)

[webpack-module-hot-accept]: https://github.com/loggur/webpack-module-hot-accept
