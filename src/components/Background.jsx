export default function Background({ backgroundProps, lazy, host, viewType }) {
  const { backgroundContent, isVideo, altText, color, zIndex, type } = backgroundProps;


  const typeLookup = {
    mobile: 'mobile-vertical.webp',
    desktop: 'desktop.webp'
  }
  
  const source = `${host}${backgroundContent?._path?.startsWith('/') ? backgroundContent?._path?.substring(1) : backgroundContent?._path}/_jcr_content/renditions/${typeLookup[viewType] || 'desktop.webp'}`;

  return (
    <div className={`backgroundWrapper ${isVideo ? "isVideo" : ""}`} style={{ backgroundColor: color, zIndex }}>
      {backgroundContent?.type === "image" && (
        <img src={source} alt={altText} className="backgroundImage" loading={lazy ? "lazy" : "eager"} />
      )}
      {backgroundContent?.format?.includes("video/") && (
        <video className="videoWrapper" autoPlay loop muted>
          <source src={source} />
        </video>
      )}
    </div>
  );
}
