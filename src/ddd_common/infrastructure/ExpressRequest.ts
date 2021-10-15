import { Request } from "express";

export interface Dictionary<T> {
  [key: string]: T;
}

export type ParamsDictionary = Dictionary<string>;

interface TypedRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

interface TypedRequestBody<T> extends Request {
  body: T;
}

interface TypedRequestCookie<C> extends Request {
  cookies: C;
}

export { TypedRequest, TypedRequestBody, TypedRequestCookie };
