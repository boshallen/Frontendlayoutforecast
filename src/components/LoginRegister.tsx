import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Building2,
  Mail,
  Lock,
  User,
  Shield,
  CheckCircle2,
} from "lucide-react";

interface LoginRegisterProps {
  onLogin: () => void;
}

export function LoginRegister({ onLogin }: LoginRegisterProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      onLogin();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerPassword) {
      onLogin();
    }
  };

  const features = [
    {
      icon: CheckCircle2,
      title: "智能预测",
      desc: "机器学习算法精准评估",
    },
    {
      icon: CheckCircle2,
      title: "AI分析",
      desc: "专业市场趋势解读",
    },
    {
      icon: CheckCircle2,
      title: "实时数据",
      desc: "确保预测准确时效",
    },
    {
      icon: CheckCircle2,
      title: "安全可靠",
      desc: "企业级加密保护",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white flex flex-col">
      {/* Compact Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base text-gray-900">
                房地产价格预测系统
              </h1>
              <p className="text-xs text-gray-500">
                Real Estate Price Prediction
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            服务热线：400-XXX-XXXX
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Left Side - Features (2/5) */}
            <div className="lg:col-span-2">
              <div className="sticky top-6">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs mb-4">
                    <Shield className="w-3 h-3" />
                    <span>认证系统</span>
                  </div>
                  <h2 className="text-2xl text-gray-900 mb-2">
                    欢迎使用
                  </h2>
                  <p className="text-sm text-gray-600">
                    基于人工智能的房地产价格预测与分析平台
                  </p>
                </div>

                <div className="space-y-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-900 mb-0.5">
                            {feature.title}
                          </div>
                          <div className="text-xs text-gray-600">
                            {feature.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-900 mb-1">
                    💡 温馨提示
                  </div>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    本系统仅供参考，实际价格以市场成交为准
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form (3/5) */}
            <div className="lg:col-span-3">
              <Card className="p-6 shadow-lg border border-gray-200">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 h-10">
                    <TabsTrigger
                      value="login"
                      className="text-sm"
                    >
                      登录
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="text-sm"
                    >
                      注册
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form
                      onSubmit={handleLogin}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="login-email"
                          className="text-sm text-gray-700"
                        >
                          邮箱地址
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="请输入邮箱"
                            className="pl-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            value={loginEmail}
                            onChange={(e) =>
                              setLoginEmail(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="login-password"
                            className="text-sm text-gray-700"
                          >
                            登录密码
                          </Label>
                          <button
                            type="button"
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            忘记密码？
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="请输入密码"
                            className="pl-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            value={loginPassword}
                            onChange={(e) =>
                              setLoginPassword(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-10 mt-6 bg-red-600 hover:bg-red-700 text-sm shadow-sm"
                      >
                        立即登录
                      </Button>

                      <div className="text-center pt-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs">
                          演示：输入任意邮箱密码即可登录
                        </div>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form
                      onSubmit={handleRegister}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-name"
                          className="text-sm text-gray-700"
                        >
                          真实姓名
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="请输入真实姓名"
                            className="pl-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            value={registerName}
                            onChange={(e) =>
                              setRegisterName(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="register-email"
                          className="text-sm text-gray-700"
                        >
                          邮箱地址
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="请输入邮箱"
                            className="pl-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            value={registerEmail}
                            onChange={(e) =>
                              setRegisterEmail(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="register-password"
                          className="text-sm text-gray-700"
                        >
                          设置密码
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="至少8位字符"
                            className="pl-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            value={registerPassword}
                            onChange={(e) =>
                              setRegisterPassword(
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 pl-1">
                          密码需包含字母和数字，长度不少于8位
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-10 mt-6 bg-red-600 hover:bg-red-700 text-sm shadow-sm"
                      >
                        立即注册
                      </Button>

                      <div className="text-center pt-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs">
                          演示：填写信息即可完成注册
                        </div>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    继续使用即表示同意
                    <button className="text-red-600 hover:text-red-700 mx-1">
                      《服务条款》
                    </button>
                    和
                    <button className="text-red-600 hover:text-red-700 mx-1">
                      《隐私政策》
                    </button>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="bg-white border-t py-4 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs text-gray-500">
            © 2025 房地产价格预测系统 |
            技术支持：人工智能研究中心 |
            <span className="mx-2">|</span>
            备案号：京ICP备XXXXXXXX号
          </p>
        </div>
      </footer>
    </div>
  );
}