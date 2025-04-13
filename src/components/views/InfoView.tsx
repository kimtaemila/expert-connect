
import { Header } from "@/components/layout/Header";

export function InfoView() {
  return (
    <>
      <Header title="Information" />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">About Expert Knowledge Graph</h1>
        <p className="text-muted-foreground mb-4">
          The Expert Knowledge Graph visualizes connections between experts, topics, and industries using an interactive 3D knowledge graph.
        </p>
        <p className="text-muted-foreground mb-4">
          This dashboard provides real-time data analysis, natural language querying, and AI-powered insights to help you find the right experts.
        </p>
      </div>
    </>
  );
}
