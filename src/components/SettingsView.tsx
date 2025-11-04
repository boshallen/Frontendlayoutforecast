import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Bell, 
  Mail,
  Save,
  Camera
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [newPredictions, setNewPredictions] = useState(true);
  const [priceChanges, setPriceChanges] = useState(true);

  const handleSaveSettings = () => {
    toast.success('设置已保存成功！');
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h2 className="text-xl mb-1 text-gray-900">系统设置</h2>
          <p className="text-gray-600">
            管理您的账户信息和通知偏好
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border-2 border-gray-300">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              个人资料
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              通知设置
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6 border-2 border-gray-300 bg-white">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-3xl text-white">演</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-gray-900">个人头像</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    更新您的个人头像，建议尺寸：400x400 像素
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-gray-300">上传照片</Button>
                    <Button variant="ghost" size="sm">删除</Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-900">姓氏</Label>
                    <Input id="firstName" defaultValue="演示" className="h-11 border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-900">名字</Label>
                    <Input id="lastName" defaultValue="用户" className="h-11 border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900">电子邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10 h-11 border-gray-300"
                      defaultValue="demo@example.com"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    我们将向您的新邮箱发送验证邮件
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900">手机号码</Label>
                  <Input id="phone" type="tel" defaultValue="138 0000 0000" className="h-11 border-gray-300" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-900">个人简介</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="介绍一下您自己..."
                    defaultValue="房地产投资爱好者，注重数据驱动的投资决策。"
                  />
                  <p className="text-xs text-gray-500">
                    简要描述您的个人信息，最多 200 个字符
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-gray-900">修改密码</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-gray-900">当前密码</Label>
                      <Input id="currentPassword" type="password" placeholder="请输入当前密码" className="h-11 border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-gray-900">新密码</Label>
                      <Input id="newPassword" type="password" placeholder="请输入新密码" className="h-11 border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-900">确认新密码</Label>
                      <Input id="confirmPassword" type="password" placeholder="请再次输入新密码" className="h-11 border-gray-300" />
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      更新密码
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t-2 border-gray-200">
                <Button variant="outline" className="border-gray-300">取消</Button>
                <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
                  <Save className="w-4 h-4 mr-2" />
                  保存更改
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 border-2 border-gray-300 bg-white">
              <div className="mb-6">
                <h3 className="mb-1 text-gray-900">邮件通知</h3>
                <p className="text-sm text-gray-600">
                  选择您希望通过邮件接收的更新类型
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-base text-gray-900">预测更新</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      当您的预测完成时接收通知
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-base text-gray-900">市场预警</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      接收您关注区域的重大市场变化提醒
                    </p>
                  </div>
                  <Switch
                    checked={marketAlerts}
                    onCheckedChange={setMarketAlerts}
                  />
                </div>

                <Separator />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-base text-gray-900">价格变动通知</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      当您保存的房产价格发生显著变化时通知您
                    </p>
                  </div>
                  <Switch
                    checked={priceChanges}
                    onCheckedChange={setPriceChanges}
                  />
                </div>

                <Separator />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-base text-gray-900">周报</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      接收市场趋势和活动的每周摘要
                    </p>
                  </div>
                  <Switch
                    checked={weeklyReports}
                    onCheckedChange={setWeeklyReports}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-300 bg-white">
              <div className="mb-6">
                <h3 className="mb-1 text-gray-900">推送通知</h3>
                <p className="text-sm text-gray-600">
                  在浏览器中接收即时通知
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-base text-gray-900">启用推送通知</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      接收重要事件的实时更新
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-base text-gray-900">新预测就绪</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      当 AI 完成分析您的预测时通知
                    </p>
                  </div>
                  <Switch
                    checked={newPredictions}
                    onCheckedChange={setNewPredictions}
                    disabled={!pushNotifications}
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" className="border-gray-300">恢复默认</Button>
              <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
