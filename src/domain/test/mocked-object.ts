import { Mock } from 'vitest';

type MockedObject<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Result ? Mock<Args, Result> : T[K];
};

export const mockedObject = <T>(object: Partial<T>) => object as MockedObject<T>;
