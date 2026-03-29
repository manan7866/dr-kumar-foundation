"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface Contribution {
  id: string;
  title: string;
  activity_date: string;
  venue_city: string;
  venue_country: string;
  participant_count: number;
  task_conducted: string;
  results: string;
  user_name: string;
  submitted_at: string;
}

interface TopContributor {
  user: User;
  contribution_count: number;
  latest_contribution: Contribution;
  collaboration_info?: {
    fullName?: string;
    professionalBackground?: string;
    specialization?: string;
    yearsExperience?: string;
    country?: string;
    email?: string;
    proposedContribution?: string;
  };
}

interface TopContributorsGridProps {
  contributors: TopContributor[];
  programName: string;
  isLoading?: boolean;
}

export default function TopContributorsGrid({ contributors, programName, isLoading }: TopContributorsGridProps) {
  // Helper to create contributor
  const createContributor = (name: string, exp: string, location: string, spec: string, bg: string, contribution: string, title: string, date: string, city: string, country: string, participants: number, task: string, results: string, count: number): TopContributor => ({
    user: { id: `dummy-${name}`, email: `${name.toLowerCase().replace(' ', '.')}@example.com`, full_name: name, avatar_url: undefined },
    contribution_count: count,
    latest_contribution: { id: `c-${name}`, title, activity_date: date, venue_city: city, venue_country: country, participant_count: participants, task_conducted: task, results, user_name: name, submitted_at: date },
    collaboration_info: { fullName: name, professionalBackground: bg, specialization: spec, yearsExperience: exp, country, email: `${name.toLowerCase().replace(' ', '.')}@example.com`, proposedContribution: contribution },
  });

  // Dummy data for each program
  const getDummyContributors = (): TopContributor[] => {
    const pn = programName.toLowerCase();
    
    // 1. Healing Initiatives
    if (pn.includes('healing')) {
      return [
        createContributor('Safiya Bhat', '10', 'Srinagar, Kashmir', 'Spiritual Care & Community Healing', 'Community care facilitator  in spiritual dialogue, grief support spaces, and compassionate community engagement.', 'Strengthening spiritually grounded healing spaces through reflective dialogue, ethical facilitation, and compassionate support.', 'Community Reflection and Spiritual Healing Circle', '2024-03-18', 'Srinagar', 'Kashmir', 46, 'Facilitated a guided healing circle focused on grief reflection, spiritual grounding, attentive listening, and compassionate community support.', 'Created a trusted space for collective reflection, strengthened peer support, and encouraged continued healing-centered participation.', 9),
        createContributor('Dr. Maryam Qadri', '11', 'Anantnag, Kashmir', 'Psychological Resilience & Healing Support', 'Psychological resilience educator  in community wellbeing, emotional support frameworks, and culturally rooted healing engagement.', 'Developing community-centered resilience pathways that integrate emotional literacy, reflective healing, and ethically grounded support systems.', 'Resilience and Inner Stability Workshop', '2024-02-27', 'Anantnag', 'Kashmir', 34, 'Led a structured workshop on emotional regulation, resilience-building, reflective coping practices, and faith-sensitive approaches to wellbeing.', 'Improved participant confidence in managing stress, deepened awareness of healthy coping practices, and supported stronger community-based resilience.', 8),
        createContributor('Ahmad Mir', '8', 'Baramulla, Kashmir', 'Community Counseling & Ethical Support', 'Dedicated community support practitioner  in counseling facilitation, reflective dialogue, and grassroots care engagement.', 'Extending community counseling models that combine ethical guidance, mutual support, and healing-centered participation rooted in responsibility.', 'Ethical Support and Counseling Session', '2024-01-21', 'Baramulla', 'Kashmir', 29, 'Coordinated a small-group counseling session focused on self-awareness, ethical support, interpersonal care, and responsible community dialogue.', 'Expanded access to safe support spaces and reinforced the role of ethical care in healing engagement.', 7),
      ];
    }
    
    // 2. Environmental Programs
    if (pn.includes('environment') || pn.includes('water')) {
      return [
        createContributor('Dr. Insha Qadri', '10', 'Srinagar, Kashmir', 'Water Protection & Watershed Stewardship', 'Environmental researcher  in watershed restoration, mountain ecosystems, and community-based water resilience planning.', 'Advancing community-led watershed protection models that strengthen spring revival, improve local water security, and support climate adaptation.', 'Spring Source Protection ', '2024-03-14', 'Srinagar', 'Kashmir', 44, 'Led a field-based workshop on spring-source protection, watershed stewardship, and household-level water conservation.', 'Strengthened awareness of water stress and supported practical action toward long-term watershed resilience.', 10),
        createContributor('Adil Wani', '8', 'Bandipora, Kashmir', 'Community Conservation Initiative', 'Experienced community environmental mobilizer  of proven experience in ecological campaigns, citizen participation, and local conservation action.', 'Strengthening neighborhood-level environmental action through clean-up drives, awareness campaigns, and community-led stewardship.', 'Riverbank Clean-Up Drive', '2024-02-24', 'Bandipora', 'Kashmir', 51, 'Coordinated a riverbank clean-up initiative combined with a public awareness session on plastic reduction and aquatic ecosystem care.', 'Mobilized local participation in environmental care and encouraged more responsible stewardship practices.', 8),
        createContributor('Farah Shah', '7', 'Pulwama, Kashmir', 'Ecological Awareness & Water Responsibility', 'Community sustainability facilitator  in grassroots environmental participation, household resource awareness, and local engagement.', 'Promoting water conservation through inclusive local awareness programs that connect household practice, community participation, and long-term environmental responsibility.', 'Household Water Responsibility Dialogue', '2024-01-29', 'Pulwama', 'Kashmir', 36, 'Facilitated a community dialogue on household water conservation, sustainable resource use, and practical environmental responsibility.', 'Expanded awareness of daily water-saving practices and supported sustainable household behavior.', 7),
      ];
    }
    
    // 3. Youth Programs
    if (pn.includes('youth')) {
      return [
        createContributor('Aaliya Bhat', '8', 'Srinagar, Kashmir', 'Cultural Reconnection & Youth Leadership', 'Youth engagement facilitator  in cultural education, reflective leadership spaces, and community-based youth development.', 'Building youth-centered spaces that reconnect emerging generations with cultural identity, ethical purpose, and responsible community leadership.', 'Youth Cultural Identity and Leadership Circle', '2024-03-16', 'Srinagar', 'Kashmir', 43, 'Facilitated a youth circle focused on cultural belonging, ethical reflection, community responsibility, and confidence-building through guided dialogue.', 'Strengthened cultural awareness and encouraged values-based youth leadership.', 9),
        createContributor('Zoya Nazir', '7', 'Budgam, Kashmir', 'Ethical Formation & Mentorship', 'Community mentor  in youth guidance, ethical development, and leadership cultivation through structured engagement.', 'Equipping young people with ethical grounding, reflective mentorship, and practical pathways to become responsible contributors within their communities.', 'Youth Mentorship and Ethical Formation Forum', '2024-02-21', 'Budgam', 'Kashmir', 38, 'Led a youth forum centered on ethical decision-making, discipline, reflective growth, and service-oriented participation.', 'Supported stronger youth confidence and integrity-based leadership.', 8),
        createContributor('Irfan Lone', '6', 'Kupwara, Kashmir', 'Service Projects & Leadership Development', 'Youth development coordinator  in volunteer mobilization, leadership training, and community-centered service pathways.', 'Developing structured youth service models that cultivate responsibility, teamwork, and long-term leadership through meaningful community participation.', 'Youth  Community Participation Initiative', '2024-02-11', 'Kupwara', 'Kashmir', 31, 'Coordinated a youth service initiative combining volunteer action, teamwork, mentorship, and community participation.', 'Increased youth involvement in service activity and strengthened collaborative leadership skills.', 6),
      ];
    }
    
    // 4. Sufi Music
    if (pn.includes('music') ) {
      return [
        createContributor('Firdousa Bano', '9', 'Srinagar, Kashmir', 'Historical Archival Preservation', 'Cultural music archivist  in devotional repertoire documentation, oral tradition preservation, and heritage media coordination.', 'Preserving devotional and philosophical musical traditions through structured documentation, careful recording, and responsible digital dissemination.', 'Devotional Music Documentation Session', '2024-03-07', 'Srinagar', 'Kashmir', 24, 'Led a documentation session preserving devotional vocals, lyrical meanings, and performance notes for future digital archiving.', 'Supported careful preservation of oral devotional tradition and strengthened intergenerational continuity in musical heritage.', 8),
        createContributor('Muzaffar Mir', '8', 'Ganderbal, Kashmir', 'Digital Preservation & Media Restoration', 'Skilled audio documentation practitioner  in recording restoration, metadata organization, and heritage media support.', 'Building reliable digital pathways for preserving Sufi music through restoration, structured indexing, and ethically managed media archives.', 'Sufi Audio Restoration and Metadata Workshop', '2024-02-19', 'Ganderbal', 'Kashmir', 18, 'Conducted a session on restoring old devotional recordings, organizing metadata, and preparing media assets for preservation.', 'Improved archival quality of legacy recordings and enabled more responsible long-term preservation workflows.', 7),
        createContributor('Ruqaiya Shah', '7', 'Anantnag, Kashmir', 'Digital Spiritual Media Education', 'Dedicated and experienced cultural educator  in lyrical interpretation, youth arts engagement, and spiritual heritage facilitation.', 'Reconnecting younger generations with devotional and philosophical musical traditions through guided participation and ethical cultural education.', 'Youth Devotional Lyrics and Expression Circle', '2024-01-26', 'Anantnag', 'Kashmir', 27, 'Facilitated a youth-focused session on devotional lyrics, reflective singing, and cultural continuity through guided musical engagement.', 'Encouraged youth participation in sacred artistic practice and deepened appreciation of lyrical meaning.', 6),
      ];
    }
    
    // 5. Sufi Commerce
    if (pn.includes('ecommerce') || pn.includes('ethical') || pn.includes('craft')) {
      return [
        createContributor('Shabnam Jan', '9', 'Srinagar, Kashmir', 'Ethical Craft Documentation', 'Heritage craft researcher  experience in artisan documentation, oral histories, production mapping, and cultural continuity support.', 'Documenting artisan knowledge, production methods, and intergenerational craft practices through structured field research and verified records.', 'Artisan Process Mapping and Documentation Session', '2024-06-03', 'Srinagar', 'Kashmir', 24, 'Led a documentation session focused on recording traditional craft workflows, artisan narratives, and material knowledge for long-term preservation.', 'Strengthened the preservation of traditional knowledge and improved the quality of structured craft documentation for future access.', 8),
        createContributor('Adil Karim', '8', 'Budgam, Kashmir', 'Traceability & Fair Value Systems', 'Responsible commerce practitioner  in traceability systems, transparent market workflows, and craft-sector coordination.', 'Building transparent and fair-value pathways for artisans through traceability design, ethical trade principles, and structured buyer confidence.', 'Traceability and Ethical Trade Readiness Workshop', '2024-02-17', 'Budgam', 'Kashmir', 26, 'Facilitated a training session on traceability methods, pricing clarity, supply transparency, and mutual responsibility in artisan-centered trade systems.', 'Improved traceability awareness and encouraged more structured producer-buyer trust frameworks.', 8),
        createContributor('Nida Shafi', '7', 'Baramulla, Kashmir', 'Digital Integration & Craft Storytelling', 'Craft communications specialist  in product narrative development, digital cataloging, and heritage storytelling.', 'Enabling heritage artisans to enter digital marketplaces with stronger product narratives, clearer cultural context, and more responsible presentation standards.', 'Craft Digitization and Product Storytelling Session', '2024-01-30', 'Baramulla', 'Kashmir', 21, 'Conducted a session on digital cataloging, product storytelling, cultural context writing, and responsible online presentation.', 'Improved product storytelling quality and supported better heritage visibility in digital spaces.', 6),
      ];
    }
    
    // 6. Sufi Science
    // if (pn.includes('science') || pn.includes('consciousness')) {
    //   return [
    //     createContributor('Dr. Rayees Qadri', '11', 'Srinagar, Kashmir', 'Philosophical Analysis', 'Interdisciplinary researcher  in philosophical analysis, textual interpretation, and structured academic documentation.', 'Advancing rigorous inquiry into Sufi philosophical traditions through disciplined analysis, scholarly documentation, and academically credible publication pathways.', 'Philosophical Analysis and Research Documentation Seminar', '2024-03-09', 'Srinagar', 'Kashmir', 19, 'Led a seminar on Sufi philosophical texts, disciplined observation, research documentation, and publication-oriented analytical framing.', 'Strengthened research discipline and encouraged more rigorous philosophical inquiry grounded in tradition.', 8),
    //     createContributor('Sana Yousuf', '8', 'Ganderbal, Kashmir', 'Consciousness Studies', 'Research facilitator  in consciousness studies, reflective learning, and interdisciplinary learning design.', 'Supporting structured inquiry into awareness, self-observation, and human development through careful interdisciplinary exploration and learning design.', 'Consciousness Studies and Self-Observation Workshop', '2024-02-22', 'Ganderbal', 'Kashmir', 23, 'Facilitated a workshop exploring awareness, self-observation, states of consciousness, and disciplined reflection.', 'Deepened participant engagement with consciousness studies and improved clarity around reflective research methods.', 7),
    //     createContributor('Dr. Irfan Ashraf', '9', 'Pulwama, Kashmir', 'Environmental Research & Spiritual Ecology', 'Environmental humanities researcher  in ethics, sustainability discourse, and spiritual-philosophical analysis.', 'Linking ecological ethics, philosophical reflection, and research publication to build stronger interdisciplinary understanding of sustainability and responsibility.', 'Environmental Ethics and Spiritual Ecology Colloquium', '2024-01-25', 'Pulwama', 'Kashmir', 17, 'Convened a colloquium examining ecological ethics from spiritual traditions and their relevance to contemporary sustainability challenges.', 'Connected environmental concerns with spiritual ethics and expanded interest in policy-relevant ecological inquiry.', 6),
    //   ];
    // }
    if (pn.includes('science') || pn.includes('consciousness')) {
      return [
        createContributor(
          'Shabnam Jan',
          '8',
          'Kashmir',
          'Advanced Philosophical Text Analysis',
          'Interdisciplinary research scholar with 9 years of experience in philosophical literature review, comparative inquiry, source interpretation, and structured academic documentation.',
          'Developing structured research notes and analytical summaries on Sufi philosophical texts, core concepts of consciousness, epistemology, and ethical inquiry.',
          'Comparative Sufi Epistemology Research Session',
          '2024-03-06',
          'Srinagar',
          'Kashmir',
          24,
          'Led a focused research session examining classical Sufi concepts of knowledge, self-observation, and inner perception through comparative analytical frameworks.',
          'Strengthened the program’s philosophical research base by improving structured interpretation, thematic mapping, and documentation quality.',
          8
        ),
        createContributor(
          'Muzaffar Mir',
          '7',
          'Kashmir',
          'Consciousness Studies Documentation',
          'Research documentation practitioner with over 8 years of experience in qualitative recording, metadata structuring, archival organization, and interdisciplinary knowledge support.',
          'Building reliable research documentation pathways for consciousness studies, self-observation records, interview materials, and interdisciplinary inquiry archives.',
          'Consciousness  Documentation Workshop',
          '2024-02-18',
          'Ganderbal',
          'Kashmir',
          18,
          'Conducted a workshop on documenting reflective observation, organizing research records, and creating structured metadata for long-term academic use.',
          'Improved the consistency, traceability, and usability of research records supporting interdisciplinary inquiry into consciousness and human development.',
          7
        ),
        createContributor(
          'Ruqaiya Shah',
          '6',
          'Kashmir',
          'Social Ethics and Human Development',
          'Ethics and education facilitator with over 7 years of experience in social thought, reflective learning, youth engagement, and value-centered program development.',
          'Supporting inquiry into social ethics, human development, and applied philosophical reflection through structured discussion and educational engagement models.',
          'Social Ethics and Reflective Inquiry Circle',
          '2024-01-25',
          'Anantnag',
          'Kashmir',
          27,
          'Facilitated a discussion circle on ethical responsibility, self-awareness, and the role of philosophical reflection in shaping social conduct and community life.',
          'Expanded participant engagement with ethical inquiry and strengthened the program’s applied dimension linking philosophy, reflection, and social understanding.',
          6
        ),
      ];
    }
    
    // 7. Interfaith Program
    if (pn.includes('interfaith')) {
      return [
        createContributor('Dr. Adnan Shah', '10', 'Srinagar, Kashmir', 'Structured Dialogue Platforms', 'Dialogue scholar  in interfaith facilitation, ethical discourse, and institutional engagement frameworks.', 'Building stable platforms for principled interfaith exchange through rigorous facilitation, documentation, and institutionally grounded dialogue design.', 'Structured Interfaith Dialogue Forum', '2024-03-11', 'Srinagar', 'Kashmir', 28, 'Facilitated a principled dialogue forum bringing together participants from different religious and civic backgrounds for structured exchange and documented reflection.', 'Improved mutual understanding and reinforced the value of sustained dialogue over reactive engagement.', 8),
        createContributor('Samina Qadri', '9', 'Anantnag, Kashmir', 'Ethical & Theological Scholarship', 'Theological researcher  in comparative ethics, civic dialogue, and scholarly documentation of interfaith engagement.', 'Deepening interfaith engagement through research-based ethical discourse, documented scholarship, and principled civilizational dialogue.', 'Ethical  Theological Scholarship Session', '2024-02-15', 'Anantnag', 'Kashmir', 22, 'Led a discussion session on theological frameworks for coexistence, ethical scholarship, and the role of documentation in cross-community understanding.', 'Strengthened scholarly depth in dialogue settings and supported long-term inter-community trust building.', 7),
        createContributor('Bilal Rashid', '8', 'Baramulla, Kashmir', 'Digital Civic & Policy Interface', 'Civic engagement practitioner  in community mediation,  and policy-oriented dialogue facilitation.', 'Translating dialogue into civic cooperation through structured roundtables, documentation discipline, and policy-aware community engagement pathways.', 'Civic Interface & Community Roundtable', '2024-01-28', 'Baramulla', 'Kashmir', 20, 'Organized a roundtable connecting educators, community representatives, and civic voices around ethical coexistence, policy awareness, and local stabilization approaches.', 'Encouraged cross-community cooperation and clarified shared civic responsibilities.', 6),
      ];
    }
    
    // Default fallback
    return [];
  };

  const dummyContributors = getDummyContributors();
  const displayContributors = contributors && contributors.length > 0 ? contributors : dummyContributors;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {displayContributors.map((contributor, index) => (
        <motion.div
          key={contributor.user.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className={`relative bg-[#232B52] border-2 rounded-2xl p-6 ${
            index === 0 ? 'border-[#C5A85C] shadow-[0_0_30px_rgba(197,168,92,0.2)]' :
            index === 1 ? 'border-[#C5A85C]/40' :
            'border-[#C5A85C]/20'
          } hover:border-[#C5A85C]/40 transition-all duration-500`}
        >
          {/* Rank Badge */}
          {index < 3 && (
            <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              index === 0 ? 'bg-[#C5A85C] text-[#1C2340]' :
              index === 1 ? 'bg-[#C5A85C] text-[#1C2340]' :
              'bg-[#C5A85C] text-[#1C2340]'
            }`}>
              #{index + 1}
            </div>
          )}

          {/* User Avatar & Info */}
          <div className="flex items-center gap-4 mb-6">
            {contributor.user.avatar_url ? (<Image src={contributor.user.avatar_url} alt={contributor.user.full_name} width={64} height={64} className="rounded-full" />) : (
             <div className="w-16 h-16 bg-gradient-to-br from-[#C5A85C] to-[#D4BE90] rounded-full flex items-center justify-center text-[#1C2340] font-serif text-2xl font-bold">
             {contributor.user.full_name.charAt(0).toUpperCase()}
           </div>
            )}
            
            <div className="flex-1">
              <h3 className="font-serif text-lg text-white mb-1">
                {contributor.user.full_name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 bg-[#C5A85C]/20 text-[#C5A85C] rounded-full">
                  {contributor.contribution_count} {contributor.contribution_count === 1 ? 'Contribution' : 'Contributions'}
                </span>
                {contributor.collaboration_info?.specialization && (
                  <span className="text-xs px-2 py-1 bg-[#1C2340] text-[#AAB3CF] rounded-full">
                    {contributor.collaboration_info.specialization}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Collaboration Info */}
          {contributor.collaboration_info && (
            <div className="mb-6 p-4 bg-[#1C2340] rounded-lg border border-[#C5A85C]/10">
              <p className="text-[#C5A85C] text-xs uppercase tracking-wider mb-3">Collaboration Details</p>

              {contributor.collaboration_info.professionalBackground && (
                <div className="mb-3">
                  <p className="text-[#C5A85C]! text-xs mb-1">Professional Background</p>
                  <p className="text-white text-sm">{contributor.collaboration_info.professionalBackground}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-3">
                {contributor.collaboration_info.yearsExperience && (
                  <div>
                    <p className="text-[#6B7299] text-xs mb-1">Experience</p>
                    <p className="text-white text-sm">{contributor.collaboration_info.yearsExperience} years</p>
                  </div>
                )}
                {contributor.collaboration_info.country && (
                  <div>
                    <p className="text-[#6B7299] text-xs mb-1">Location</p>
                    <p className="text-white text-sm">{contributor.collaboration_info.country}</p>
                  </div>
                )}
              </div>

              {contributor.collaboration_info.proposedContribution && (
                <div>
                  <p className="text-[#6B7299] text-xs mb-1">Proposed Contribution</p>
                  <p className="text-[#AAB3CF] text-sm line-clamp-3">
                    {contributor.collaboration_info.proposedContribution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Latest Contribution */}
          {contributor.latest_contribution && (
            <div className="pt-4 border-t border-[#C5A85C]/10">
              <p className="text-[#C5A85C] text-xs uppercase tracking-wider mb-2">Latest Activity</p>
              <h4 className="text-white font-medium mb-3 line-clamp-2">
                {contributor.latest_contribution.title}
              </h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
                  <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(contributor.latest_contribution.activity_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
                  <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{contributor.latest_contribution.venue_city}, {contributor.latest_contribution.venue_country}</span>
                </div>
                <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
                  <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{contributor.latest_contribution.participant_count} participants</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#C5A85C]/10">
                <p className="text-[#AAB3CF] text-sm line-clamp-3">
                  {contributor.latest_contribution.task_conducted}
                </p>
              </div>

              {contributor.latest_contribution.results && (
                <div className="mt-3 pt-3 border-t border-[#C5A85C]/10">
                  <p className="text-[#C5A85C]! text-xs font-medium mb-1">Impact:</p>
                  <p className="text-[#AAB3CF] text-sm line-clamp-2">
                    {contributor.latest_contribution.results}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
