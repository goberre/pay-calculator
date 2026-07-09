export const siteConfig = {
  name: "시급·연봉 계산기",
  tagline:
    "시급 계산기와 연봉 계산기를 한곳에서. 월급, 연봉, 시급, 실수령액을 바로 확인하세요.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pay.brand.com",
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "ca-pub-XXXXXXXXXXXXXXXX",
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT ?? "0000000000",
  },
  coupang: {
    productKeyword: "사무용 모니터 받침대",
    affiliateUrl:
      process.env.NEXT_PUBLIC_COUPANG_AFFILIATE_URL ?? "https://link.coupang.com/a/XXXXX",
  },
} as const;

export function isAdsenseConfigured(): boolean {
  const { clientId, adSlot } = siteConfig.adsense;
  return !clientId.includes("XXXX") && adSlot !== "0000000000";
}
