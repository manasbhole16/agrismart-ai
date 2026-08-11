import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/lib/utils';
import dbConnect from '@/lib/mongodb';
import Farm from '@/models/Farm';

// Mock data to return if DB is not connected
const MOCK_PLOTS = [
  {
    _id: "plot_pm_1235_0_a",
    name: "Plot PM-1235.0-a",
    farmerName: "Basavaraj Patil",
    sugarcaneVariety: "Co 86032",
    plantingDate: "2026-01-15T00:00:00Z",
    cropAgeDays: 186,
    cropAgeMonths: 6.2,
    areaAcres: 4.5,
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [75.312, 16.456],
          [75.315, 16.456],
          [75.315, 16.458],
          [75.312, 16.458],
          [75.312, 16.456]
        ]
      ]
    },
    waterStressIndex: 0.45,
    pumpStatus: "OFF"
  },
  {
    _id: "plot_pm_1235_0_b",
    name: "Plot PM-1235.0-b",
    farmerName: "Siddappa Gowda",
    sugarcaneVariety: "Co 86032",
    plantingDate: "2025-11-20T00:00:00Z",
    cropAgeDays: 242,
    cropAgeMonths: 8.0,
    areaAcres: 3.2,
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [75.316, 16.459],
          [75.319, 16.459],
          [75.319, 16.461],
          [75.316, 16.461],
          [75.316, 16.459]
        ]
      ]
    },
    waterStressIndex: 0.78,
    pumpStatus: "ON"
  }
];

export async function GET() {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json(MOCK_PLOTS);
    }
    const farms = await Farm.find({});
    if (!farms || farms.length === 0) {
      return NextResponse.json(MOCK_PLOTS);
    }
    return NextResponse.json(farms);
  } catch (error: unknown) {
    console.error('Error fetching plots:', error);
    return NextResponse.json(MOCK_PLOTS);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await dbConnect();
    if (!conn) {
      // Mock success if no DB
      return NextResponse.json({ success: true, data: { ...body, _id: "new_mock_id" } });
    }
    const farm = await Farm.create(body);
    return NextResponse.json({ success: true, data: farm });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
