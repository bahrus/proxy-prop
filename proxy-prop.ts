import {xc, PropAction, PropDef, PropDefMap, ReactiveSurface, IReactor} from 'xtal-element/lib/XtalCore.js';
import {structuralClone} from 'xtal-element/lib/structuralClone.js';
import {passVal} from 'on-to-me/on-to-me.js';
import {addDefaultMutObs, handleValChange, attachMutationEventHandler} from 'pass-down/pdUtils.js';

import  'mut-obs/mut-obs.js';
import {MutObs} from 'mut-obs/mut-obs.js';
import {IProxyPropProps} from './types.d.js';


export class ProxyProp extends HTMLElement implements ReactiveSurface, IProxyPropProps{
    static is = 'proxy-prop';
    propActions = propActions;
    self =  this;
    reactor: IReactor = new xc.Rx(this);

    subscribe(self: IProxyPropProps){
        (<ReactiveSurface>self.hostToObserve!).reactor!.subscribe(new Set([self.observeProp!]), rs => {
            const currentVal = (<any>self.hostToObserve!)[self.observeProp!];
            setVal(this, currentVal);
        });
    }

    connectedCallback(){
        this.style.display = 'none';
        xc.mergeProps(this, slicedPropDefs);
        addDefaultMutObs(this);
    }
    disconnectedCallback(){
        const m = MutObs.toString;
        //if(this.hostToObserve !== undefined)
        //TODO unsubscribe
    }
    onPropChange(n: string, propDef: PropDef, nv: any){
        this.reactor.addToQueue(propDef, nv);
    }
}

export function upSearch(el: Element, css: string){
    if(css === 'parentElement') return el.parentElement;
    let upEl = el.previousElementSibling || el.parentElement;
    while(upEl && !upEl.matches(css)){
        upEl = upEl.previousElementSibling || upEl.parentElement;
    }
    return upEl;
}

type P = IProxyPropProps;

const onFromRootNodeHost = ({fromHost, self}: P) => {
    const rn = self.getRootNode();
    if(rn !== undefined){
        self.hostToObserve = (<any>rn).host as HTMLElement;
    }
};

const onFromUpsearch = ({fromUpsearch, self}: P) => {
    const up = upSearch(self, fromUpsearch!);
    if(up !== null){
        self.hostToObserve = up;
    }
};

const onFromParent = ({fromParent, self}: P) => {
    const parent = self.parentElement;
    if(parent !== null){
        self.hostToObserve = parent;
    }
};

function setVal(self: P, currentVal: any){
    if(currentVal !== undefined){
        if(typeof currentVal === 'object'){
            self.lastVal = structuralClone(currentVal);
        }else{
            self.lastVal = currentVal;
        }
    }
}

const onHostToObserve = ({hostToObserve, observeProp, self}: P) => {
    const currentVal = (<any>hostToObserve!)[observeProp!];
    setVal(self, currentVal);
    self.subscribe(self);
};

const onLastVal = ({lastVal, to: echoTo, careOf, from, prop, as,  self}: P) => {
    passVal(lastVal, self, echoTo, careOf, self.m, from, prop, as);
};

const propActions = [
    onFromRootNodeHost, onHostToObserve, onLastVal, onFromUpsearch, onFromParent
] as PropAction[];

const baseProp: PropDef = {
    dry: true,
    async: true,
};
const boolProp1: PropDef = {
    ...baseProp,
    type: Boolean,
}
const boolProp2: PropDef = {
    ...boolProp1,
    stopReactionsIfFalsy: true,
}
const strProp1: PropDef = {
    ...baseProp,
    type: String,
};
const strProp2: PropDef = {
    ...strProp1,
    stopReactionsIfFalsy: true,
};
const objProp1: PropDef = {
    ...baseProp,
    type: Object
};
const objProp2: PropDef = {
    ...objProp1,
    stopReactionsIfFalsy: true,
};
const objProp3: PropDef = {
    async: true,
    type: Object,
};
const objProp4: PropDef = {
    ...objProp3,
    stopReactionsIfFalsy: true,
    parse: true,
};
const numProp1: PropDef = {
    ...baseProp,
    type: Number,
};
const propDefMap: PropDefMap<P> = {
    fromHost: boolProp2,
    fromUpsearch: strProp2,
    fromParent: boolProp2,
    to: strProp1,
    careOf: strProp1,
    from: strProp1,
    prop: strProp1,
    as: strProp1,
    lastVal: objProp3,
    observeProp: strProp2,
    hostToObserve: objProp2,
    //mutateEvents: objProp4,
    m: numProp1,
    log: boolProp1,
    debug: boolProp1,
};

const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(ProxyProp, slicedPropDefs, 'onPropChange');

xc.define(ProxyProp);

declare global {
    interface HTMLElementTagNameMap {
        'proxy-prop': ProxyProp;
    }
}

class PP extends ProxyProp{
    static is = 'p-p';
}
xc.define(PP);

declare global {
    interface HTMLElementTagNameMap {
        'p-p': PP;
    }
}