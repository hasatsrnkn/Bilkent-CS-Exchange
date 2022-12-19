import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider } from "react-redux";
import store from "../store/index";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

let persistor = persistStore(store );

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
