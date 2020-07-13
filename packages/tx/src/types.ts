import { BN, toBuffer, unpadBuffer } from 'ethereumjs-util'

/**
 * An object with an optional field with each of the transaction's values.
 */
export interface TxData {
  /**
   * The transaction's nonce.
   */
  nonce?: BNLike

  /**
   * The transaction's gas price.
   */
  gasPrice?: BNLike

  /**
   * The transaction's gas limit.
   */
  gasLimit?: BNLike

  /**
   * The transaction's the address is sent to.
   */
  to?: AddressLike

  /**
   * The amount of Ether sent.
   */
  value?: BNLike

  /**
   * This will contain the data of the message or the init of a contract.
   */
  data?: BufferLike

  /**
   * EC recovery ID.
   */
  v?: BNLike

  /**
   * EC signature parameter.
   */
  r?: BNLike

  /**
   * EC signature parameter.
   */
  s?: BNLike
}

/**
 * An object with all of the transaction's values represented as strings.
 */
export interface JsonTx {
  nonce?: string
  gasPrice?: string
  gasLimit?: string
  to?: string
  data?: string
  v?: string
  r?: string
  s?: string
  value?: string
}

/**
 * A utility class that represents an address.
 */
export class Address {
  address: Buffer

  constructor(value: Buffer | string | Address) {
    if (Buffer.isBuffer(value)) {
      this.address = value
    } else if (value instanceof Address) {
      this.address = value.toBuffer()
    } else {
      this.address = toBuffer(value)
    }

    if (this.address.length !== 20 && this.address.length !== 0) {
      throw new Error('Address must be 20 bytes in length or be empty.')
    }

    Object.freeze(this)
  }

  public toString(): string {
    return '0x' + this.address.toString('hex')
  }

  public toBuffer(): Buffer {
    return this.address
  }
}

/**
 * Any object that can be transformed into a `Buffer`
 */
export interface TransformableToBuffer {
  toBuffer(): Buffer
}

/**
 * A hex string prefixed with `0x`.
 */
export type PrefixedHexString = string

/**
 * A Buffer, hex string prefixed with `0x`, Number, or an object with a `toBuffer()` method such as BN.
 */
export type BufferLike = Buffer | TransformableToBuffer | PrefixedHexString | number

export type AddressLike = Address | Buffer | string

export type BNLike = BN | string | number

/**
 * Convert BN to its RLP representation.
 */
export function bnToRlp(value: BN | undefined): Buffer {
  // using bn.js `toArrayLike(Buffer)` instead of `toBuffer()`
  // for compatibility with browserify and similar tools
  return value ? unpadBuffer(value.toArrayLike(Buffer)) : Buffer.from([])
}

/**
 * Convert BN to hex.
 */
export function bnToHex(value: BN): string {
  return `0x${value.toString(16)}`
}
