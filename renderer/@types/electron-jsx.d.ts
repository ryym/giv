declare module JSX {
    // https://electron.atom.io/docs/api/webview-tag/
    interface WebViewAttributes {
        src?: string;
        autosize?: string;
        nodeintegration?: string;
        plugins?: string;
        preload?: string;
        httpreferrer?: string;
        useragent?: string;
        partition?: string;
        allowpopups?: string;
        webpreferences?: string;
        blinkfeatures?: string;
        disableblinkfeatures?: string;
        guestinstance?: string;
    }

    // https://github.com/Microsoft/TypeScript/blob/975bc765c0e/tests/lib/react.d.ts
    type WebViewProps = WebViewAttributes & React.HTMLProps<Electron.WebViewElement>

    // Without this declaration, we can't use the webview tag in JSX.
    // https://www.typescriptlang.org/docs/handbook/jsx.html
    interface IntrinsicElements {
        webview: WebViewProps
    }
}
