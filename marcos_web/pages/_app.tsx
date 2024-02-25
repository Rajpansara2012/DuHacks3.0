import Provider from "@/components/Provider";
// import {Provider as p}  from "react-redux";
import "@/styles/globals.css";
import "@/styles/codeEditor.css";

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/css/css';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/theme/mdn-like.css';
// import 'codemirror/theme/the-matrix.css';
// import 'codemirror/theme/night.css';
import { abcdef, abcdefInit } from '@uiw/codemirror-theme-abcdef/src/index';

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider >
 

      <Component {...pageProps} />

    </Provider>
  );
}
