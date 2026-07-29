import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AIAdvisoryLog from '@/models/AIAdvisoryLog';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; recId: string }> }
) {
  try {
    const { id, recId } = await params;
    const body = await request.json(); // expected: { status: 'ACCEPTED'|'REJECTED'|'ADJUSTED', adjustedDurationHours?: number, reason?: string, userId: string }
    const { status, adjustedDurationHours, reason, userId } = body;

    const conn = await dbConnect();
    if (!conn) {
      // Mock Success Response
      return NextResponse.json({
        status: "success",
        message: `Recommendation override saved successfully (Mock DB Mode).`,
        data: {
          recommendationId: recId,
          plotId: id,
          override: {
            status,
            adjustedDurationHours,
            reason,
            updatedBy: userId,
            updatedAt: new Date()
          }
        }
      });
    }

    // Try finding by _id or recId depending on how it's logged
    const advisory = await AIAdvisoryLog.findOneAndUpdate(
      { farmId: id }, // simple lookup for demo/mock simplicity
      {
        $set: {
          "override.status": status,
          "override.adjustedDurationHours": adjustedDurationHours || null,
          "override.reason": reason || "",
          "override.updatedBy": userId,
          "override.updatedAt": new Date()
        }
      },
      { new: true, sort: { generatedAt: -1 } }
    );

    if (!advisory) {
      return NextResponse.json({ error: "Recommendation advisory log not found." }, { status: 404 });
    }

    return NextResponse.json({
      status: "success",
      message: "Recommendation override saved successfully.",
      data: advisory
    });
  } catch (error: any) {
    console.error('Error recording override:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
