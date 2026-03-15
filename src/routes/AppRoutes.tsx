import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import SandBox from '../views/sandbox/SandBox';
import Login from '../views/login/Login';
import Register from '../views/login/Register';



const token = localStorage.getItem('token');
/**
 * 应用路由组件 - 包含HashRouter、Sidebar和MainContent
 * 使用哈希路由(#/path)，无需服务器配置，浏览器自动处理
 */
export function AppRoutes(){
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 如果未授权就去登录 */}
        <Route path="/*" element={token ? <SandBox /> : <Login />} />
      </Routes>
    </HashRouter>
  );
};
