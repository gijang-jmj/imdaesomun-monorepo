'use client';

import { useSavedFilterStore } from '@/stores/filter.store';
import { useEffect, useRef, useState } from 'react';
import { AppRadioButton } from '../ui/AppRadioButton';

interface SavedFilterProps {
  totalCount: number;
  shCount: number;
  ghCount: number;
  ihCount: number;
  bmcCount: number;
}

export const SavedFilter = ({
  totalCount,
  shCount,
  ghCount,
  ihCount,
  bmcCount,
}: SavedFilterProps) => {
  const savedFilter = useSavedFilterStore((state) => state.savedFilter);
  const setSavedFilter = useSavedFilterStore((state) => state.setSavedFilter);

  const [isStuck, setIsStuck] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStuck(false);
        } else {
          setIsStuck(true);
        }
      },
      {
        rootMargin: '-1px 0px 0px 0px',
        threshold: 1,
      }
    );

    const currentRef = filterContainerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const corporationFilterList = [
    { label: '전체', value: null, count: totalCount },
    { label: 'SH', value: 'sh', count: shCount },
    { label: 'GH', value: 'gh', count: ghCount },
    { label: 'IH', value: 'ih', count: ihCount },
    { label: 'BMC', value: 'bmc', count: bmcCount },
  ];

  const handleFilterChange = (value: string | null) => {
    setSavedFilter(value);
  };

  const stickyClass = isStuck
    ? 'bg-white shadow-sm md:shadow-none md:bg-transparent'
    : 'bg-transparent';

  return (
    <div
      ref={filterContainerRef}
      className={`sticky top-0 z-10 flex gap-2 overflow-x-auto px-4 py-2 transition-all md:relative ${stickyClass}`}
    >
      {corporationFilterList.map((filter) => (
        <AppRadioButton
          key={filter.label}
          label={filter.label}
          count={filter.count}
          value={filter.value}
          groupValue={savedFilter}
          onChangeAction={handleFilterChange}
        />
      ))}
    </div>
  );
};
