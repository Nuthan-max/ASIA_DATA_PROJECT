import React, { useEffect, useRef, useState } from 'react';
import allNodes from '../AsiaData';
import { createTravelIterator } from '../travelIterator';

type Props = {
  nodeId?: string; // e.g. "VAULT-IND-002" or leave empty to use first node
  autoplayMs?: number; // milliseconds, 0 = disabled
};

export default function TravelStepper({ nodeId, autoplayMs = 0 }: Props) {
  const node = nodeId ? allNodes.find(n => n.id === nodeId) : allNodes[0];
  const raw = node?.travelType ?? [];
  const items = Array.isArray(raw) ? raw : [String(raw)];

  const iteratorRef = useRef(createTravelIterator(items));
  const [current, setCurrent] = useState<string | null>(items.length ? iteratorRef.current.next().value : null);

  function next() {
    const v = iteratorRef.current.next().value;
    setCurrent(v);
  }

  function prev() {
    // simple prev: rebuild iterator and step to previous index
    if (!items.length) return;
    iteratorRef.current.reset();
    // advance to last item
    for (let i = 0; i < items.length - 1; i++) iteratorRef.current.next();
    setCurrent(iteratorRef.current.next().value);
  }

  useEffect(() => {
    if (!autoplayMs) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs]);

  if (!node) return <div>No node found</div>;

  return (
    <div>
      <h3>{node.name} — Travel Type</h3>
      <div style={{ minHeight: 48 }}>{current}</div>
      <div>
        <button onClick={prev} aria-label="Previous">Prev</button>
        <button onClick={next} aria-label="Next">Next</button>
      </div>
    </div>
  );
}
