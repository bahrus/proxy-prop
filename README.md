# proxy-prop

<a href="https://nodei.co/npm/proxy-prop/"><img src="https://nodei.co/npm/proxy-prop.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/proxy-prop">

proxy-prop is a web component that passes a prop from a higher component to downstream siblings.

One of the most boring boilerplate tasks for markup-centric web components (which may see a resurgence with HTML Modules) is passing public properties of the web component down to sub components within its Shadow DOM realm (possibly with some minor modifications).  And boilerplate JS is expensive, both in terms of performance, and incurs higher risk maintenance costs.  In other words, proxy-prop places a premium on declarative binding, over boilerplate JS.

A component like proxy-prop may be just enough to allow a web component to remain 100% declarative, even as the complexity increases, should declarative web components become a thing.

proxy-prop assumes that it doesn't make sense for all property changes of a web component to emit a corresponding event.

So the only way to pass properties down, then, is for proxy-prop to "subscribe" to property changes.  However, unlike subscribing to events, there is no standard way of subscribing to property changes.

proxy-prop is thus currently tightly coupled with custom elements that follow the reactivity approach of [xtal-element](https://github.com/bahrus/xtal-element).  In particular, proxy-prop assumes / hard-codes (for now) that the components it is binding with supports the following signature:

```TypeScript
hostToObserve.reactor.subscribe(propsToObserve: Set<string>, callback: (reactor: any) => void));
```

**NB:**  This component appears to somewhat buck recent trends in thought as it relates to best practice flow of data.  

## Syntax

```html
<my-custom-element>
    #shadowDOM
        <laissez-dom>
            <template>
                <proxy-prop from-host observe-prop=items to=[-list] ></proxy-prop>
                <i-bid -list></i-bid>
            </template>
        </laissez-dom>
</my-custom-element>
```



## Supported attributes:

from-host
from-closest
from-upsearch

observe-prop

parse-val-as

val => if need subobject
init-val=> if need subobject

closest property means don't use shadow to get container.