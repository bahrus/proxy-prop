import { ProxyProp } from "./proxy-prop.js";
/**
 * @element proxy-prop
 */
export class ProxyPropDoc extends ProxyProp {
    /**
     * Observe property from ShadowRoot Host
     */
    fromHost;
    /**
     * Observe property from parent element
     * @attr from-parent
     */
    fromParent;
    /**
     * Search up the DOM Node Tree for an element matching this css selector
     * @attr from-upsearch
     */
    fromUpsearch;
    /**
     * Name of property to observe
     * @attr observe-prop
     */
    observeProp;
    /**
     * Host to observe.  Normally, this is determined internally.
     * But it can be passed in.
     */
    hostToObserve;
    /**
     * css pattern to match for from downstream siblings.
     * @attr
     */
    to;
    /**
     * Find the closest ancestor matching this css pattern.
     * Use that as the base element to pass down the value from.
     * @attr
     */
    from;
    /**
     * @private
     */
    lastVal;
    /**
     * CSS Selector to use to select single child within the destination element.
     * @attr care-of
     *
     */
    careOf;
    /**
     * Name of property to set on matching (downstream) siblings.
     * @attr
     */
    prop;
    /**
     * Pass value to an attribute
     * @attr as-attr
     */
    as;
    /**
     * Add runtime breakpoints at critical points
     * @attr
     */
    debug;
    /**
     * Add console.logs at critical points
     * @attr
     */
    log;
    /**
     * Maximum number of elements to search for
     * @attr
     */
    m;
}
