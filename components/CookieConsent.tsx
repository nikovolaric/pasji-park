import Script from "next/script";

function CookieConsent() {
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="7c96fba8-cc77-4aa4-bda8-3d891ab7c0d6"
      data-blockingmode="auto"
      type="text/javascript"
    ></Script>
  );
}

export default CookieConsent;
