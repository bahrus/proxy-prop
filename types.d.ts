import {PDToFrom} from 'pass-down/types.js';
export interface IProxyPropProps extends PDToFrom {
    fromHost?: boolean,
    observeProp?: string,
    hostToObserve?: Element,
}