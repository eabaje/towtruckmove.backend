//import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Html, Head, Main, NextScript } from "next/document";

import React from "react";
export default class MyDocument extends Document {
  render() {
    return (
      <>
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="Phoenixcoded" />

            {/*Favicon icon */}
            <link
              rel="icon"
              href="/assets/images/favicon.ico"
              type="image/x-icon"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css"
            />

            {/* prism css */}

            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
              rel="stylesheet"
            />

            <link
              href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
              rel="stylesheet"
            />
            {/* -- vendor css --> */}
            <link
              rel="stylesheet"
              type="text/css"
              href="/assets/css/plugins/prism-coy.css"
            />
            <link
              type="text/css"
              href="/assets/css/fontawesome/font-awesome.min.css"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css"
            />
            <link rel="stylesheet" href="/assets/css/style.css" />
            {/* <link rel="stylesheet" href="/assets/css/base.css" /> */}
          </Head>
          <body>
            <Main />
            <NextScript />

            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> */}
            <script src="/assets/js/vendor-all.min.js"></script>
            <script src="/assets/js/plugins/bootstrap.min.js"></script>

            <script src="/assets/js/pcoded.js"></script>
            <script src="/assets/js/ripple.js"></script>

            <script defer src="/assets/js/plugins/prism.js"></script>

            <script src="/assets/js/page.js"></script>
          </body>
        </Html>
      </>
    );
  }
}
// MyDocument.getInitialProps = async (ctx) => {
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () => {
//     return originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });
//   };
//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   };
// };
