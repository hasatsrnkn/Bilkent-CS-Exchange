import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider } from "react-redux";
import store from "../store/index";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
