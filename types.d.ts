import {PDToFrom} from 'pass-down/types.js';
export interface IProxyPropProps extends PDToFrom {
    fromRootNodeHost?: boolean,
    observeProp?: string,
    hostToObserve?: Element,
}