import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BoUser, Role } from '@org/types'

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const location = useLocation();
  const userString = localStorage.getItem('user');
  const user: BoUser = userString ? JSON.parse(userString) : null;
  
  if (!allowedRoles) allowedRoles = [Role.ADMIN] //! TODO

  console.log('PrivateRoute: User', user); // 添加這行來檢查用戶信息
  console.log('PrivateRoute: Allowed Roles', allowedRoles); // 添加這行來檢查允許的角色

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log('User role not allowed'); // 添加這行來檢查角色權限
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
