import { Link } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f7f5f0] py-20 px-4">
      <PageContainer className="max-w-2xl text-center">
        <span className="font-serif text-8xl font-black text-[#dfbd77] drop-shadow-sm">
          404
        </span>

        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#12243a] sm:text-5xl">
          Page Not Found.
          <span className="block italic text-[#a17c3d] text-2xl sm:text-3xl font-normal mt-2">
            The requested resource is unavailable.
          </span>
        </h1>

        <p className="editorial-copy mx-auto mt-6 max-w-md text-[15px] leading-7 text-[#475365]">
          The requested page could not be located on the Khwopa College portal. It may have moved or been updated.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-[#0b2038] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#17334c]"
          >
            ← Return to Homepage
          </Link>
          <Link
            to="/academics"
            className="inline-flex items-center rounded-xl border border-[#e5ddce] bg-white px-5 py-2.5 text-xs font-semibold text-[#12243a] shadow-sm transition hover:border-[#b99754]"
          >
            Academic Programmes
          </Link>
          <Link
            to="/notices"
            className="inline-flex items-center rounded-xl border border-[#e5ddce] bg-white px-5 py-2.5 text-xs font-semibold text-[#12243a] shadow-sm transition hover:border-[#b99754]"
          >
            Latest Notices
          </Link>
        </div>
      </PageContainer>
    </main>
  );
}
