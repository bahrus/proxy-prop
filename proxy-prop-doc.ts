import { ProxyProp } from "./proxy-prop.js";
import {asAttr} from 'on-to-me/types.js';

/**
 * @element proxy-prop
 */
export class ProxyPropDoc extends ProxyProp{
    /**
     * Observe property from ShadowRoot Host
     */
    fromHost: boolean | undefined;
    /**
     * Observe property from parent element
     * @attr from-parent
     */
    fromParent: boolean | undefined;
    /**
     * Search up the DOM Node Tree for an element matching this css selector
     * @attr from-upsearch
     */
    fromUpsearch: string | undefined;
    /**
     * Name of property to observe
     * @attr observe-prop
     */
    observeProp: string | undefined;
    /**
     * Host to observe.  Normally, this is determined internally.
     * But it can be passed in.
     */
    hostToObserve: Element | undefined;

    /**
     * css pattern to match for from downstream siblings.
     * @attr
     */
    to?: string | undefined;

    /**
     * Find the closest ancestor matching this css pattern.
     * Use that as the base element to pass down the value from.
     * @attr
     */
    from?: string | undefined;

    /**
     * @private
     */
    lastVal?: any;

    /**
     * CSS Selector to use to select single child within the destination element.
     * @attr care-of
     * 
     */
    careOf?: string | undefined;

    /**
     * Name of property to set on matching (downstream) siblings.
     * @attr
     */
    prop?: string | undefined;

    /**
     * Pass value to an attribute
     * @attr as-attr
     */
    as?: asAttr | undefined;

    /**
     * Add runtime breakpoints at critical points
     * @attr
     */
    debug?: boolean | undefined;

    /**
     * Add console.logs at critical points
     * @attr
     */
    log?: boolean | undefined;

    /**
     * Maximum number of elements to search for
     * @attr
     */
    m?: number | undefined;

}