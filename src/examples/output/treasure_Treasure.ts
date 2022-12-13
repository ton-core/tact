import { Cell, Slice, StackItem, Address, Builder, InternalMessage, CommonMessageInfo, CellMessage, beginCell, serializeDict } from 'ton';
import { ContractExecutor } from 'ton-nodejs';
import BN from 'bn.js';
import { deploy } from '../../abi/deploy';

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: BigInt;
    mode: BigInt;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function packSendParameters(src: SendParameters): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounce);
    b_0 = b_0.storeAddress(src.to);
    b_0 = b_0.storeInt(new BN(src.value.toString(10), 10), 257);
    b_0 = b_0.storeInt(new BN(src.mode.toString(10), 10), 257);
    if (src.body !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.body);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.code !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.code);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.data !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.data);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: BigInt;
}

export function packContext(src: Context): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounced);
    b_0 = b_0.storeAddress(src.sender);
    b_0 = b_0.storeInt(new BN(src.value.toString(10), 10), 257);
    return b_0.endCell();
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function packStateInit(src: StateInit): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeRef(src.code);
    b_0 = b_0.storeRef(src.data);
    return b_0.endCell();
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function packChangeOwner(src: ChangeOwner): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3067051791, 32);
    b_0 = b_0.storeAddress(src.newOwner);
    return b_0.endCell();
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: BigInt;
    mode: BigInt;
}

export function packWithdraw(src: Withdraw): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(1286094280, 32);
    b_0 = b_0.storeCoins(new BN(src.amount.toString(10), 10));
    b_0 = b_0.storeUint(new BN(src.mode.toString(10), 10), 8);
    return b_0.endCell();
}

export function Treasure_init(owner: Address) {
    const __code = 'te6ccgECHAEAAh8AART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAaGwIBIAYHAgFIEBECAdQICQIBWAwNAvE7ftwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAwVEEVbwP4YQKRW+AgghBMqD3Iuo4uMO1E0NQB+GL6QAExAdMfAYIQTKg9yLry4GT6ANMHWWwS8BPI+EIBzAHPFsntVOAgghC2z38PuuMCwACRMOMN8sBkgCgsACQgbvJOgAFYw7UTQ1AH4YvpAATEB0x8BghC2z38PuvLgZPpAATHwFcj4QgHMAc8Wye1UAIT5AYLwmGwroSS7kofrSgvY0xBOHABno8k5UtiJx00IGFvTDU26jhrtRNDUAfhi+kABMfAUyPhCAcwBzxbJ7VTbMeAAFVlH8BygDgcAHKAIAgEgDg8A6zIcQHKARfKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjjV/8A3IcPANcPANJG6zlX/wDRTMlTQDcPAN4iRus5V/8A0UzJU0A3DwDeJw8A0Cf/ANAslYzJYzMwFw8A3iIW6zmX8BygAB8AEBzJRwMsoA4skB+wCAADwByMwBzxbJgAgEgEhMCAUgYGQIBIBQVAgEgFhcAGT4QW8jMDEhxwXy4GSAAHwC8BB/yMlUEwJQVW1t8A6AAASAABTwEYAANHCBAKDwEYAAJAHwEDCAAH74o72omhqAPwxfSAAmPgJQACb75d4B8';
    const depends = new Map<string, Cell>();
    let systemCell = beginCell().storeDict(null).endCell();
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: systemCell });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
    return deploy(__code, 'init_Treasure', __stack); 
}

export class Treasure {
            
    readonly executor: ContractExecutor; 
    constructor(executor: ContractExecutor) { this.executor = executor; } 
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: Withdraw | 'Destroy' | ChangeOwner) {
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = packWithdraw(message);
        }
        if (message === 'Destroy') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = packChangeOwner(message);
        }
        if (body === null) { throw new Error('Invalid message type'); }
        await this.executor.internal(new InternalMessage({
            to: this.executor.address,
            from: args.from || this.executor.address,
            bounce: false,
            value: args.amount,
            body: new CommonMessageInfo({
                body: new CellMessage(body!)
            })
        }), { debug: args.debug });
    }
    async getOwner() {
        let __stack: StackItem[] = [];
        let result = await this.executor.get('owner', __stack);
        return result.stack.readAddress()!;
    }
}