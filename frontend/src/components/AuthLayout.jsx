import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    const handleNavigation = () => {
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus === true) {
        navigate("/");
      }
    };

    handleNavigation();
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
