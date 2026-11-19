import { type FormEvent, useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  AVAILABLE_TIME_SLOTS,
  formatPrice,
  SALON_INFO,
  SERVICES,
  TEAM_MEMBERS,
} from '../data/salonData';

interface BookingSectionProps {
  preselectedServiceId: string;
  preselectedStylistId: string;
  bookingFocusSignal: number;
}

interface ConfirmedBooking {
  referenceId: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  stylistName: string;
  date: string;
  time: string;
  notes: string;
}

function getDefaultDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function BookingSection({
  preselectedServiceId,
  preselectedStylistId,
  bookingFocusSignal,
}: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [serviceId, setServiceId] = useState(
    preselectedServiceId || SERVICES[0].id
  );
  const [stylistId, setStylistId] = useState(preselectedStylistId || 'any');
  const [date, setDate] = useState(getDefaultDate);
  const [time, setTime] = useState(AVAILABLE_TIME_SLOTS[2]);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] =
    useState<ConfirmedBooking | null>(null);
  const [highlightBanner, setHighlightBanner] = useState(false);

  // Sync external service/stylist selections when user clicks "Book This" or "Book with [Stylist]"
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
      setConfirmedBooking(null);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedStylistId) {
      setStylistId(preselectedStylistId);
      setConfirmedBooking(null);
    }
  }, [preselectedStylistId]);

  useEffect(() => {
    if (bookingFocusSignal > 0) {
      setHighlightBanner(true);
      const timer = window.setTimeout(() => setHighlightBanner(false), 3200);
      return () => window.clearTimeout(timer);
    }
  }, [bookingFocusSignal]);

  const selectedService =
    SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];

  const selectedStylistName =
    stylistId === 'any'
      ? 'Any Available Senior Specialist'
      : TEAM_MEMBERS.find((m) => m.id === stylistId)?.name ??
        'Any Available Senior Specialist';

  function handlePhoneChange(value: string) {
    setPhone(value);
    if (sameAsPhone) {
      setWhatsapp(value);
    }
  }

  function handleSameAsPhoneToggle(checked: boolean) {
    setSameAsPhone(checked);
    if (checked) {
      setWhatsapp(phone);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedWhatsapp = (sameAsPhone ? phone : whatsapp).trim();

    if (trimmedName.length < 2) {
      setErrorMessage('Please enter your full name so we can reserve your chair.');
      return;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setErrorMessage(
        'Please enter a valid 10+ digit phone number (for example, 0334-8592187).'
      );
      return;
    }

    const whatsappDigits = trimmedWhatsapp.replace(/\D/g, '');
    if (whatsappDigits.length < 10) {
      setErrorMessage(
        'Please enter a valid WhatsApp number or select "Same as phone number".'
      );
      return;
    }

    if (!date) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }

    const refSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `MBP-${new Date().getFullYear()}-${refSuffix}`;

    setConfirmedBooking({
      referenceId,
      fullName: trimmedName,
      phone: trimmedPhone,
      whatsapp: trimmedWhatsapp,
      serviceName: selectedService.name,
      servicePrice: formatPrice(selectedService.pricePkr, 'PKR'),
      serviceDuration: selectedService.duration,
      stylistName: selectedStylistName,
      date,
      time,
      notes: notes.trim(),
    });
  }

  function handleBookAnother() {
    setConfirmedBooking(null);
    setNotes('');
    setErrorMessage(null);
  }

  const whatsappSummaryUrl = confirmedBooking
    ? `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
        `Assalam-o-Alaikum Maria's Beauty Parlour,\n\nI just submitted an online booking request:\n• Reference: ${confirmedBooking.referenceId}\n• Name: ${confirmedBooking.fullName}\n• Phone: ${confirmedBooking.phone}\n• Service: ${confirmedBooking.serviceName} (${confirmedBooking.servicePrice})\n• Preferred Specialist: ${confirmedBooking.stylistName}\n• Date & Time: ${confirmedBooking.date} at ${confirmedBooking.time}${
          confirmedBooking.notes ? `\n• Notes: ${confirmedBooking.notes}` : ''
        }\n\nPlease confirm availability.`
      )}`
    : SALON_INFO.whatsappLink;

  return (
    <section
      id="booking"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] py-20 lg:py-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Concierge & Salon Practical Details */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-medium text-[var(--accent)]">
              Online Reservations · Instant Confirmation
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-2.5 text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.15rem)' }}
            >
              Book Your Appointment
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              Reserve your preferred service, stylist, and time slot online in
              under a minute. Our Moon Garden reception team also confirms every
              bridal or treatment booking promptly on WhatsApp.
            </p>

            {/* Studio Practicals List */}
            <div className="mt-8 border-t border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)] text-sm">
              <div className="py-4 flex items-start gap-3.5">
                <MapPin
                  className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    Salon Address
                  </p>
                  <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    {SALON_INFO.fullAddress}
                  </p>
                  <a
                    href={SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] underline underline-offset-4"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Clock
                  className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    Opening Hours
                  </p>
                  <p className="text-[var(--text-secondary)] mt-0.5 tabular-nums">
                    {SALON_INFO.hoursSummary}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Open 7 days a week · Early bridal call times available on request
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Phone
                  className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    Direct Phone &amp; WhatsApp Desk
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 tabular-nums">
                    <a
                      href={SALON_INFO.primaryPhoneHref}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {SALON_INFO.primaryPhoneDisplay}
                    </a>
                    <span className="text-[var(--border-strong)]" aria-hidden="true">
                      /
                    </span>
                    <a
                      href={SALON_INFO.secondaryPhoneHref}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {SALON_INFO.secondaryPhoneDisplay}
                    </a>
                  </div>
                  <a
                    href={SALON_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Message reception directly on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Booking Form / Confirmation Receipt */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 lg:p-10 bg-[var(--bg-surface)] border rounded-lg transition-colors ${
                highlightBanner
                  ? 'border-[var(--accent)]'
                  : 'border-[var(--border-hairline)]'
              }`}
            >
              {confirmedBooking ? (
                /* Instant Success Confirmation Receipt */
                <div role="status" aria-live="polite">
                  <div
                    className="p-4 rounded-md border flex items-start gap-3"
                    style={{
                      backgroundColor: 'var(--success-bg)',
                      borderColor: 'var(--success-border)',
                      color: 'var(--success-text)',
                    }}
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">
                        Appointment Request Confirmed — Reference{' '}
                        <span className="tabular-nums">
                          {confirmedBooking.referenceId}
                        </span>
                      </p>
                      <p className="text-xs mt-1 opacity-90">
                        Thank you, {confirmedBooking.fullName}. Your slot is
                        logged with Maria&apos;s Beauty Parlour reception.
                      </p>
                    </div>
                  </div>

                  <dl className="mt-6 border-t border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)] text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[var(--text-muted)]">Selected Service</dt>
                      <dd className="font-semibold text-[var(--text-primary)] text-right">
                        {confirmedBooking.serviceName}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[var(--text-muted)]">Estimated Fee &amp; Duration</dt>
                      <dd className="font-medium text-[var(--text-primary)] tabular-nums text-right">
                        {confirmedBooking.servicePrice} · {confirmedBooking.serviceDuration}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[var(--text-muted)]">Preferred Specialist</dt>
                      <dd className="font-medium text-[var(--text-primary)] text-right">
                        {confirmedBooking.stylistName}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[var(--text-muted)]">Date &amp; Time</dt>
                      <dd className="font-semibold text-[var(--text-primary)] tabular-nums text-right">
                        {confirmedBooking.date} · {confirmedBooking.time}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[var(--text-muted)]">Contact / WhatsApp</dt>
                      <dd className="text-[var(--text-primary)] tabular-nums text-right">
                        {confirmedBooking.phone} / {confirmedBooking.whatsapp}
                      </dd>
                    </div>
                    {confirmedBooking.notes && (
                      <div className="py-3 flex justify-between gap-4">
                        <dt className="text-[var(--text-muted)]">Special Notes</dt>
                        <dd className="text-[var(--text-secondary)] text-right max-w-xs">
                          {confirmedBooking.notes}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappSummaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--bg-inverse-hover)] rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Summary on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleBookAnother}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Appointment Booking Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[var(--border-hairline)]">
                    <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                      Appointment Details
                    </h3>
                    <span className="text-xs text-[var(--text-muted)] tabular-nums">
                      Selected: {formatPrice(selectedService.pricePkr, 'PKR')} ·{' '}
                      {selectedService.duration}
                    </span>
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 text-xs sm:text-sm rounded-md border"
                      style={{
                        backgroundColor: 'var(--error-bg)',
                        borderColor: 'var(--error-border)',
                        color: 'var(--error-text)',
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-fullname"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Ayesha Siddiqui"
                        className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full px-3.5 py-2.5 text-sm tabular-nums bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <label
                        htmlFor="booking-whatsapp"
                        className="block text-xs font-semibold text-[var(--text-primary)]"
                      >
                        WhatsApp Number *
                      </label>
                      <label className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={sameAsPhone}
                          onChange={(e) =>
                            handleSameAsPhoneToggle(e.target.checked)
                          }
                          className="accent-[var(--accent)] cursor-pointer"
                        />
                        <span>Same as phone number</span>
                      </label>
                    </div>
                    <input
                      id="booking-whatsapp"
                      type="tel"
                      required
                      disabled={sameAsPhone}
                      value={sameAsPhone ? phone : whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm tabular-nums bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none disabled:opacity-65"
                    />
                  </div>

                  {/* Row 3: Select Service & Select Stylist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-service"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Select Service *
                      </label>
                      <select
                        id="booking-service"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none cursor-pointer"
                      >
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} ({formatPrice(service.pricePkr, 'PKR')})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-stylist"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Select Stylist
                      </label>
                      <select
                        id="booking-stylist"
                        value={stylistId}
                        onChange={(e) => setStylistId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none cursor-pointer"
                      >
                        <option value="any">Any Available Senior Specialist</option>
                        {TEAM_MEMBERS.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name} — {member.role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Date Picker & Interactive Time Slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <input
                          id="booking-date"
                          type="date"
                          required
                          min={getTodayDate()}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm tabular-nums bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-7">
                      <span className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                        Preferred Time Slot *
                      </span>
                      <div
                        role="radiogroup"
                        aria-label="Preferred appointment time"
                        className="grid grid-cols-4 gap-1.5"
                      >
                        {AVAILABLE_TIME_SLOTS.map((slot) => {
                          const isSelected = time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setTime(slot)}
                              className={`px-2 py-2 text-xs font-medium rounded-md border tabular-nums transition-colors whitespace-nowrap cursor-pointer ${
                                isSelected
                                  ? 'bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] border-[var(--bg-inverse)]'
                                  : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Special Notes / Requests */}
                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                    >
                      Special Notes or Requests (Optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share hair length, skin sensitivities, bridal event date, or multiple-service requests..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none resize-y"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--bg-inverse-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>Confirm Appointment</span>
                    </button>

                    <p className="text-xs text-[var(--text-muted)]">
                      No advance card payment required for standard studio bookings.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
