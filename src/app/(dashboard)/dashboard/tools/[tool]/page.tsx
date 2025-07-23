import PageContainer from "@/components/dashboard/PageContainer";
import { tools, ToolType } from "@/config/tools";
import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const toolType = (await params).tool as ToolType;
  const tool = tools[toolType];
  console.log("tool", tool);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <PageContainer>
      <PageHeader title={tool.title} description={tool.description} />
      <div className="max-w-2xl">
        <ToolComponent />
      </div>
    </PageContainer>
  );
}
