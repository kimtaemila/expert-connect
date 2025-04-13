
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard after a brief delay
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-expertPurple to-expertBlue-dark">
      <div className="text-center animate-pulse">
        <div className="flex items-center justify-center mb-4">
          <Database className="h-12 w-12 text-white mr-2" />
          <h1 className="text-3xl font-bold text-white">Expert Connect</h1>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Loader2 className="h-6 w-6 text-white animate-spin mr-2" />
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

function Database(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}
