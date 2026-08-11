import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/lib/utils';
import dbConnect from '@/lib/mongodb';
import AIAdvisoryLog from '@/models/AIAdvisoryLog';

const MOCK_RECOMMENDATIONS: Record<string, unknown> = {
  "plot_pm_1235_0_a": {
    recommendationId: "rec_987654",
    plotId: "plot_pm_1235_0_a",
    generatedAt: "2026-07-28T06:00:00Z",
    nextIrrigationDate: "2026-07-29T05:00:00Z",
    durationHours: 2.5,
    waterRequirementLiters: 45000,
    waterStressIndex: 0.72,
    yieldLossPercentageIfDelayed: 8.5,
    electricityWindow: {
      start: "05:00",
      end: "08:00"
    },
    fertigation: {
      syncWithIrrigation: true,
      nutrients: [
        { name: "Urea", amountKg: 25.0 },
        { name: "DAP", amountKg: 15.0 }
      ]
    },
    llmAdvisory: {
      en: "Irrigate tomorrow morning for 2.5 hours and apply Urea.",
      kn: "ನಾಳೆ ಬೆಳಿಗ್ಗೆ 2.5 ಗಂಟೆಗಳ ಕಾಲ ನೀರಾವರಿ ಮಾಡಿ ಮತ್ತು ಯೂರಿಯಾವನ್ನು ಅನ್ವಯಿಸಿ."
    },
    status: "PENDING"
  },
  "plot_pm_1235_0_b": {
    recommendationId: "rec_987655",
    plotId: "plot_pm_1235_0_b",
    generatedAt: "2026-07-28T06:00:00Z",
    nextIrrigationDate: "2026-07-28T18:00:00Z",
    durationHours: 1.5,
    waterRequirementLiters: 27000,
    waterStressIndex: 0.35,
    yieldLossPercentageIfDelayed: 2.0,
    electricityWindow: {
      start: "17:00",
      end: "20:00"
    },
    fertigation: {
      syncWithIrrigation: false,
      nutrients: []
    },
    llmAdvisory: {
      en: "Irrigate this evening for 1.5 hours.",
      kn: "ಈ ಸಂಜೆ 1.5 ಗಂಟೆಗಳ ಕಾಲ ನೀರಾವರಿ ಮಾಡಿ."
    },
    status: "PENDING"
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json(MOCK_RECOMMENDATIONS[id] || MOCK_RECOMMENDATIONS["plot_pm_1235_0_a"]);
    }
    const advisory = await AIAdvisoryLog.findOne({ farmId: id }).sort({ generatedAt: -1 });
    if (!advisory) {
      return NextResponse.json(MOCK_RECOMMENDATIONS[id] || MOCK_RECOMMENDATIONS["plot_pm_1235_0_a"]);
    }
    return NextResponse.json(advisory);
  } catch (error: unknown) {
    console.error('Error fetching advisory:', error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json({ success: true, data: { ...body, farmId: id, generatedAt: new Date() } });
    }
    const advisory = await AIAdvisoryLog.create({ ...body, farmId: id });
    return NextResponse.json({ success: true, data: advisory });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
