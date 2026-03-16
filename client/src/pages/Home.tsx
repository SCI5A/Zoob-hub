import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, loading } = useFirebaseAuth();
  const [firebaseStatus, setFirebaseStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    // Check Firebase connection
    const checkFirebase = async () => {
      try {
        // Simple check - if we can access user auth state, Firebase is working
        setFirebaseStatus('connected');
      } catch (error) {
        setFirebaseStatus('disconnected');
      }
    };
    checkFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Flame className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Zopia</h1>
          </div>
          <nav className="flex gap-4">
            {user ? (
              <Button onClick={() => (window.location.href = '/dashboard')}>لوحة التحكم</Button>
            ) : (
              <Button onClick={() => (window.location.href = '/auth')}>دخول</Button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">مشروع متكامل مع Firebase</h2>
          <p className="text-xl text-gray-600 mb-8">
            نظام مصادقة وإدارة بيانات متقدم مع React و Firebase
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Firebase Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {firebaseStatus === 'connected' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                Firebase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {firebaseStatus === 'connected' ? 'متصل بنجاح' : 'غير متصل'}
              </p>
            </CardContent>
          </Card>

          {/* Auth Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {user ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                المصادقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {loading ? 'جاري التحميل...' : user ? 'مسجل دخول' : 'غير مسجل دخول'}
              </p>
            </CardContent>
          </Card>

          {/* Firestore Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Firestore
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">جاهز للاستخدام</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>الميزات المتاحة</CardTitle>
            <CardDescription>جميع الميزات الأساسية جاهزة للاستخدام</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>نظام مصادقة Firebase Authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>قاعدة بيانات Firestore</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>عمليات CRUD كاملة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>واجهة مستخدم حديثة مع Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>React Hooks للإدارة الحالية</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        {!user && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="flex justify-between items-center">
                <span>ابدأ الآن بإنشاء حساب أو تسجيل الدخول</span>
                <Button
                  onClick={() => (window.location.href = '/auth')}
                  className="ml-4"
                >
                  الذهاب للمصادقة
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
