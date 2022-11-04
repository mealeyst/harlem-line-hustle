// See https://stackoverflow.com/a/47058976/17128206
export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
    }[Extract<keyof T, string>]

// See https://stackoverflow.com/a/47058976/17128206
export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string
// See https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>
// See https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? '0' extends keyof T // tuples have string keys, return undefined if K is not in tuple
    ? undefined
    : number extends keyof T
    ? T[number]
    : undefined
  : undefined
// See https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? FieldWithPossiblyUndefined<
          | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
          | Extract<T[FieldKey], undefined>,
          Right
        >
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ?
        | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
        | Extract<T[FieldKey], undefined>
    : undefined
  : undefined
