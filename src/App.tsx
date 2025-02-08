import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Layout>
        <Routes />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
