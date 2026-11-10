import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { useSiteSettings } from "../../context/useSiteSettings";

export default function ContactPage() {
  const settings = useSiteSettings();

  const phone = settings?.phone || "+977-1-6614336";
  const address = settings?.address || "Dekocha, Bhaktapur, Nepal";
  const email = settings?.email || "info@khwopa.edu.np";
  const collegeName = settings?.collegeName || "Khwopa Secondary School";

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Connect with Us"
        title={`Contact ${collegeName}.`}
        italicTitle="Dekocha Campus, Bhaktapur."
        description={`We are located at ${address}. Reach out for admissions, transcripts, examination verifications, or personalized campus visits.`}
        breadcrumbs={[{ label: "Contact" }]}
        stats={[
          { label: "Campus Location", value: address },
          { label: "Telephone", value: phone },
          { label: "Official Email", value: email }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Campus Directory"
                title="Office Hours & Direct Contacts"
                italicTitle="for Students & Parents."
                description="Administrative sections operate Sunday through Friday from 6:30 AM to 4:30 PM."
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Campus Address
                  </span>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                    Dekocha, Bhaktapur
                  </h4>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm text-[#475365]">
                    Ward No. 9, Bhaktapur Municipality, Bagmati Province, Nepal.
                  </p>
                  <Link
                    to="/contact/location"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] hover:text-[#92703b]"
                  >
                    <span>View Map & Driving Directions →</span>
                  </Link>
                </div>

                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Phone Numbers
                  </span>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                    General Inquiries
                  </h4>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm text-[#475365]">
                    Tel: <a href="tel:+97716614336" className="font-semibold text-[#12243a] not-italic hover:underline">+977-1-6614336</a><br />
                    Alt: +977-1-6610932 / +977-1-6610933
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Email Addresses
                  </span>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                    Electronic Desk
                  </h4>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm text-[#475365]">
                    General: <a href="mailto:info@khwopacollege.edu.np" className="font-semibold text-[#12243a] not-italic hover:underline">info@khwopacollege.edu.np</a><br />
                    Admissions: admissions@khwopacollege.edu.np<br />
                    RMC: rmc@khwopacollege.edu.np
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Online Inquiry
                  </span>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                    Submit an Enquiry
                  </h4>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm text-[#475365]">
                    Use our verified online form to send queries directly to department heads and coordinators.
                  </p>
                  <Link
                    to="/contact/enquiry"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] hover:text-[#92703b]"
                  >
                    <span>Open Enquiry Form →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Map Preview */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Location Overview
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#12243a]">
                  Dekocha Campus Map
                </h3>
                <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                  Located 15 minutes walk east of Bhaktapur Durbar Square along the historic Changunarayan road artery.
                </p>

                <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-[#e5ddce]">
                  <iframe
                    title="Khwopa College Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.447547514101!2d85.42777707546607!3d27.67256607620241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb05342a781b01%3A0xb6c7d91e847c2d82!2sKhwopa%20College!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <Link
                  to="/contact/location"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#0b2038] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                >
                  View Route Directions & Transit Options
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Ready to Apply for the New Session?"
        description="Review admission requirements, criteria, and download admission materials."
        primaryAction={{ label: "View Admissions", to: "/admissions" }}
        secondaryAction={{ label: "Send an Enquiry", to: "/contact/enquiry" }}
      />
    </main>
  );
}
