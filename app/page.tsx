'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [uuid, setUuid] = useState<string>('');

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Random UUID v4:</h1>
      <p className="text-lg font-mono">{uuid}</p>
    </div>
  );
}
