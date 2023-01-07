import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
