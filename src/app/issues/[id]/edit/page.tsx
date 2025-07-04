import EditIssueForm from "@/components/EditIssueForm";

type IssueProps = Promise<{ id: string }>;

export default async function EditIssuePage(props: { params: IssueProps }) {
  const { id } = await props.params;
  const issueId = id;

  return <EditIssueForm issueId={issueId} />;
}
