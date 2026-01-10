'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileSpreadsheet,
  X,
  Check,
  AlertCircle,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';

interface ParsedData {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
}

interface DataUploadPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImport: (data: ParsedData, name: string) => void;
}

export const DataUploadPanel = ({
  isOpen,
  onClose,
  onDataImport,
}: DataUploadPanelProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const parseCSV = useCallback((text: string): ParsedData => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

    const rows = lines.slice(1).map((line) => {
      const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
      const row: Record<string, unknown> = {};

      headers.forEach((header, index) => {
        const value = values[index];
        const numValue = Number(value);
        if (!isNaN(numValue) && value !== '') {
          row[header] = numValue;
        } else if (value.toLowerCase() === 'true') {
          row[header] = true;
        } else if (value.toLowerCase() === 'false') {
          row[header] = false;
        } else {
          row[header] = value;
        }
      });

      return row;
    });

    return {
      columns: headers,
      rows: rows.slice(0, 100),
      rowCount: rows.length,
    };
  }, []);

  const handleFile = useCallback(
    async (selectedFile: File) => {
      setError(null);
      setIsLoading(true);

      try {
        if (!selectedFile.name.endsWith('.csv')) {
          throw new Error('Please upload a CSV file');
        }

        const text = await selectedFile.text();
        const data = parseCSV(text);

        if (data.columns.length === 0) {
          throw new Error('No columns found in the CSV file');
        }

        setFile(selectedFile);
        setParsedData(data);
        setDatasetName(selectedFile.name.replace('.csv', ''));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse file');
      } finally {
        setIsLoading(false);
      }
    },
    [parseCSV]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const handleImport = useCallback(() => {
    if (parsedData && datasetName) {
      onDataImport(parsedData, datasetName);
      onClose();
      setFile(null);
      setParsedData(null);
      setDatasetName('');
    }
  }, [parsedData, datasetName, onDataImport, onClose]);

  const handleReset = useCallback(() => {
    setFile(null);
    setParsedData(null);
    setDatasetName('');
    setError(null);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
              'rounded-2xl border shadow-2xl',
            'bg-[#1E1E1E]',
            'border-white/10'
            )}
          >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <FileSpreadsheet className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                <h2 className="text-lg font-semibold text-white">
                    Import Dataset
                  </h2>
                <p className="text-sm text-white/50">
                    Upload a CSV file to get started
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
              className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {!parsedData ? (
                <div
                  className={cn(
                    'relative rounded-xl border-2 border-dashed p-8 text-center transition-colors',
                    dragActive
                      ? 'border-primary-500 bg-primary-500/5'
                      : 'border-white/10',
                    'hover:border-primary-400 hover:bg-white/5'
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-10 w-10 animate-spin text-primary-400" />
                      <p className="text-white/60">Processing file...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-10 w-10 text-white/30" />
                      <p className="mt-4 text-white/70">
                        Drag and drop your CSV file here, or{' '}
                        <button
                          onClick={() => inputRef.current?.click()}
                          className="font-medium text-primary-400 hover:text-primary-300"
                        >
                          browse
                        </button>
                      </p>
                      <p className="mt-2 text-sm text-white/50">
                        Supports CSV files up to 10MB
                      </p>
                    </>
                  )}

                  {error && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
                    <Check className="h-5 w-5 text-green-400" />
                    <div className="flex-1">
                      <p className="font-medium text-green-200">
                        File parsed successfully
                      </p>
                      <p className="text-sm text-green-300">
                        {parsedData.rowCount.toLocaleString()} rows, {parsedData.columns.length} columns
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-sm text-green-300 hover:text-green-200"
                    >
                      Change file
                    </button>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/80">
                      Dataset Name
                    </label>
                    <Input
                      value={datasetName}
                      onChange={(e) => setDatasetName(e.target.value)}
                      placeholder="Enter a name for your dataset"
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/80">
                      Columns Detected
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedData.columns.map((col) => (
                        <span
                          key={col}
                          className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/70"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/80">
                      Preview (first 5 rows)
                    </label>
                    <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5">
                      <table className="w-full text-xs">
                        <thead className="bg-white/5">
                          <tr>
                            {parsedData.columns.slice(0, 5).map((col) => (
                              <th
                                key={col}
                                className="px-3 py-2 text-left font-medium text-white/70"
                              >
                                {col}
                              </th>
                            ))}
                            {parsedData.columns.length > 5 && (
                              <th className="px-3 py-2 text-left font-medium text-white/40">
                                +{parsedData.columns.length - 5}
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {parsedData.rows.slice(0, 5).map((row, i) => (
                            <tr key={i}>
                              {parsedData.columns.slice(0, 5).map((col) => (
                                <td
                                  key={col}
                                  className="max-w-24 px-3 py-2 truncate text-white/80"
                                >
                                  {String(row[col])}
                                </td>
                              ))}
                              {parsedData.columns.length > 5 && (
                                <td className="px-3 py-2 text-white/40">...</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
              <Button variant="ghost" onClick={onClose} className="text-white/70 hover:text-white">
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={!parsedData || !datasetName}
                className="gap-2 bg-primary-500 text-white hover:bg-primary-400 disabled:bg-white/10 disabled:text-white/40"
              >
                Import Dataset
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
