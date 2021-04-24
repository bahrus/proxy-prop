import {xc, PropAction, PropDef, PropDefMap, ReactiveSurface, IReactor} from 'xtal-element/lib/XtalCore.js';
import {structuralClone} from 'xtal-element/lib/structuralClone.js';
import {passVal} from 'on-to-me/on-to-me.js';
import  'mut-obs/mut-obs.js';
import {MutObs} from 'mut-obs/mut-obs.js';

const p_p_std = 'p_p_std';
const attachedParents = new WeakSet<Element>();
/**
 * @element proxy-prop
 */
export class ProxyProp extends HTMLElement implements ReactiveSurface{
    static is = 'proxy-prop';
    propActions = propActions;
    self =  this;
    reactor: IReactor = new xc.Rx(this);

    fromRootNodeHost: boolean | undefined;

    hostToObserve: Element | undefined;

    observeProp: string | undefined;

    echoTo: string | undefined;

    from: string | undefined;

    careOf: string | undefined;

    prop: string | undefined;

    m: number | undefined;

    as: 'str-attr' | 'bool-attr' | 'obj-attr' | undefined;

    lastVal: any;

    subscribe(){
        (<ReactiveSurface>this.hostToObserve!).reactor!.subscribe(new Set([this.observeProp!]), rs => {
            const currentVal = (<any>this.hostToObserve!)[this.observeProp!];
            setVal(this, currentVal);
        })
    }

    connectedCallback(){
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs);
        const parent = this.parentElement;
        if(parent !== null){
            if(!attachedParents.has(parent)){
                attachedParents.add(parent);
                const mutObs = document.createElement('mut-obs') as MutObs;
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
                if(this.lastVal !== undefined){
                    passVal(this.lastVal, this, this.echoTo, this.careOf, this.m, this.from, this.prop, this.as);
                }
            })
        }        
    }
    disconnectedCallback(){
        //if(this.hostToObserve !== undefined)
        //TODO unsubscribe
    }
    onPropChange(n: string, propDef: PropDef, nv: any){
        this.reactor.addToQueue(propDef, nv);
    }
}

type P = ProxyProp;

const onFromRootNodeHost = ({fromRootNodeHost, self}: P) => {
    const rn = self.getRootNode();
    if(rn !== undefined){
        self.hostToObserve = (<any>rn).host as HTMLElement;
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
    self.subscribe();
};

const onLastVal = ({lastVal, echoTo, careOf, from, prop, as,  self}: P) => {
    passVal(lastVal, self, echoTo, careOf, self.m, from, prop, as);
};

const propActions = [
    onFromRootNodeHost, onHostToObserve, onLastVal
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
const numProp1: PropDef = {
    ...baseProp,
    type: Number,
};
const propDefMap: PropDefMap<P> = {
    fromRootNodeHost: boolProp2,
    echoTo: strProp1,
    careOf: strProp1,
    from: strProp1,
    prop: strProp1,
    as: strProp1,
    lastVal: objProp2,
    observeProp: strProp2,
    hostToObserve: objProp2,
    m: numProp1,
}

const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(ProxyProp, slicedPropDefs);

xc.define(ProxyProp);