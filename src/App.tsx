import { useState } from 'react';
import { LayoutOption2 } from './components/LayoutOption2';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <LayoutOption2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}
