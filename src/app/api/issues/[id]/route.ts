import { NextResponse } from "next/server";
import { getIssueById } from "@/lib/server-actions/issue-actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const issueId = resolvedParams.id;
    const issue = await getIssueById(issueId);

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue data" },
      { status: 500 }
    );
  }
}
