export interface Position {
  x: number;
  y: number;
}

export type NodeType = 'dataset' | 'feature' | 'insight' | 'chart' | 'transformation';

export type DataType = 'numeric' | 'categorical' | 'datetime' | 'text' | 'boolean';

export type CorrelationType = 'strong-positive' | 'moderate-positive' | 'weak' | 'moderate-negative' | 'strong-negative' | 'none';

export type ChartType = 'scatter' | 'histogram' | 'bar' | 'line' | 'correlation-matrix' | 'box';

export interface DatasetStats {
  rows: number;
  columns: number;
  missingValues: number;
  duplicates: number;
}

export interface FeatureStats {
  dataType: DataType;
  uniqueValues: number;
  missingCount: number;
  missingPercent: number;
  mean?: number;
  median?: number;
  min?: number;
  max?: number;
  stdDev?: number;
  topCategories?: { name: string; count: number }[];
}

export interface DatasetNodeData {
  id: string;
  type: 'dataset';
  name: string;
  position: Position;
  stats: DatasetStats;
  sampleData: Record<string, unknown>[];
  columns: string[];
}

export interface FeatureNodeData {
  id: string;
  type: 'feature';
  name: string;
  position: Position;
  datasetId: string;
  stats: FeatureStats;
  importance?: number;
  sampleValues: unknown[];
}

export interface InsightNodeData {
  id: string;
  type: 'insight';
  title: string;
  position: Position;
  description: string;
  confidence: number;
  relatedFeatures: string[];
  insightType: 'correlation' | 'pattern' | 'anomaly' | 'suggestion' | 'warning';
}

export interface ChartNodeData {
  id: string;
  type: 'chart';
  title: string;
  position: Position;
  chartType: ChartType;
  featureIds: string[];
  data: Record<string, unknown>[];
}

export interface TransformationNodeData {
  id: string;
  type: 'transformation';
  name: string;
  position: Position;
  transformType: 'normalize' | 'encode' | 'bin' | 'aggregate' | 'derive';
  inputFeatureId: string;
  outputFeatureId?: string;
  config: Record<string, unknown>;
}

export type CanvasNodeData = 
  | DatasetNodeData 
  | FeatureNodeData 
  | InsightNodeData 
  | ChartNodeData 
  | TransformationNodeData;

export type ConnectionType = 'data-flow' | 'strong-correlation' | 'moderate-correlation' | 'weak-correlation' | 'inverse-correlation' | 'derives-from';

export interface CanvasConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: ConnectionType;
  label?: string;
  correlationValue?: number;
}

export interface CanvasViewport {
  x: number;
  y: number;
  zoom: number;
}

export interface FloatingPanelItem {
  id: string;
  label: string;
  icon: string;
  category: string;
  description?: string;
}

export interface WorkflowData {
  nodes: CanvasNodeData[];
  connections: CanvasConnection[];
}

export interface AIInsightRequest {
  datasetId: string;
  featureIds?: string[];
  analysisType: 'explore' | 'correlations' | 'patterns' | 'suggestions';
}
