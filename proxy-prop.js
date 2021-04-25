import { xc } from 'xtal-element/lib/XtalCore.js';
import { structuralClone } from 'xtal-element/lib/structuralClone.js';
import { passVal, passValToMatches } from 'on-to-me/on-to-me.js';
import 'mut-obs/mut-obs.js';
const p_p_std = 'p_p_std';
const attachedParents = new WeakSet();
/**
 * @element proxy-prop
 */
export class ProxyProp extends HTMLElement {
    constructor() {
        super(...arguments);
        this.propActions = propActions;
        this.self = this;
        this.reactor = new xc.Rx(this);
    }
    subscribe() {
        this.hostToObserve.reactor.subscribe(new Set([this.observeProp]), rs => {
            const currentVal = this.hostToObserve[this.observeProp];
            setVal(this, currentVal);
        });
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs);
        const parent = this.parentElement;
        if (parent !== null) {
            if (!attachedParents.has(parent)) {
                attachedParents.add(parent);
                const mutObs = document.createElement('mut-obs');
                const s = mutObs.setAttribute.bind(mutObs);
                s('bubbles', '');
                s('dispatch', p_p_std);
                s('child-list', '');
                s('observe', 'parentElement');
                s('on', '*');
                parent.appendChild(mutObs);
            }
            parent.addEventListener(p_p_std, e => {
                e.stopPropagation();
                if (this.lastVal !== undefined) {
                    const ae = e;
                    if (this.to !== undefined && ae.detail.match.matches(this.to)) {
                        passValToMatches([ae.detail.match], this.lastVal, this.to, this.careOf, this.prop, this.as);
                    }
                    else {
                        passVal(this.lastVal, this, this.to, this.careOf, this.m, this.from, this.prop, this.as);
                    }
                }
            });
        }
    }
    disconnectedCallback() {
        //if(this.hostToObserve !== undefined)
        //TODO unsubscribe
    }
    onPropChange(n, propDef, nv) {
        this.reactor.addToQueue(propDef, nv);
    }
}
ProxyProp.is = 'proxy-prop';
const onFromRootNodeHost = ({ fromRootNodeHost, self }) => {
    const rn = self.getRootNode();
    if (rn !== undefined) {
        self.hostToObserve = rn.host;
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
    self.subscribe();
};
const onLastVal = ({ lastVal, to: echoTo, careOf, from, prop, as, self }) => {
    passVal(lastVal, self, echoTo, careOf, self.m, from, prop, as);
};
const propActions = [
    onFromRootNodeHost, onHostToObserve, onLastVal
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
const numProp1 = {
    ...baseProp,
    type: Number,
};
const propDefMap = {
    fromRootNodeHost: boolProp2,
    to: strProp1,
    careOf: strProp1,
    from: strProp1,
    prop: strProp1,
    as: strProp1,
    lastVal: objProp2,
    observeProp: strProp2,
    hostToObserve: objProp2,
    m: numProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(ProxyProp, slicedPropDefs, 'onPropChange');
xc.define(ProxyProp);
class PP extends ProxyProp {
}
PP.is = 'p-p';
xc.define(PP);
