// https://github.com/primer/octicons/
declare module 'octicons' {
    export interface Octicon {
        symbol: string;
        path: string;
        options: { [attribute: string]: any },
        width: string;
        height: string;
        keywords: string[];
        toSVG(options?: SVGOptions): string;
        toSVGUse(): string;
    }

    export interface SVGOptions {
        "class"?: string
        "aria-label"?: string
        width?: number
        height?: number
    }

    const octicons: { [octicon: string]: Octicon }
    export default octicons
}
