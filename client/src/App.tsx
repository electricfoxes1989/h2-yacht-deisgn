import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
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

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
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
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
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
