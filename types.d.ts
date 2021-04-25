export interface IProxyPropProps {
    fromRootNodeHost?: boolean,
    to?: string,
    careOf?: string,
    from?: string,
    prop?: string,
    as?: 'str-attr' | 'bool-attr' | 'obj-attr',
    lastVal: any,
    observeProp?: string,
    hostToObserve?: Element,
    m?: number,
}