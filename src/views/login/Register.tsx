import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  Check,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "请输入用户名";
    } else if (formData.username.length < 2) {
      newErrors.username = "用户名至少需要2个字符";
    }

    if (!formData.email.trim()) {
      newErrors.email = "请输入邮箱地址";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    if (!formData.password) {
      newErrors.password = "请输入密码";
    } else if (formData.password.length < 6) {
      newErrors.password = "密码至少需要6个字符";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "请确认密码";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }

    if (!agreeTerms) {
      newErrors.terms = "请同意服务条款和隐私政策";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // 模拟注册请求
    setTimeout(() => {
      localStorage.setItem("token", "mock-token-12345");
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-surface via-surface to-secondary/5">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* 返回按钮 */}
        <button
          onClick={handleGoBack}
          className="absolute -top-12 left-0 flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">返回登录</span>
        </button>

        {/* Logo 和标题 */}

        {/* 注册表单卡片 */}
        <div className="material-card-elevated p-8 space-y-5">
          <div className="text-center mb-5">
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
              创建账户
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 用户名输入框 */}
            <div className="space-y-2">
              <label className="form-label">用户名</label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  size={20}
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input pl-12 ${errors.username ? "ring-2 ring-red-500/50" : ""}`}
                  placeholder="请输入用户名"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.username}
                </p>
              )}
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input pl-12 ${errors.email ? "ring-2 ring-red-500/50" : ""}`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.email}
                </p>
              )}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input pl-12 pr-12 ${errors.password ? "ring-2 ring-red-500/50" : ""}`}
                  placeholder="至少6位密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* 确认密码输入框 */}
            <div className="space-y-2">
              <label className="form-label">确认密码</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  size={20}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input pl-12 pr-12 ${errors.confirmPassword ? "ring-2 ring-red-500/50" : ""}`}
                  placeholder="再次输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* 条款同意 */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => {
                  setAgreeTerms(!agreeTerms);
                  if (!agreeTerms && errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }
                }}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${agreeTerms ? "bg-secondary border-secondary" : "border-on-surface-variant"}`}
              >
                {agreeTerms && (
                  <Check size={12} className="text-on-secondary" />
                )}
              </button>
              <span className="text-sm text-on-surface-variant">
                我同意
                <button
                  type="button"
                  className="text-secondary font-medium hover:underline mx-1"
                >
                  服务条款
                </button>
                和
                <button
                  type="button"
                  className="text-secondary font-medium hover:underline mx-1"
                >
                  隐私政策
                </button>
              </span>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs font-medium ml-1">
                {errors.terms}
              </p>
            )}

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-tonal w-full py-4 text-base justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                  注册中...
                </span>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>创建账户</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* 底部信息 */}
        <p className="text-center text-xs text-on-surface-variant mt-8">
          © 2026 Chronos Manager. All rights reserved.
        </p>
      </div>
    </div>
  );
}
