import {PDFrom} from 'pass-down/types.d.js';
export interface IProxyPropProps extends PDFrom {
    fromRootNodeHost?: boolean,
    to?: string,
    careOf?: string,
    prop?: string,
    as?: 'str-attr' | 'bool-attr' | 'obj-attr',
    lastVal: any,
    observeProp?: string,
    hostToObserve?: Element,
    m?: number,
}