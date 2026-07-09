"use client";

import { useEffect, useRef } from "react";
import { isAdsenseConfigured, siteConfig } from "@/config/site";

type AdSpaceProps =
  | { type: "adsense" }
  | { type: "coupang"; productKeyword?: string };

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export default function AdSpace(props: AdSpaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (props.type !== "adsense" || !isAdsenseConfigured() || pushed.current) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const tryPush = () => {
      if (pushed.current || container.offsetWidth === 0) return false;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
        return true;
      } catch {
        return false;
      }
    };

    if (tryPush()) return;

    const observer = new ResizeObserver(() => {
      if (tryPush()) observer.disconnect();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [props.type]);

  return (
    <div className="my-8 flex w-full flex-col items-center justify-center">
      <span className="mb-1 text-[10px] tracking-wider text-gray-400 uppercase">
        Advertisement
      </span>

      {props.type === "adsense" && (
        <div
          ref={containerRef}
          className="flex min-h-[100px] w-full min-w-0 max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-gray-200/60 bg-gray-100/50 sm:min-h-[250px]"
        >
          {isAdsenseConfigured() ? (
            <ins
              className="adsbygoogle block w-full"
              style={{ display: "block", minHeight: 100 }}
              data-ad-client={siteConfig.adsense.clientId}
              data-ad-slot={siteConfig.adsense.adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          ) : (
            <p className="px-4 text-center text-xs text-gray-400">
              광고 영역 · .env에 AdSense ID 설정 후 표시됩니다
            </p>
          )}
        </div>
      )}

      {props.type === "coupang" && (
        <div className="flex w-full max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-2xl">
              🖥️
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                직장인 손목 보호용 무소음 무선 마우스 · 모니터 받침대
              </h4>
              <p className="mt-0.5 text-xs text-gray-500">
                {props.productKeyword ?? siteConfig.coupang.productKeyword} 관련
                추천 상품
              </p>
            </div>
          </div>
          <a
            href={siteConfig.coupang.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-center text-xs font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            최저가 확인하기
          </a>
        </div>
      )}
    </div>
  );
}
