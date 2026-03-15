import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, LogIn, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      // 简单模拟：设置token并跳转
      localStorage.setItem("token", "mock-token-12345");
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleRegister = navigate("/register");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-surface via-surface to-primary/5">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo 和标题 */}

        {/* 登录表单卡片 */}
        <div className="material-card-elevated p-8 space-y-6">
          <div className="text-center mb-5">
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
              用户登录
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 邮箱输入框 */}
            <div className="space-y-2">
              <label className="form-label">邮箱地址</label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-12"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* 密码输入框 */}
            <div className="space-y-2">
              <label className="form-label">密码</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-12 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* 记住我和忘记密码 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${rememberMe ? "bg-primary border-primary" : "border-on-surface-variant group-hover:border-primary"}`}
                  >
                    {rememberMe && (
                      <LogIn size={12} className="text-on-primary" />
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
                  记住我
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                忘记密码？
              </button>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 text-base justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  登录中...
                </span>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>登录</span>
                </>
              )}
            </button>
          </form>

          {/* 注册链接 */}
          <div className="text-center pt-4 border-t border-outline/10">
            <span className="text-on-surface-variant text-sm">
              还没有账户？
            </span>
            <button
              className="text-primary font-medium text-sm ml-1 hover:text-primary/80 transition-colors"
              onClick={handleRegister}
            >
              立即注册
            </button>
          </div>
        </div>

        {/* 底部信息 */}
        <p className="text-center text-xs text-on-surface-variant mt-8">
          © 2026 Chronos Manager. All rights reserved.
        </p>
      </div>
    </div>
  );
}
