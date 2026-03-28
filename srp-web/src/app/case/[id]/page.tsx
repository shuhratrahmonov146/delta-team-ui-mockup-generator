import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudiesData } from "@/data/case";
import { Metadata } from "next";
import { CheckCircle, DeerLogo } from "@/components/icons/case_study_icons";
import { StripeLogo } from "@/components/icons/caseIcons";

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const caseStudy = caseStudiesData.find(
    (item) => item.id === resolvedParams.id
  );

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      alternates: {
        canonical: `/case/${resolvedParams.id}`,
      },
    };
  }

  return {
    title: `${caseStudy.tagTitle} Case Study | Silk Road Professionals`,
    description: `Case Study: ${caseStudy.metaDescription || caseStudy.description[0]}`,
    alternates: {
      canonical: `/case/${resolvedParams.id}`,
    },
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CaseStudyDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const caseId = resolvedParams.id;
  const caseStudy = caseStudiesData.find((item) => item.id === caseId);

  if (!caseStudy) {
    notFound();
  }

  const {
    heroImage,
    title,
    description,
    outcomeTitle,
    outcomeDescription,
    stats,
    galleryImages,
    challengesTitle,
    challenges,
    projectInfoTitle,
    projectInfo,
  } = caseStudy;

  return (
    <section className="w-full bg-white text-black pb-20 font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-10">
        <div className="rounded-[16px] overflow-hidden mb-12 shadow-sm h-[300px] md:h-[500px] lg:h-[600px] relative">
          {caseStudy.mainImageComponent ? (
            <caseStudy.mainImageComponent className="w-full h-full" />
          ) : (
            <Image
              src={heroImage}
              alt="Case Study Hero"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="order-2 lg:order-2 lg:col-span-8">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1A0B2E] mb-6 tracking-tight">
              {title}
            </h1>
            <div className="space-y-6 text-gray-600 leading-relaxed mb-12 text-[17px]">
              {description.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1A0B2E] mb-6 tracking-tight">
              {outcomeTitle}
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed mb-10 text-[17px]">
              <p>{outcomeDescription}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="px-6 py-4 md:px-8 md:py-5 border border-gray-100 rounded-[16px] text-[#1A0B2E] font-bold text-base md:text-lg shadow-sm bg-gray-50/50"
                >
                  {stat}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-[16px] overflow-hidden h-[200px] sm:h-[240px] relative shadow-sm ${
                    image.type === "logo"
                      ? "bg-white border border-gray-100 flex items-center justify-center p-8"
                      : ""
                  }`}
                >
                  {image.Component ? (
                    <image.Component
                      className={
                        image.type === "logo"
                          ? "w-auto h-[100px]"
                          : "w-full h-full"
                      }
                      width={image.type === "logo" ? undefined : 400}
                      height={image.type === "logo" ? 100 : 300}
                    />
                  ) : image.type === "image" ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {image.src.includes("stripe.svg") ? (
                        <StripeLogo className="w-auto h-[80px]" />
                      ) : image.src.includes("deer_logo.svg") ? (
                        <DeerLogo className="w-auto h-[60px]" />
                      ) : (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={180}
                          height={180}
                          className="w-auto h-[100px]"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1A0B2E] mb-6 tracking-tight">
              {challengesTitle}
            </h2>
            <div className="space-y-4 mb-12">
              {challenges.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1 min-w-[20px] text-[#1283BB]">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-1 lg:col-span-4 h-full lg:sticky lg:top-8">
            <div className="bg-[#1283BB] rounded-[16px] p-6 md:p-8 text-white h-fit shadow-lg">
              <h3 className="text-xl font-bold mb-8">{projectInfoTitle}</h3>

              <div className="space-y-6 text-sm font-medium">
                {projectInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-end border-b border-dashed border-white/20 pb-1"
                  >
                    <span className="opacity-70 pb-1">{info.label}</span>
                    <span className="text-right pb-1">
                      {info.label.toLowerCase().includes("website") ? (
                        <a
                          href={
                            info.value.startsWith("http")
                              ? info.value
                              : `https://${info.value}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        info.value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
