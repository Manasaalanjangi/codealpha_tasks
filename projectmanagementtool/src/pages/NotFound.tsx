
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-4 max-w-md px-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl mb-6">Oops! We couldn't find the page you're looking for.</p>
        <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
    </div>
  );
};

import { useLocation } from "react-router-dom";

export default NotFound;
