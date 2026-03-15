import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Home } from 'lucide-react';

export default function NoPermission() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[80vh] p-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 图标区域 */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-black text-secondary">403</span>
          </div>
        </div>

        {/* 标题和描述 */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            访问受限
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            抱歉，您没有权限访问此页面。
            <br />
            如需获得访问权限，请联系管理员。
          </p>
        </div>

        {/* 按钮区域 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={handleGoBack}
            className="btn-outline"
          >
            <ArrowLeft size={20} />
            <span>返回上一页</span>
          </button>
          <button
            onClick={handleGoHome}
            className="btn-primary"
          >
            <Home size={20} />
            <span>返回首页</span>
          </button>
        </div>
      </div>
    </div>
  );
}
