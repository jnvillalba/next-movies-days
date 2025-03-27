import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NotFound = React.memo(() => {
  // Memoize navigation callback to prevent unnecessary recreations
  const navigate = useNavigate();
  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-4 p-4">
      <h1 className="text-3xl font-bold"> 404 - Page Not Found </h1>
      <Button
        variant="primary"
        onClick={goToHome}
        className="px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Return to Home
      </Button>
    </div>
  );
});

export default NotFound;
