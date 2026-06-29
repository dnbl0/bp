/**
 * Monthly driving report shown on the vehicle detail page. Modelled on the
 * connected-car style report (consumption hero, month-over-month comparison,
 * distance / trips / driving-time breakdown). Electrified vehicles report in
 * kWh/100 km, others in L/100 km.
 */
export interface DrivingStat {
  label: string;
  value: string;
  unit?: string;
  note: string;
}

export interface DrivingReportData {
  period: string;
  consumption: {
    value: string;
    unit: string;
    label: string;
    current: { label: string; value: number };
    previous: { label: string; value: number };
    deltaNote: string;
    /** lower consumption than last month → an improvement (greener). */
    improved: boolean;
  };
  stats: DrivingStat[];
}

const reports: Record<string, DrivingReportData> = {
  nx450h: {
    period: "March 2026",
    consumption: {
      value: "5.2",
      unit: "L / 100 km",
      label: "avg. consumption",
      current: { label: "March", value: 5.2 },
      previous: { label: "February", value: 5.6 },
      deltaNote: "7% less than the previous month",
      improved: true,
    },
    stats: [
      {
        label: "Distance",
        value: "1,694",
        unit: "km",
        note: "10% more than February (1,534 km)",
      },
      {
        label: "Trips taken",
        value: "25",
        note: "25% more than in February (20)",
      },
      {
        label: "Driving time",
        value: "28:20",
        unit: "h",
        note: "25% more than February (22:40 h)",
      },
    ],
  },
  ux300e: {
    period: "March 2026",
    consumption: {
      value: "16.8",
      unit: "kWh / 100 km",
      label: "avg. consumption",
      current: { label: "March", value: 16.8 },
      previous: { label: "February", value: 17.4 },
      deltaNote: "3% less than the previous month",
      improved: true,
    },
    stats: [
      {
        label: "Distance",
        value: "1,540",
        unit: "km",
        note: "10% more than February (1,400 km)",
      },
      {
        label: "Trips taken",
        value: "24",
        note: "20% more than in February (20)",
      },
      {
        label: "Driving time",
        value: "26:40",
        unit: "h",
        note: "18% more than February (22:35 h)",
      },
    ],
  },
};

export function drivingReportFor(id: string): DrivingReportData {
  return reports[id] ?? reports.nx450h;
}
