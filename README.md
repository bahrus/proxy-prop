# proxy-prop
Web component that passes a prop from higher component down

## Syntax

Use case I:

```html

...
<laissez-dom>
    <template>
        <proxy-prop from-root-node-host observe-prop=items echo-to=[-list] ></proxy-prop>
        <i-bid -list></i-bid>
    </template>
</laissez-dom>
```

attributes:

from-root-node-host
from-closest
from-upsearch

observe-prop

parse-val-as

val => if need subobject
init-val=> if need subobject

closest property means don't use shadow to get container.