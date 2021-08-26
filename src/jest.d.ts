// FIXME: https://github.com/facebook/jest/issues/11640
export {};

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface
    interface Global {}
  }
}
