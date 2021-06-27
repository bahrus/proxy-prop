import { xc } from 'xtal-element/lib/XtalCore.js';
import { structuralClone } from 'xtal-element/lib/structuralClone.js';
import { passVal } from 'on-to-me/on-to-me.js';
import { addDefaultMutObs } from 'pass-down/pdUtils.js';
import 'mut-obs/mut-obs.js';
import { MutObs } from 'mut-obs/mut-obs.js';
export class ProxyProp extends HTMLElement {
    static is = 'proxy-prop';
    propActions = propActions;
    self = this;
    reactor = new xc.Rx(this);
    subscribe(self) {
        self.hostToObserve.reactor.subscribe(new Set([self.observeProp]), rs => {
            const currentVal = self.hostToObserve[self.observeProp];
            setVal(this, currentVal);
        });
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.mergeProps(this, slicedPropDefs);
        addDefaultMutObs(this);
    }
    disconnectedCallback() {
        const m = MutObs.toString;
        //if(this.hostToObserve !== undefined)
        //TODO unsubscribe
    }
    onPropChange(n, propDef, nv) {
        this.reactor.addToQueue(propDef, nv);
    }
}
export function upSearch(el, css) {
    if (css === 'parentElement')
        return el.parentElement;
    let upEl = el.previousElementSibling || el.parentElement;
    while (upEl && !upEl.matches(css)) {
        upEl = upEl.previousElementSibling || upEl.parentElement;
    }
    return upEl;
}
const onFromRootNodeHost = ({ fromHost, self }) => {
    const rn = self.getRootNode();
    if (rn !== undefined) {
        self.hostToObserve = rn.host;
    }
};
const onFromUpsearch = ({ fromUpsearch, self }) => {
    const up = upSearch(self, fromUpsearch);
    if (up !== null) {
        self.hostToObserve = up;
    }
};
const onFromParent = ({ fromParent, self }) => {
    const parent = self.parentElement;
    if (parent !== null) {
        self.hostToObserve = parent;
    }
};
function setVal(self, currentVal) {
    if (currentVal !== undefined) {
        if (typeof currentVal === 'object') {
            self.lastVal = structuralClone(currentVal);
        }
        else {
            self.lastVal = currentVal;
        }
    }
}
const onHostToObserve = ({ hostToObserve, observeProp, self }) => {
    const currentVal = hostToObserve[observeProp];
    setVal(self, currentVal);
    self.subscribe(self);
};
const onLastVal = ({ lastVal, to: echoTo, careOf, from, prop, as, self }) => {
    passVal(lastVal, self, echoTo, careOf, self.m, from, prop, as);
};
const propActions = [
    onFromRootNodeHost, onHostToObserve, onLastVal, onFromUpsearch, onFromParent
];
const baseProp = {
    dry: true,
    async: true,
};
const boolProp1 = {
    ...baseProp,
    type: Boolean,
};
const boolProp2 = {
    ...boolProp1,
    stopReactionsIfFalsy: true,
};
const strProp1 = {
    ...baseProp,
    type: String,
};
const strProp2 = {
    ...strProp1,
    stopReactionsIfFalsy: true,
};
const objProp1 = {
    ...baseProp,
    type: Object
};
const objProp2 = {
    ...objProp1,
    stopReactionsIfFalsy: true,
};
const objProp3 = {
    async: true,
    type: Object,
};
const objProp4 = {
    ...objProp3,
    stopReactionsIfFalsy: true,
    parse: true,
};
const numProp1 = {
    ...baseProp,
    type: Number,
};
const propDefMap = {
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
class PP extends ProxyProp {
    static is = 'p-p';
}
xc.define(PP);
