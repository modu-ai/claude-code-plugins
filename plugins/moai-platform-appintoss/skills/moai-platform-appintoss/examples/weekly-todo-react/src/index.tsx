import ReactDOM from 'react-dom/client';
import './index.css';
import 'remixicon/fonts/remixicon.css';
import App from './App.tsx';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
