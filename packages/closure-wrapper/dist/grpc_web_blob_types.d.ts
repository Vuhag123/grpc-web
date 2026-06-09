/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

export namespace ErrorCode {
  export const NO_ERROR: number;
  export const TIMEOUT: number;
  export const HTTP_ERROR: number;
  export const ABORT: number;
  export function getDebugMessage(errorCode: number): string;
}

export namespace EventType {
  export const COMPLETE: string;
  export const READY_STATE_CHANGE: string;
}

export function listen(
    src: object, type: string, listener: (e: any) => void, capture?: boolean,
    handler?: object): any;

export function encodeByteArray(bytes: Uint8Array|number[]): string;
export function decodeStringToUint8Array(str: string): Uint8Array;

export function toObject(map: object): {[key: string]: string};

export function setHttpHeadersWithOverwriteParam(
    url: string, paramName: string, headers: {[key: string]: string}): string;

export const HTTP_HEADERS_PARAM_NAME: string;

export function startsWith(str: string, prefix: string): boolean;

export function assert(condition: any, message?: string): any;

export interface Headers {
  set(name: string, value: string): void;
  get(name: string): string|undefined;
  has(name: string): boolean;
  delete(name: string): void;
  clear(): void;
}

export namespace XhrIo {
  export enum ResponseType {
    ARRAY_BUFFER = 'arraybuffer',
  }
}

export class XhrIo {
  headers: Headers;
  send(
      url: string, method?: string, body?: string|Uint8Array,
      headers?: {[key: string]: string}): void;
  getLastErrorCode(): number;
  getLastError(): string;
  getStatus(): number;
  getResponseText(): string;
  getResponse(): any;
  listenOnce(type: string, cb: (param: unknown) => void): void;
  setWithCredentials(withCredentials: boolean): void;
  getStreamingResponseHeader(name: string): string|null;
  getResponseHeaders(): {[key: string]: string};
  setResponseType(type: XhrIo.ResponseType): void;
  abort(): void;
  setTimeoutInterval(ms: number): void;
  getLastUri(): string;
  isSuccess(): boolean;
}



export class NodeReadableStream {
  on(event: string, callback: (...args: any[]) => void): this;
}

export class StreamParser {
  // Base class for parsing streams
}

export class MockXhrIo extends XhrIo {
  // Production fallbacks
  getLastUri(): string;
  isSuccess(): boolean;

  // Test simulation methods (Used in your test file!)
  simulateResponse(statusCode: number, body: string, headers?: object): void;
  simulatePartialResponse(data: string, headers?: {[key: string]: string}):
      void;
  simulateReadyStateChange(state: number): void;
  getLastRequestHeaders(): {[key: string]: string}|null;
}
