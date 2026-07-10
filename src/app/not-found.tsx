import Link from "next/link";

export const metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <h1 className="mt-4 text-xl font-semibold text-gray-900">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        요청하신 페이지가 없거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
      >
        계산기 홈으로
      </Link>
    </div>
  );
}
