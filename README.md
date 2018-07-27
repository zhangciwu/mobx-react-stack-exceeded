# mobx-react-stack-exceeded

This is a repo to reproduce a problem of mobx-react in minimal code.

```
RangeError: Maximum call stack size exceeded
    at NameDisplayer.getAtom (node_modules/mobx-react/index.js:867:21)
    at NameDisplayer.get$$1 [as props] (node_modules/mobx-react/index.js:877:21)
    at NameDisplayer.render (index.jsx:11:20)
    at NameDisplayer.makeComponentReactive (node_modules/mobx-react/index.js:740:56)
    at NameDisplayer.target.render (node_modules/mobx-react/index.js:962:38)
    at NameDisplayer.makeComponentReactive (node_modules/mobx-react/index.js:740:56)
    at NameDisplayer.target.render (node_modules/mobx-react/index.js:962:38)
    at NameDisplayer.makeComponentReactive (node_modules/mobx-react/index.js:740:56)

```

When doing some pressure test on my app, I got some error like this. (file path prefix got striped)

After many inspects, I found `observer(SomeComponment)` did some altering into `SomeComponment`. 

It seems small, just wrap `SomeComponment.prototype.render` with another function which will call it later.

But after many times, the call stack is too many, finally turns into the exception of the top block.

# How to use

```
npm i
npm run index
```

I got the error at 9603th loop (may vary between platforms)

# Source code

see `index.jsx` 

the "Altering" happens at line 18.