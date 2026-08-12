export type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

// Analytics is intentionally disabled in this local branding exploration.
// The restored UI keeps the production event hooks without transmitting preview activity.
export function track(_event: string, _properties: AnalyticsProperties = {}) {}

export function setCtaVisibility(
  _ctaId: string,
  _visible: boolean,
  _ratio: number,
  _source: string,
  _label: string,
) {}

export function setSectionVisibility(
  _section: string,
  _visible: boolean,
  _ratio: number,
  _order: number,
) {}
