'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import AvatarComponent from './AvatarComponent';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUser } from '@/context/UserContext';
import { Loader2 } from 'lucide-react';

export default function AccountForm() {
  const supabase = createClient();
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatar_url] = useState<string | null>(null);
  const [motto, setMotto] = useState<string | null>(null);
  const [phone_number, setPhone_number] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const { user, isLoading, signOut } = useUser();

  useEffect(() => {
    if (user) {
      const fullName =
        `${user.profile?.first_name} ${user.profile?.last_name}`.trim();
      setFullname(fullName);
      setUsername(user.profile?.nickname ?? '');
      setAvatar_url(user.profile?.avatar_url ?? null);
      setMotto(user.profile?.motto ?? '');
      setPhone_number(user.profile?.phone_number ?? '');
      setEmail(user.profile?.email ?? '');
      setAllergies(user.profile?.allergies ?? '');
      setBirthday(user.profile?.birthday ?? null);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'motto':
        setMotto(value);
        break;
      case 'phone_number':
        setPhone_number(value);
        break;
      case 'allergies':
        setAllergies(value);
        break;
      case 'birthday':
        setBirthday(value === '' ? null : value);
        break;
      default:
        break;
    }
  };

  const handleSaveProfile = async () => {
    await saveProfile();
    setShowDialog(true);
    setIsEditing(false);
  };

  const saveProfile = async () => {
    try {
      const updateData = {
        id: user?.id as string,
        nickname: username,
        email,
        avatar_url,
        motto,
        phone_number,
        allergies,
        birthday,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('users').upsert(updateData);

      if (error) {
        console.error('Error saving profile:', error);
        setDialogMessage(`Error: ${error.message}`);
      } else {
        setDialogMessage('Din profil har uppdaterats.');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setDialogMessage('Något gick fel när profilen skulle uppdateras.');
    } finally {
      setShowDialog(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto mt-6 shadow-lg">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold mb-4"> {fullname} </h2>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <AvatarComponent
              uid={user?.id ?? null}
              url={avatar_url}
              size={80}
              onUpload={setAvatar_url}
              isEditing={isEditing}
            />
          </div>
          <form className="space-y-4">
            <div>
              <Label className="text-lg font-medium">Kallas för</Label>
              <Input
                id="username"
                type="text"
                value={username || ''}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-lg font-medium">Motto</Label>
              <Input
                id="motto"
                type="text"
                value={motto || ''}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-lg font-medium">Telefonnummer</Label>
              <Input
                id="phone_number"
                type="text"
                value={phone_number || ''}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-lg font-medium">Email</Label>
              <Input
                id="email"
                type="text"
                value={email || ''}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-lg font-medium">Allergier</Label>
              <Input
                id="allergies"
                type="text"
                value={allergies || ''}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-lg font-medium">Födelsedatum</Label>
              <Input
                id="birthday"
                type="date"
                value={birthday || ''}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="mt-1"
              />
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="mr-auto">
                {isEditing ? 'Avbryt' : 'Ändra'}
              </Button>

              {isEditing && (
                <Button
                  type="button"
                  className="ml-auto"
                  onClick={() => {
                    void handleSaveProfile();
                  }}>
                  Spara ändringar
                </Button>
              )}
              <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {dialogMessage.startsWith('Error')
                        ? 'Fel'
                        : 'Profil uppdaterad'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {dialogMessage}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setShowDialog(false)}>
                      OK
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Button
              type="button"
              className="w-full mt-4"
              onClick={() => void signOut()}>
              Logga ut
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
