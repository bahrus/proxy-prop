import {PDToFrom} from 'pass-down/types.js';
import {ProxyProp} from './proxy-prop.js';
export interface IProxyPropProps extends PDToFrom {
    self: IProxyPropProps;
    /**
     * Observe property from ShadowRoot Host
     */
    fromHost?: boolean,
    /**
     * Observe property from parent element
     * @attr from-parent
     */
    fromParent?: boolean,
    /**
     * Search up the DOM Node Tree for an element matching this css selector
     * @attr from-upsearch
     */
    fromUpsearch?: string | undefined;
    /**
     * Name of property to observe
     * @attr observe-prop
     */
    observeProp?: string;
    /**
     * Host to observe.  Normally, this is determined internally.
     * But it can be passed in.
     */
    hostToObserve?: Element;
    //mutateEvents?: string[] | undefined;
    subscribe(self: IProxyPropProps): void;
}