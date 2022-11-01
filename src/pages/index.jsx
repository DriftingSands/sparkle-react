import { useEffect, useState } from "react";
import ErrorComponent from "../components/ErrorComponent";
import { fetchAndSetData } from "../components/utils";
import Page from "../components/Page";

export default function Graphiql(props) {
  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [customHost, setCustomHost] = useState("");
  const [retries, setRetries] = useState(0)

  const hostConfig = {
    authorHost: "https://author-p81252-e700817.adobeaemcloud.com",
    publishHost: "https://publish-p81252-e700817.adobeaemcloud.com/",
    endpoint: "sample-wknd-app/homepage",
  };

  useEffect(() => {
    // const setStates = { setIsAuthorVersion, setFetchError, setCustomHost };
    // const fetchVariations = [
    //   // {
    //   //   variationName: "desktop",
    //   //   setData: setDesktopData,
    //   // },
    //   {
    //     variationName: "mobile",
    //     setData: setMobileData,
    //   },
    // ];
    // fetchAndSetData(hostConfig, setStates, fetchVariations);
    function setWindowData(msg) {

      console.log("\x1b[31m ~ msg", msg.data)
      if (
        msg.data.type !== 'dataUpdate' ||
        !window.mobileData ||
        !window.desktopData
        ) {
          return
        }
        console.log("\x1b[31m ~ customHost")
      setCustomHost(window.customHost)
      setMobileData(window.mobileData.data.pageByPath.item)
      setDesktopData(window.desktopData.data.pageByPath.item)
    }
    
    if (window.mobileData && window.desktopData) {
      setMobileData(window.mobileData.data.pageByPath.item)
      setDesktopData(window.desktopData.data.pageByPath.item)
    } else {
      window.addEventListener('message', setWindowData)
    }

    return () => window.removeEventListener('message', setWindowData)
  }, []);

  // useEffect(() => {
  //   console.log("\x1b[31m ~ useEffect", mobileData, desktopData)
  //   if (!window.mobileData) {
  //     setMobileData(window.mobileData.data.pageByPath.item)
  //   }
  //   if (!window.desktopData) {
  //     setDesktopData(window.desktopData.data.pageByPath.item)
  //   }
  //   setCustomHost(window.customHost)
  // }, [window.mobileData, window.desktopData])

  // useEffect(() => {
  //   if (retries > 5 || customHost) {return}
  //   setTimeout(() => {
  //     if (customHost) {return}
  //     // console.log('in timeout')
  //     setCustomHost(window.customHost)
  //     setRetries(retries + 1)
  //   }, 1000);
  // }, [retries])


  return !desktopData && !mobileData ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
  );
}
