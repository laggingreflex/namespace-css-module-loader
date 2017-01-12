# namespace-css-module-loader

[![npm](https://img.shields.io/npm/v/namespace-css-module-loader.svg)](https://www.npmjs.com/package/namespace-css-module-loader)

[Webpack]'s [css-loader] implements [CSS Modules] by giving every `.class` a unique hash which you then have to bind to your element/complement.

[CSS Modules]: https://github.com/css-modules/css-modules
[webpack]: http://webpack.js.org
[css-loader]: https://github.com/webpack/css-loader

```css
.a { ... }
.b { ... }
```
output with regular CSS Modules (webpack css-loader):
```css
.dz1R8A {  /* a different hash */ }
.JkxzOD {  /* for each rule */ }
```

**namespace-css-module-loader**, as the name suggests, only gives **one** unique **hash** (a namespace) to **all** rules:

```css
.2Jlr3B .a { /* both “wrapped” in the same hash */ }
.2Jlr3B .b { /* giving your rules a single namespace */ }
```

This hash is available as a single named export: `{style}` which you only need to include in the parent `div`:

```js
import {style} from './style.scss';
export default <div className={style}>
  <div class='a'></div>
  <div class='b'></div>
</div>
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

Provide options to the module as a query string or query object

```json
loader: 'css-loader!namespace-css-module-loader?id=root'
```
```js
loader: ['css-loader', {
  loader: 'namespace-css-module-loader',
  query: {
    id: 'root'
  }
}]
```

#### `id` (string) (default: 'style')

Change the default named export `{style}`:
```js
import {root} from './app.scss';
export default <div className={root}></div>
```

#### `descendant` (boolean) (default: true)

Make the rule descendant of the namespace (default)
```css
.a .b {...}
/* => */
.2Jlr3B .a .b {...}
```

#### `combine` (boolean)

Combine the rule with the namespace instead of making it a descendant
```css
.a .b {...}
/* => */
.a.2Jlr3B .b {...}
```

#### `combine` & `descendant`

Both options can be used together to group the rules:
```css
.a .b {...}
/* => */
.a.2Jlr3B .b, .2Jlr3B .a .b {...}
```

## Issues

### Hot Module Replacement

It probably has nothing to do with this module but if HMR isn't working correctly try adding [webpack-module-hot-accept] to all your JS files.

> it hot-reloads only if [you] have a module.hot.accept() call in the JS that require-s the CSS Module. ([react-css-modules#51](https://github.com/gajus/react-css-modules/issues/51))

related: [css-loader#186](https://github.com/webpack/css-loader/issues/186)

[webpack-module-hot-accept]: https://github.com/loggur/webpack-module-hot-accept
