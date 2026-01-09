'use client';

import { useState, useCallback } from 'react';
import { CanvasLayout } from '@/components/canvas/CanvasLayout';
import { WorkflowCanvas } from '@/components/canvas/WorkflowCanvas';
import { CanvasConnectionsLayer } from '@/components/canvas/CanvasConnection';
import { CanvasMinimap } from '@/components/canvas/CanvasMinimap';
import { FloatingPanel } from '@/components/canvas/FloatingPanel';
import { DataUploadPanel } from '@/components/canvas/DataUploadPanel';
import { EmptyCanvasState } from '@/components/canvas/EmptyCanvasState';
import { DatasetNode } from '@/components/canvas/nodes/DatasetNode';
import { FeatureNode } from '@/components/canvas/nodes/FeatureNode';
import { InsightNode } from '@/components/canvas/nodes/InsightNode';
import { ChartNode } from '@/components/canvas/nodes/ChartNode';
import {
  sampleWorkflowData,
  floatingPanelItems,
  emptyWorkflowData,
} from '@/components/canvas/data/canvas-sample-data';
import {
  CanvasNodeData,
  CanvasViewport,
  Position,
  FloatingPanelItem,
  DatasetNodeData,
  FeatureNodeData,
  InsightNodeData,
  ChartNodeData,
  CanvasConnection,
} from '@/components/canvas/models/canvas-types';

export default function CanvasPage() {
  const [nodes, setNodes] = useState<CanvasNodeData[]>(emptyWorkflowData.nodes);
  const [connections, setConnections] = useState<CanvasConnection[]>(emptyWorkflowData.connections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewport, setViewport] = useState<CanvasViewport>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [floatingPanel, setFloatingPanel] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });
  const [isDataUploadOpen, setIsDataUploadOpen] = useState(false);

  const isEmpty = nodes.length === 0;

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedConnectionId(null);
  }, []);

  const handleNodePositionChange = useCallback(
    (nodeId: string, newPosition: Position) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === nodeId ? { ...node, position: newPosition } : node
        )
      );
      setHasUnsavedChanges(true);
    },
    []
  );

  const handleConnectionClick = useCallback((connectionId: string) => {
    setSelectedConnectionId(connectionId);
    setSelectedNodeId(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedConnectionId(null);
    setFloatingPanel((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleViewportChange = useCallback((newViewport: CanvasViewport) => {
    setViewport(newViewport);
  }, []);

  const handleZoomIn = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: Math.min(2, prev.zoom + 0.1),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: Math.max(0.25, prev.zoom - 0.1),
    }));
  }, []);

  const handleResetView = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 });
  }, []);

  const handleSelectPanelItem = useCallback((item: FloatingPanelItem) => {
    if (item.id === 'dataset') {
      setIsDataUploadOpen(true);
    } else {
      console.log('Selected:', item);
    }
  }, []);

  const handleCloseFloatingPanel = useCallback(() => {
    setFloatingPanel((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleImportData = useCallback(() => {
    setIsDataUploadOpen(true);
  }, []);

  const handleLoadSample = useCallback(() => {
    setNodes(sampleWorkflowData.nodes);
    setConnections(sampleWorkflowData.connections);
    setHasUnsavedChanges(true);
  }, []);

  const handleDataImport = useCallback(
    (data: { columns: string[]; rows: Record<string, unknown>[]; rowCount: number }, name: string) => {
      const newDataset: DatasetNodeData = {
        id: `dataset-${Date.now()}`,
        type: 'dataset',
        name,
        position: { x: 100, y: 200 },
        stats: {
          rows: data.rowCount,
          columns: data.columns.length,
          missingValues: 0,
          duplicates: 0,
        },
        sampleData: data.rows,
        columns: data.columns,
      };

      setNodes((prev) => [...prev, newDataset]);
      setHasUnsavedChanges(true);
    },
    []
  );

  const handleGenerateInsights = useCallback(() => {
    const datasetNodes = nodes.filter((n) => n.type === 'dataset');
    if (datasetNodes.length === 0) {
      setIsDataUploadOpen(true);
      return;
    }
    console.log('Generating AI insights...');
  }, [nodes]);

  const handleExport = useCallback(() => {
    console.log('Exporting...');
  }, []);

  const handleSave = useCallback(() => {
    setHasUnsavedChanges(false);
    console.log('Saved!');
  }, []);

  const handleDismissInsight = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setConnections((prev) =>
      prev.filter((c) => c.sourceId !== nodeId && c.targetId !== nodeId)
    );
    setHasUnsavedChanges(true);
  }, []);

  const renderNode = (node: CanvasNodeData) => {
    const commonProps = {
      isSelected: selectedNodeId === node.id,
      onSelect: handleNodeSelect,
      onPositionChange: handleNodePositionChange,
    };

    switch (node.type) {
      case 'dataset':
        return (
          <DatasetNode
            key={node.id}
            node={node as DatasetNodeData}
            {...commonProps}
          />
        );
      case 'feature':
        return (
          <FeatureNode
            key={node.id}
            node={node as FeatureNodeData}
            {...commonProps}
          />
        );
      case 'insight':
        return (
          <InsightNode
            key={node.id}
            node={node as InsightNodeData}
            {...commonProps}
            onDismiss={handleDismissInsight}
          />
        );
      case 'chart':
        return (
          <ChartNode
            key={node.id}
            node={node as ChartNodeData}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CanvasLayout
      title="Feature Explorer"
      hasUnsavedChanges={hasUnsavedChanges}
      onImportData={handleImportData}
      onGenerateInsights={handleGenerateInsights}
      onExport={handleExport}
      onSave={handleSave}
    >
      <WorkflowCanvas onViewportChange={handleViewportChange}>
        <div
          onClick={handleCanvasClick}
          onContextMenu={(e) => {
            e.preventDefault();
            if (!isEmpty) {
              setFloatingPanel({
                isOpen: true,
                position: { x: e.clientX, y: e.clientY },
              });
            }
          }}
          className="relative min-h-screen min-w-[1400px]"
        >
          {isEmpty ? (
            <EmptyCanvasState
              onImportData={handleImportData}
              onLoadSample={handleLoadSample}
            />
          ) : (
            <>
              <CanvasConnectionsLayer
                connections={connections}
                nodes={nodes}
                selectedConnectionId={selectedConnectionId}
                onConnectionClick={handleConnectionClick}
              />

              {nodes.map(renderNode)}
            </>
          )}
        </div>
      </WorkflowCanvas>

      {!isEmpty && (
        <CanvasMinimap
          nodes={nodes}
          viewport={viewport}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
        />
      )}

      <FloatingPanel
        items={floatingPanelItems}
        position={floatingPanel.position}
        isOpen={floatingPanel.isOpen}
        onClose={handleCloseFloatingPanel}
        onSelectItem={handleSelectPanelItem}
      />

      <DataUploadPanel
        isOpen={isDataUploadOpen}
        onClose={() => setIsDataUploadOpen(false)}
        onDataImport={handleDataImport}
      />
    </CanvasLayout>
  );
}
