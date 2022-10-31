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
    window?.mobileData?.data?.pageByPath?.item && setMobileData(window.mobileData.data.pageByPath.item)
    window?.desktopData?.data?.pageByPath?.item && setDesktopData(window.desktopData.data.pageByPath.item)
    setCustomHost(window.customHost)

  }, [customHost]);

  // useEffect(() => {
  //   if (retries > 5 || customHost) {return}
  //   setTimeout(() => {
  //     if (customHost) {return}
  //     console.log('in timeout')
  //     setCustomHost(window.customHost)
  //     setRetries(retries + 1)
  //   }, 1000);
  // }, [])


  return !desktopData && !mobileData ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
  );
}
