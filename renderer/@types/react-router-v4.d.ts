// @types/react-router doesn't have type definitions for V4.

declare module 'react-router' {
  export const Router: any;
  export const Route: any;
  export const Link: any;

  export interface Match {
    url: string;
    path: string;
    isExact: boolean;
    params: {};
  }

  export interface RouteParam {
    match: Match;
  }
}
