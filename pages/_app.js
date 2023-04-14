import "../styles/globals.css";

import GlobalProvider from "../context/Provider";
import Slide from "@material-ui/core/Slide";
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import AuthLayout from "../layout/authLayout";
import MainLayout from "../layout/mainLayout";
const layouts = {
  auth: AuthLayout,
  main: MainLayout,
};
//const AppContext = createContext();
// const App = ({ Component, pageProps }) => {
//   const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
//  // const Layout=authLayout;
//   return (
//     <GlobalProvider>
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//     </GlobalProvider>
//   );
// };
const App = ({ Component, pageProps }) => {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
};
export default App;
