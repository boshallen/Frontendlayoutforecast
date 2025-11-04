import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Mail, Lock, User, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Official Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 max-w-6xl mx-auto">
            <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
              <Building2 className="w-10 h-10 text-red-700" />
            </div>
            <div>
              <h1 className="text-2xl text-white mb-1">房地产价格预测系统</h1>
              <p className="text-sm text-red-100">Real Estate Price Prediction System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Information */}
            <div className="bg-white border-2 border-red-600 p-8 shadow-lg">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl text-gray-900">系统简介</h2>
                    <p className="text-sm text-gray-600">System Introduction</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="mb-2 text-gray-900">智能预测技术</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    采用先进的机器学习算法，结合海量房地产市场数据，为您提供精准的价格预测服务
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="mb-2 text-gray-900">专业分析建议</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    AI智能助手深度分析市场趋势，提供专业的投资建议和风险评估
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="mb-2 text-gray-900">实时数据更新</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    系统实时更新市场数据，确保预测结果的准确性和时效性
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="mb-2 text-gray-900">安全可靠</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    采用银行级数据加密技术，确保您的信息安全和隐私保护
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">服务热线：400-XXX-XXXX</p>
                  <p>工作时间：周一至周五 9:00-18:00</p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div>
              <Card className="p-8 shadow-xl border-2 border-gray-300">
                <div className="mb-6">
                  <h2 className="text-2xl mb-2 text-gray-900">用户登录</h2>
                  <p className="text-sm text-gray-600">请登录您的账户或注册新账户</p>
                </div>

                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                    <TabsTrigger value="login">登录</TabsTrigger>
                    <TabsTrigger value="register">注册</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-gray-900">邮箱地址</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="请输入您的邮箱"
                            className="pl-10 h-12 border-gray-300"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-gray-900">登录密码</Label>
                          <button type="button" className="text-xs text-red-600 hover:text-red-700">
                            忘记密码？
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="请输入您的密码"
                            className="pl-10 h-12 border-gray-300"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-12 mt-6 bg-red-600 hover:bg-red-700 text-base">
                        立即登录
                      </Button>
                      
                      <div className="text-center text-sm text-gray-500 pt-4 border-t">
                        演示模式：输入任意邮箱和密码即可登录
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="register-name" className="text-gray-900">真实姓名</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="请输入您的真实姓名"
                            className="pl-10 h-12 border-gray-300"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-gray-900">邮箱地址</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="请输入您的邮箱"
                            className="pl-10 h-12 border-gray-300"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-gray-900">设置密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="请设置登录密码"
                            className="pl-10 h-12 border-gray-300"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          密码长度不少于8位，建议包含字母和数字
                        </p>
                      </div>

                      <Button type="submit" className="w-full h-12 mt-6 bg-red-600 hover:bg-red-700 text-base">
                        立即注册
                      </Button>
                      
                      <div className="text-center text-sm text-gray-500 pt-4 border-t">
                        演示模式：填写信息即可完成注册
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </Card>

              <p className="text-center text-sm text-gray-600 mt-6">
                继续使用即表示您同意我们的{' '}
                <button className="text-red-600 hover:text-red-700">《服务条款》</button>
                {' '}和{' '}
                <button className="text-red-600 hover:text-red-700">《隐私政策》</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-8">
          <p>© 2025 房地产价格预测系统 版权所有 | 技术支持：人工智能研究中心</p>
          <p className="mt-2 text-xs">备案号：京ICP备XXXXXXXX号</p>
        </div>
      </footer>
    </div>
  );
}
