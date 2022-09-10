export type Action<Type extends string, Payload> = { type: Type } & Payload;

export const createAction = <Type extends string, Payload>(type: Type, payload?: Payload) => {
  return { type, ...payload } as Action<Type, Payload>;
};
