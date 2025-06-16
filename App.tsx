import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import UnifiedDashboard from "@/pages/unified-dashboard-new";
import NotFound from "@/pages/not-found";
import Debug from "@/pages/debug";
import WelcomeSplash from "@/pages/welcome-splash";
import OnboardingAssessment from "@/pages/onboarding-assessment";
import PhaseAssignment from "@/pages/phase-assignment";
import FirstSession from "@/pages/first-session";
import OnboardingComplete from "@/pages/onboarding-complete";
import AssessmentPage from "@/pages/assessment-page";
import WellnessInsightsPage from "@/pages/wellness-insights";
import VideoUploadPage from "@/pages/video-upload-page";
import AudioManager from "@/pages/audio-manager";
import Movement from "@/pages/movement";
import VideoLibrary from "@/pages/video-library";
import Programs from "@/pages/programs";
import QuickRelief from "@/pages/quick-relief";
import PersonalizationDemo from "@/pages/personalization-demo";
import Landing from "@/components/landing";
import AuthPage from "@/pages/auth-page";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route path="/onboarding" component={OnboardingAssessment} />
            <Route path="/splash" component={WelcomeSplash} />
            <Route path="/phase-assignment" component={PhaseAssignment} />
          </>
        ) : (
          <>
            <Route path="/" component={UnifiedDashboard} />
            <Route path="/welcome" component={WelcomeSplash} />
            <Route path="/assessment" component={AssessmentPage} />
            <Route path="/onboarding-assessment" component={OnboardingAssessment} />
            <Route path="/phase-assignment" component={PhaseAssignment} />
            <Route path="/first-session" component={FirstSession} />
            <Route path="/onboarding-complete" component={OnboardingComplete} />
            <Route path="/dashboard/:phase" component={UnifiedDashboard} />
            <Route path="/dashboard" component={UnifiedDashboard} />
            <Route path="/wellness-insights" component={WellnessInsightsPage} />
            <Route path="/video-upload" component={VideoUploadPage} />
            <Route path="/movement" component={Movement} />
            <Route path="/movement/videos" component={VideoLibrary} />
            <Route path="/movement/programs" component={Programs} />
            <Route path="/movement/quick-relief" component={QuickRelief} />
            <Route path="/movement/workplace">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Workplace Wellness</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/movement/guided">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Guided Sessions</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/movement/wellness">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Daily Wellness</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/movement/education">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Movement Education</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/movement/progress">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Progress Tracking</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/learning">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Learning Center</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/education">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Learning Center</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/workspace-health">
              {() => <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Workspace Health</h1><p className="text-slate-400">Coming Soon</p></div></div>}
            </Route>
            <Route path="/ai-coach">
              {() => <AudioManager onNavigate={(view) => window.location.href = `/${view}`} />}
            </Route>
            <Route path="/audio-manager">
              {() => <AudioManager onNavigate={(view) => window.location.href = `/${view}`} />}
            </Route>
            <Route path="/personalization-demo" component={PersonalizationDemo} />
            <Route path="/debug" component={Debug} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
