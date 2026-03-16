import { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useFirestoreCollection, useFirestoreAdd, useFirestoreUpdate, useFirestoreDelete } from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Trash2, Edit2, LogOut, AlertCircle } from 'lucide-react';

interface Item {
  id?: string;
  title: string;
  description: string;
  createdAt?: Date;
}

export default function Dashboard() {
  const { user, logout } = useFirebaseAuth();
  const { data: items, loading: itemsLoading, error: itemsError } = useFirestoreCollection<Item>('items');
  const { add, loading: addLoading } = useFirestoreAdd('items');
  const { update, loading: updateLoading } = useFirestoreUpdate('items');
  const { remove, loading: deleteLoading } = useFirestoreDelete('items');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('الرجاء إدخال العنوان');
      return;
    }

    try {
      if (editingId) {
        await update(editingId, { title, description });
        setEditingId(null);
      } else {
        await add({ title, description, createdAt: new Date() });
      }
      setTitle('');
      setDescription('');
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'حدث خطأ');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      try {
        await remove(id);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'فشل الحذف');
      }
    }
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id || null);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/auth';
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'فشل تسجيل الخروج');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Zopia Dashboard</h1>
            <p className="text-sm text-gray-600">مرحباً {user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Add/Edit Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'تعديل العنصر' : 'إضافة عنصر جديد'}</CardTitle>
            <CardDescription>
              {editingId ? 'عدّل بيانات العنصر' : 'أضف عنصر جديد إلى قائمتك'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  العنوان
                </label>
                <Input
                  id="title"
                  placeholder="أدخل عنوان العنصر"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={addLoading || updateLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  الوصف
                </label>
                <Input
                  id="description"
                  placeholder="أدخل وصف العنصر"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={addLoading || updateLoading}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={addLoading || updateLoading}>
                  {addLoading || updateLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      جاري...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      {editingId ? 'تحديث' : 'إضافة'}
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setTitle('');
                      setDescription('');
                    }}
                  >
                    إلغاء
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة العناصر</CardTitle>
            <CardDescription>جميع العناصر المحفوظة لديك</CardDescription>
          </CardHeader>
          <CardContent>
            {itemsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : itemsError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{itemsError.message}</AlertDescription>
              </Alert>
            ) : items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">لا توجد عناصر بعد</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                        disabled={updateLoading || deleteLoading}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id || '')}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
