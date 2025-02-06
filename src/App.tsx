import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tim-horst-ui-theme">
      <Layout>
        <Routes />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
