export const siteConfig = {
  name: "2026 시급/연봉 상호 변환 계산기",
  tagline:
    "시급을 월급·연봉으로, 연봉을 시급·실수령액으로 0.1초 만에 변환. 주휴수당 포함 여부를 선택해 맞춤 계산하세요.",
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
