import { ASTFunction, ASTNativeFunction } from "../ast/ast";

export type TypeDescription = {
    kind: 'struct' | 'primitive' | 'contract';
    name: string;
    fields: FieldDescription[];
    functions: FunctionDescription[];
}

export type TypeRef = {
    kind: 'direct',
    name: string;
} | {
    kind: 'optional',
    inner: TypeRef
};

export type FieldDescription = {
    name: string,
    index: number,
    type: TypeRef
}

export type FunctionArgument = {
    name: string,
    type: TypeRef
}

export type FunctionDescription = {
    name: string,
    isPublic: boolean,
    isGetter: boolean,
    self: TypeDescription | null,
    returns: TypeRef | null,
    args: FunctionArgument[],
    ast: ASTFunction | ASTNativeFunction
}

export function printTypeRef(src: TypeRef): string {
    if (src.kind === 'direct') {
        return src.name;
    } else if (src.kind === 'optional') {
        return printTypeRef(src.inner) + '?';
    } else {
        throw Error('Invalid type ref');
    }
}