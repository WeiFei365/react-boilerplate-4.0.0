import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, fallback) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
