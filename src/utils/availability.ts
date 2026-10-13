export const AVAILABILITY_TIME_ZONE = 'America/Los_Angeles';

export type AvailabilityDate = {
  day: number;
  month: number;
  year: number;
};

function getDateInTimeZone(now: Date, timeZone: string): AvailabilityDate {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'numeric',
    timeZone,
    year: 'numeric',
  }).formatToParts(now);

  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type === 'day' || type === 'month' || type === 'year')
      .map(({ type, value }) => [type, Number(value)]),
  );

  return {
    day: values.day,
    month: values.month,
    year: values.year,
  };
}

export function getNextAvailableMonday(
  now = new Date(),
  timeZone = AVAILABILITY_TIME_ZONE,
): AvailabilityDate {
  // Temporary availability override; remove to resume the weekly schedule.
  const availabilityOverride: AvailabilityDate | null = { day: 13, month: 11, year: 2026 };
  if (availabilityOverride) return availabilityOverride;

  const today = getDateInTimeZone(now, timeZone);
  const todayUtc = new Date(Date.UTC(today.year, today.month - 1, today.day));
  const daysUntilMonday = ((8 - todayUtc.getUTCDay()) % 7) || 7;

  todayUtc.setUTCDate(todayUtc.getUTCDate() + daysUntilMonday);

  return {
    day: todayUtc.getUTCDate(),
    month: todayUtc.getUTCMonth() + 1,
    year: todayUtc.getUTCFullYear(),
  };
}

export function formatAvailabilityDate(date: AvailabilityDate) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(Date.UTC(date.year, date.month - 1, date.day)));
}

export function formatAvailabilityMonth(date: AvailabilityDate) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(date.year, date.month - 1, 1)));
}
