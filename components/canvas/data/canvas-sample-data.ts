import {
  WorkflowData,
  FloatingPanelItem,
  DatasetNodeData,
  FeatureNodeData,
  InsightNodeData,
  ChartNodeData,
} from '@/components/canvas/models/canvas-types';

const sampleDatasetRows = [
  { age: 34, income: 72000, education_years: 16, credit_score: 720, loan_amount: 25000, approved: true },
  { age: 28, income: 45000, education_years: 14, credit_score: 680, loan_amount: 15000, approved: true },
  { age: 45, income: 95000, education_years: 18, credit_score: 780, loan_amount: 50000, approved: true },
  { age: 23, income: 32000, education_years: 12, credit_score: 620, loan_amount: 8000, approved: false },
  { age: 52, income: 120000, education_years: 20, credit_score: 800, loan_amount: 75000, approved: true },
  { age: 31, income: 58000, education_years: 16, credit_score: 700, loan_amount: 20000, approved: true },
  { age: 41, income: 82000, education_years: 14, credit_score: 740, loan_amount: 35000, approved: true },
  { age: 26, income: 38000, education_years: 14, credit_score: 650, loan_amount: 12000, approved: false },
];

const datasetNode: DatasetNodeData = {
  id: 'dataset-1',
  type: 'dataset',
  name: 'Loan Applications',
  position: { x: 80, y: 200 },
  stats: {
    rows: 10847,
    columns: 6,
    missingValues: 234,
    duplicates: 12,
  },
  sampleData: sampleDatasetRows,
  columns: ['age', 'income', 'education_years', 'credit_score', 'loan_amount', 'approved'],
};

const featureNodes: FeatureNodeData[] = [
  {
    id: 'feature-income',
    type: 'feature',
    name: 'Income',
    position: { x: 340, y: 80 },
    datasetId: 'dataset-1',
    stats: {
      dataType: 'numeric',
      uniqueValues: 8234,
      missingCount: 45,
      missingPercent: 0.4,
      mean: 67500,
      median: 62000,
      min: 18000,
      max: 450000,
      stdDev: 28400,
    },
    importance: 0.89,
    sampleValues: [72000, 45000, 95000, 32000, 120000],
  },
  {
    id: 'feature-credit',
    type: 'feature',
    name: 'Credit Score',
    position: { x: 340, y: 200 },
    datasetId: 'dataset-1',
    stats: {
      dataType: 'numeric',
      uniqueValues: 312,
      missingCount: 89,
      missingPercent: 0.8,
      mean: 698,
      median: 705,
      min: 300,
      max: 850,
      stdDev: 78,
    },
    importance: 0.94,
    sampleValues: [720, 680, 780, 620, 800],
  },
  {
    id: 'feature-age',
    type: 'feature',
    name: 'Age',
    position: { x: 340, y: 320 },
    datasetId: 'dataset-1',
    stats: {
      dataType: 'numeric',
      uniqueValues: 58,
      missingCount: 12,
      missingPercent: 0.1,
      mean: 38,
      median: 36,
      min: 18,
      max: 75,
      stdDev: 12.4,
    },
    importance: 0.42,
    sampleValues: [34, 28, 45, 23, 52],
  },
  {
    id: 'feature-approved',
    type: 'feature',
    name: 'Approved (Target)',
    position: { x: 340, y: 440 },
    datasetId: 'dataset-1',
    stats: {
      dataType: 'boolean',
      uniqueValues: 2,
      missingCount: 0,
      missingPercent: 0,
      topCategories: [
        { name: 'true', count: 7823 },
        { name: 'false', count: 3024 },
      ],
    },
    importance: 1.0,
    sampleValues: [true, true, true, false, true],
  },
];

const insightNodes: InsightNodeData[] = [
  {
    id: 'insight-1',
    type: 'insight',
    title: 'Strong Predictor Found',
    position: { x: 620, y: 120 },
    description: 'Credit Score has a strong positive correlation (0.87) with loan approval. Consider this as a primary feature for your model.',
    confidence: 0.94,
    relatedFeatures: ['feature-credit', 'feature-approved'],
    insightType: 'correlation',
  },
  {
    id: 'insight-2',
    type: 'insight',
    title: 'Income-Age Pattern',
    position: { x: 620, y: 280 },
    description: 'Income tends to peak between ages 45-55, then slightly decreases. This non-linear relationship might benefit from polynomial features.',
    confidence: 0.78,
    relatedFeatures: ['feature-income', 'feature-age'],
    insightType: 'pattern',
  },
  {
    id: 'insight-3',
    type: 'insight',
    title: 'Missing Data Alert',
    position: { x: 620, y: 420 },
    description: 'Credit Score has 0.8% missing values. Consider imputation using median or model-based methods before training.',
    confidence: 1.0,
    relatedFeatures: ['feature-credit'],
    insightType: 'warning',
  },
];

const chartNodes: ChartNodeData[] = [
  {
    id: 'chart-scatter',
    type: 'chart',
    title: 'Income vs Credit Score',
    position: { x: 900, y: 100 },
    chartType: 'scatter',
    featureIds: ['feature-income', 'feature-credit'],
    data: sampleDatasetRows.map((row) => ({
      x: row.income,
      y: row.credit_score,
      approved: row.approved,
    })),
  },
  {
    id: 'chart-histogram',
    type: 'chart',
    title: 'Age Distribution',
    position: { x: 900, y: 320 },
    chartType: 'histogram',
    featureIds: ['feature-age'],
    data: [
      { range: '18-25', count: 1842 },
      { range: '26-35', count: 3421 },
      { range: '36-45', count: 2876 },
      { range: '46-55', count: 1923 },
      { range: '56-65', count: 612 },
      { range: '66+', count: 173 },
    ],
  },
];

export const sampleWorkflowData: WorkflowData = {
  nodes: [datasetNode, ...featureNodes, ...insightNodes, ...chartNodes],
  connections: [
    { id: 'conn-d1-f1', sourceId: 'dataset-1', targetId: 'feature-income', type: 'data-flow' },
    { id: 'conn-d1-f2', sourceId: 'dataset-1', targetId: 'feature-credit', type: 'data-flow' },
    { id: 'conn-d1-f3', sourceId: 'dataset-1', targetId: 'feature-age', type: 'data-flow' },
    { id: 'conn-d1-f4', sourceId: 'dataset-1', targetId: 'feature-approved', type: 'data-flow' },
    { id: 'conn-f2-i1', sourceId: 'feature-credit', targetId: 'insight-1', type: 'strong-correlation', correlationValue: 0.87 },
    { id: 'conn-f1-f2', sourceId: 'feature-income', targetId: 'feature-credit', type: 'moderate-correlation', correlationValue: 0.62 },
    { id: 'conn-f1-i2', sourceId: 'feature-income', targetId: 'insight-2', type: 'moderate-correlation' },
    { id: 'conn-f3-i2', sourceId: 'feature-age', targetId: 'insight-2', type: 'moderate-correlation' },
    { id: 'conn-f2-i3', sourceId: 'feature-credit', targetId: 'insight-3', type: 'data-flow' },
    { id: 'conn-f1-c1', sourceId: 'feature-income', targetId: 'chart-scatter', type: 'data-flow' },
    { id: 'conn-f2-c1', sourceId: 'feature-credit', targetId: 'chart-scatter', type: 'data-flow' },
    { id: 'conn-f3-c2', sourceId: 'feature-age', targetId: 'chart-histogram', type: 'data-flow' },
  ],
};

export const floatingPanelItems: FloatingPanelItem[] = [
  { id: 'dataset', label: 'Import Dataset', icon: 'Upload', category: 'Data', description: 'Upload CSV or connect to data source' },
  { id: 'feature', label: 'Extract Feature', icon: 'Columns', category: 'Data', description: 'Select a column from your dataset' },
  { id: 'scatter', label: 'Scatter Plot', icon: 'ScatterChart', category: 'Visualize', description: 'Compare two numeric features' },
  { id: 'histogram', label: 'Histogram', icon: 'BarChart3', category: 'Visualize', description: 'Show distribution of a feature' },
  { id: 'correlation', label: 'Correlation Matrix', icon: 'Grid3x3', category: 'Visualize', description: 'See all feature correlations' },
  { id: 'box', label: 'Box Plot', icon: 'BoxSelect', category: 'Visualize', description: 'Show quartiles and outliers' },
  { id: 'ai-explore', label: 'AI Explore', icon: 'Sparkles', category: 'AI Analysis', description: 'Get AI-powered insights' },
  { id: 'find-correlations', label: 'Find Correlations', icon: 'Link', category: 'AI Analysis', description: 'Discover feature relationships' },
  { id: 'suggest-features', label: 'Suggest Features', icon: 'Lightbulb', category: 'AI Analysis', description: 'Get feature engineering ideas' },
  { id: 'normalize', label: 'Normalize', icon: 'Scaling', category: 'Transform', description: 'Scale numeric values to 0-1' },
  { id: 'encode', label: 'One-Hot Encode', icon: 'Binary', category: 'Transform', description: 'Convert categories to numbers' },
  { id: 'bin', label: 'Bin Values', icon: 'Layers', category: 'Transform', description: 'Group numeric values into bins' },
];

export const sidebarNavItems = [
  { id: 'canvas', icon: 'LayoutDashboard', label: 'Canvas', href: '/canvas' },
  { id: 'datasets', icon: 'Database', label: 'Datasets', href: '#' },
  { id: 'experiments', icon: 'FlaskConical', label: 'Experiments', href: '#' },
  { id: 'models', icon: 'Brain', label: 'Models', href: '#' },
];

export const sidebarUtilityItems = [
  { id: 'settings', icon: 'Settings', label: 'Settings', href: '#' },
  { id: 'help', icon: 'HelpCircle', label: 'Help', href: '#' },
];

export const emptyWorkflowData: WorkflowData = {
  nodes: [],
  connections: [],
};
