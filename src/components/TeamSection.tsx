import { ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../data/salonData';
import { SalonImage } from './SalonImage';

interface TeamSectionProps {
  onBookWithStylist: (member: TeamMember) => void;
}

export function TeamSection({ onBookWithStylist }: TeamSectionProps) {
  return (
    <section
      id="team"
      className="bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] py-20 lg:py-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-2xl pb-10 border-b border-[var(--border-hairline)]">
          <p className="text-xs sm:text-sm font-medium text-[var(--accent)]">
            Senior Specialists · Combined 40+ Years Experience
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-2.5 text-balance leading-[1.1]"
            style={{ fontSize: 'clamp(2rem, 3.4vw, 3.15rem)' }}
          >
            Meet Our Professional Team
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Every haircut, clinical facial, and bridal appointment is handled by
            seasoned specialists trained in modern hair science, dermal safety,
            and natural South Asian aesthetics.
          </p>
        </div>

        {/* 4-Column Specialist Profiles Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="flex flex-col justify-between bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-lg overflow-hidden"
            >
              <div>
                {/* 3:4 Editorial Portrait (.jpg) */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
                  <SalonImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>

                {/* Specialist Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="truncate">{member.role}</span>
                  </div>

                  <div className="mt-1.5 flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                      {member.name}
                    </h3>
                    <span className="text-xs font-medium text-[var(--accent)] tabular-nums whitespace-nowrap shrink-0">
                      {member.experienceYears} yrs exp
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-medium text-[var(--text-primary)]">
                    {member.specialty}
                  </p>

                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Footer Actions & Social Links */}
              <div className="px-5 py-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Message ${member.name} on WhatsApp`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onBookWithStylist(member)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
                >
                  <span>Book with {member.firstName}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
