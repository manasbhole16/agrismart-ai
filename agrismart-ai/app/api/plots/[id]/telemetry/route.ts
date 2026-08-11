import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/lib/utils';
import dbConnect from '@/lib/mongodb';
import Telemetry from '@/models/Telemetry';

const MOCK_TELEMETRY: Record<string, unknown> = {
  "plot_pm_1235_0_a": {
    plotId: "plot_pm_1235_0_a",
    timestamp: "2026-07-28T14:30:00Z",
    soilMoisture30cm: 32.4,
    soilMoisture60cm: 28.1,
    soilTemperature: 24.5,
    ambientTemperature: 31.2,
    relativeHumidity: 68.0,
    rainfall24h: 0.0,
    batteryLevel: 88
  },
  "plot_pm_1235_0_b": {
    plotId: "plot_pm_1235_0_b",
    timestamp: "2026-07-28T14:30:00Z",
    soilMoisture30cm: 19.8,
    soilMoisture60cm: 21.3,
    soilTemperature: 25.8,
    ambientTemperature: 32.5,
    relativeHumidity: 62.4,
    rainfall24h: 0.0,
    batteryLevel: 91
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
      return NextResponse.json(MOCK_TELEMETRY[id] || MOCK_TELEMETRY["plot_pm_1235_0_a"]);
    }
    const telemetry = await Telemetry.findOne({ farmId: id }).sort({ timestamp: -1 });
    if (!telemetry) {
      return NextResponse.json(MOCK_TELEMETRY[id] || MOCK_TELEMETRY["plot_pm_1235_0_a"]);
    }
    return NextResponse.json(telemetry);
  } catch (error: unknown) {
    console.error('Error fetching telemetry:', error);
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
      return NextResponse.json({ success: true, data: { ...body, farmId: id, timestamp: new Date() } });
    }
    const telemetry = await Telemetry.create({ ...body, farmId: id });
    return NextResponse.json({ success: true, data: telemetry });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
