import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { useSiteSettings } from "../../context/useSiteSettings";

export default function LocationPage() {
  const settings = useSiteSettings();
  const address = settings?.address || "Dekocha, Bhaktapur, Nepal";
  const collegeName = settings?.collegeName || "Khwopa Secondary School";

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Transit & Directions"
        title="Location & Transit."
        italicTitle={`Visiting ${collegeName}.`}
        description={`Comprehensive public transit, walking routes, and driving directions to ${collegeName} in historic ${address}.`}
        breadcrumbs={[
          { label: "Contact", to: "/contact" },
          { label: "Location & Directions" }
        ]}
        stats={[
          { label: "Campus Address", value: address },
          { label: "From Durbar Sq", value: "12-15 Min Walk" },
          { label: "Coordinates", value: "27.6725° N, 85.4277° E" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Getting Here"
                title="Transit Options to Dekocha"
                italicTitle="from across the Valley."
                description="Easily accessible from Kathmandu, Lalitpur, and Kavre via regular public express bus routes and private transport."
              />

              <div className="space-y-6">
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#12243a]">
                    From Kathmandu (Ratnapark / Purano Buspark)
                  </h3>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    Board any Bhaktapur Express / Minibus to Kamalbinayak or Dekocha Bus Stop. Alight at the Dekocha Chowk stop, from where the college is a 2-minute stroll northward. (Approx. 45-60 mins).
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#12243a]">
                    From Lalitpur (Lagankhel / Gwarko)
                  </h3>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    Take the Ring Road route to Koteshwor / Jadibuti, then catch the express bus towards Kamalbinayak, Bhaktapur. (Approx. 40-50 mins).
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#12243a]">
                    Walking from Bhaktapur Durbar Square
                  </h3>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    Walk east past Taumadhi Square along the historic brick paved lane towards Dekocha. The peaceful campus is situated just past the municipal ward office (Approx. 12-15 minutes walk).
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="lg:col-span-5 flex flex-col rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                Interactive Map View
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Khwopa College, Dekocha, Bhaktapur 44800, Nepal
              </p>

              <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#e5ddce]">
                <iframe
                  title="Khwopa College Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.447547514101!2d85.42777707546607!3d27.67256607620241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb05342a781b01%3A0xb6c7d91e847c2d82!2sKhwopa%20College!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://maps.google.com/?q=Khwopa+College+Bhaktapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#0b2038] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                >
                  Open in Google Maps App
                </a>
                <Link
                  to="/contact/enquiry"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[#e5ddce] px-4 py-2.5 text-xs font-semibold text-[#12243a] transition hover:border-[#b99754]"
                >
                  Send an Online Enquiry
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Schedule a Personalized Campus Tour"
        description="Our student ambassadors and staff are happy to walk you through our facilities, libraries, and science labs."
        primaryAction={{ label: "Contact Desk", to: "/contact" }}
        secondaryAction={{ label: "Campus Facilities", to: "/about/facilities" }}
      />
    </main>
  );
}
