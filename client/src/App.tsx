import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageTransition } from "./components/animations";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Team from "./pages/Team";
import News from "./pages/News";
import Contact from "./pages/Contact";
import LatestConcepts from "./pages/LatestConcepts";
import UnderConstruction from "./pages/UnderConstruction";
import Careers from "./pages/Careers";
import About from "./pages/About";
import ExteriorDesign from "./pages/ExteriorDesign";
import InteriorsPage from "./pages/InteriorsPage";
import ConceptsPage from "./pages/ConceptsPage";
import InBuildPage from "./pages/InBuildPage";
import BespokePage from "./pages/BespokePage";
import { useEffect } from "react";

/* Scroll to top on route change */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <PageTransition key={location}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/yachts/latest-concepts"} component={LatestConcepts} />
            <Route path={"/yachts/under-construction"} component={UnderConstruction} />
            <Route path={"/projects"} component={Projects} />
            <Route path={"/projects/category/exterior"} component={ExteriorDesign} />
            <Route path={"/projects/category/interiors"} component={InteriorsPage} />
            <Route path={"/projects/category/concepts"} component={ConceptsPage} />
            <Route path={"/projects/category/in-build"} component={InBuildPage} />
            <Route path={"/projects/category/bespoke"} component={BespokePage} />
            <Route path={"/projects/:slug"} component={ProjectDetail} />
            <Route path={"/contact/team"} component={Team} />
            <Route path={"/contact/careers"} component={Careers} />
            <Route path={"/team"} component={Team} />
            <Route path={"/news"} component={News} />
            <Route path={"/about"} component={About} />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/404"} component={NotFound} />
            {/* Final fallback route */}
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
