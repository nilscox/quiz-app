import { createRoot } from 'react-dom/client';

import { App } from './infrastructure/App';

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
