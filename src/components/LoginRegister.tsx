import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Mail, Lock, User, Shield, Award, TrendingUp, Database } from 'lucide-react';

interface LoginRegisterProps {
  onLogin: () => void;
}

export function LoginRegister({ onLogin }: LoginRegisterProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      {/* Official Header */}
      <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-2xl">
        <div className="px-10 py-7">
          <div className="flex items-center gap-5 max-w-7xl mx-auto">
            <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center shadow-2xl">
              <Building2 className="w-12 h-12 text-red-700" />
            </div>
            <div>
              <h1 className="text-3xl text-white mb-1.5 tracking-wide">房地产价格预测系统</h1>
              <p className="text-sm text-red-100">Real Estate Price Prediction System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left Side - Information */}
            <div className="lg:col-span-2 bg-white border-4 border-red-600 p-8 shadow-2xl rounded-sm">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-red-600 rounded flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-gray-900">系统简介</h2>
                    <p className="text-sm text-gray-600 mt-1">System Introduction</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border-l-4 border-red-600 pl-5 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg text-gray-900">智能预测技术</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    采用先进的机器学习算法，结合海量房地产市场数据，为您提供精准的价格预测服务
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-5 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg text-gray-900">专业分析建议</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    AI智能助手深度分析市场趋势，提供专业的投资建议和风险评估
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-5 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-lg text-gray-900">实时数据更新</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    系统实时更新市场数据，确保预测结果的准确性和时效性
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-5 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg text-gray-900">安全可靠</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    采用银行级数据加密技术，确保您的信息安全和隐私保护
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-gray-200">
                <div className="text-sm text-gray-700 space-y-2 bg-gray-50 p-5 rounded">
                  <p className="flex items-center gap-2">
                    <span className="text-red-600">●</span>
                    <strong>服务热线：</strong>400-XXX-XXXX
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">●</span>
                    <strong>工作时间：</strong>周一至周五 9:00-18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:col-span-3">
              <Card className="p-10 shadow-2xl border-4 border-gray-300 rounded-sm">
                <div className="mb-8">
                  <h2 className="text-3xl mb-3 text-gray-900">用户登录</h2>
                  <p className="text-sm text-gray-600">请登录您的账户或注册新账户</p>
                </div>

                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 h-auto">
                    <TabsTrigger value="login" className="text-base py-3">登录</TabsTrigger>
                    <TabsTrigger value="register" className="text-base py-3">注册</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="login-email" className="text-base text-gray-900">邮箱地址</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="请输入您的邮箱"
                            className="pl-12 h-14 border-2 border-gray-300 text-base"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-base text-gray-900">登录密码</Label>
                          <button type="button" className="text-sm text-red-600 hover:text-red-700 hover:underline">
                            忘记密码？
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="请输入您的密码"
                            className="pl-12 h-14 border-2 border-gray-300 text-base"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-14 mt-8 bg-red-600 hover:bg-red-700 text-lg shadow-lg">
                        立即登录
                      </Button>
                      
                      <div className="text-center text-sm text-gray-500 pt-6 border-t-2 border-gray-200">
                        <span className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-2 rounded inline-block">
                          演示模式：输入任意邮箱和密码即可登录
                        </span>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="register-name" className="text-base text-gray-900">真实姓名</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="请输入您的真实姓名"
                            className="pl-12 h-14 border-2 border-gray-300 text-base"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="register-email" className="text-base text-gray-900">邮箱地址</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="请输入您的邮箱"
                            className="pl-12 h-14 border-2 border-gray-300 text-base"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="register-password" className="text-base text-gray-900">设置密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="请设置登录密码"
                            className="pl-12 h-14 border-2 border-gray-300 text-base"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 pl-1">
                          密码长度不少于8位，建议包含字母和数字
                        </p>
                      </div>

                      <Button type="submit" className="w-full h-14 mt-8 bg-red-600 hover:bg-red-700 text-lg shadow-lg">
                        立即注册
                      </Button>
                      
                      <div className="text-center text-sm text-gray-500 pt-6 border-t-2 border-gray-200">
                        <span className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-2 rounded inline-block">
                          演示模式：填写信息即可完成注册
                        </span>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </Card>

              <p className="text-center text-sm text-gray-600 mt-8">
                继续使用即表示您同意我们的{' '}
                <button className="text-red-600 hover:text-red-700 hover:underline font-medium">《服务条款》</button>
                {' '}和{' '}
                <button className="text-red-600 hover:text-red-700 hover:underline font-medium">《隐私政策》</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-gray-300 shadow-inner py-6 text-center text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-10">
          <p className="mb-2">© 2025 房地产价格预测系统 版权所有 | 技术支持：人工智能研究中心</p>
          <p className="text-xs text-gray-500">备案号：京ICP备XXXXXXXX号 | 京公网安备XXXXXXXXXXX号</p>
        </div>
      </footer>
    </div>
  );
}
