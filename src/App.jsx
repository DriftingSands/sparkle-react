import {Helmet} from "react-helmet";
import "./styles/globals.scss";
import { TimelineAnimationWrapper } from "./components/TimelineWrapper";
import ResizeProvider from "./components/ResizeProvider";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IndexPage from './pages'

function App() {
  return (
    <>
      <Helmet>
        <title>Sparkle Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <ResizeProvider>
        <TimelineAnimationWrapper>
          <BrowserRouter>
          <Routes>
            <Route path='/' index element={<IndexPage />} />
          </Routes>
          </BrowserRouter>
          {/* <Component {...pageProps} /> */}
        </TimelineAnimationWrapper>
      </ResizeProvider>
    </>
  );
}

export default App;