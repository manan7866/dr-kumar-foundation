"use client";

import Link from "next/link";

export default function ParticipationGuidelinesPage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] ">
          <Link href="/the-circle" className="text-[#C9CCD6] hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to The Circle
          </Link>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Participation Guidelines
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A85C]" />
        </div>
      </section>

      {/* Guidelines Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[900px] ">
          <p className="text-[#C9CCD6] text-lg leading-relaxed mb-12">
            The following guidelines ensure that all documentation within The Circle 
            maintains clarity, responsibility, and alignment with the Foundation's purpose.
          </p>

          <div className="space-y-8">
            {/* Guideline 1 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">Maintain Clarity of Language</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                Use precise, grounded language in all documentation. Avoid vague spiritual 
                terminology, mystical claims, or language that suggests extraordinary states. 
                Write from direct experience rather than interpretation.
              </p>
            </div>

            {/* Guideline 2 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">Avoid Exaggeration</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                Do not embellish experiences or claim transformations that cannot be 
                substantiated. The Circle documents genuine engagement, not idealized 
                narratives. Humility in description reflects authenticity of experience.
              </p>
            </div>

            {/* Guideline 3 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">No Hierarchical Claims</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                The Circle is not hierarchical. No member holds status over another. 
                Do not reference levels, ranks, achievements, or positions within any 
                supposed hierarchy. All participants are equal in documentation.
              </p>
            </div>

            {/* Guideline 4 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">Respect Structured Documentation</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                All member records follow the same structure: First Encounter, Resonated 
                Quality, Life Changes, and Continuing Engagement. Adhere to this format 
                without deviation. The structure serves clarity and comparability.
              </p>
            </div>

            {/* Guideline 5 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">Subject to Moderation</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                All submissions undergo review before publication. The Foundation reserves 
                the right to request revisions or decline publication if content does not 
                align with these guidelines. This is not censorship but quality assurance.
              </p>
            </div>

            {/* Guideline 6 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">No Promotional Content</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                Do not use your member record to promote personal projects, organizations, 
                services, or products. The Circle is for documentation of engagement, not 
                self-promotion or recruitment.
              </p>
            </div>

            {/* Guideline 7 */}
            <div className="border-l-2 border-[#C5A85C]/30 pl-6">
              <h3 className="text-white font-serif text-xl mb-3">Accuracy and Truthfulness</h3>
              <p className="text-[#C9CCD6] leading-relaxed">
                Provide accurate information regarding your background, profession, location, 
                and year of connection. False or misleading information will result in removal 
                from the directory.
              </p>
            </div>
          </div>

          {/* Additional Note */}
          <div className="mt-16 p-8 bg-[#242B4A] border border-[#C5A85C]/20">
            <p className="text-[#C9CCD6] leading-relaxed">
              These guidelines exist to preserve the integrity of The Circle as a documented 
              archive. They are not restrictions on expression but frameworks for clarity. 
              Questions regarding these guidelines may be directed to the Foundation office.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-[#C5A85C]/20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/the-circle" className="text-[#C9CCD6] hover:text-white transition-colors">
            ← The Circle
          </Link>
          <Link 
            href="/the-circle/registration" 
            className="group relative px-6 py-3 text-white border border-white/40 hover:border-[#C5A85C] transition-colors"
          >
            <span className="relative z-10">Register →</span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
