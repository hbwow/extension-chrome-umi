// src/app.tsx
import { StyleProvider } from '@ant-design/cssinjs';

export const rootContainer = (c) => {
  return <StyleProvider hashPriority="high">{c}</StyleProvider>;
};
