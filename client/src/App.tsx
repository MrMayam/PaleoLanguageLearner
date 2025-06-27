import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AlphabetLearning from "@/pages/alphabet-learning";
import SoundGames from "@/pages/sound-games";
import WordBuilding from "@/pages/word-building";
import TracingPractice from "@/pages/tracing-practice";
import Progress from "@/pages/progress";
import NotFound from "@/pages/not-found";
import { AudioProvider } from "@/lib/audio-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/alphabet" component={AlphabetLearning} />
      <Route path="/sounds" component={SoundGames} />
      <Route path="/words" component={WordBuilding} />
      <Route path="/tracing" component={TracingPractice} />
      <Route path="/progress" component={Progress} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
