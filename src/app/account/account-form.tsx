'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';
import { signOutUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';
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

export default function AccountForm({ user }: Readonly<{ user: User | null }>) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  //const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatar_url] = useState<string | null>(null);
  const [motto, setMotto] = useState<string | null>(null);
  const [phone_number, setPhone_number] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { signOut } = useUser();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select(
            `first_name, last_name, nickname, avatar_url, motto, phone_number, email, allergies, birthday`,
          )
          .eq('id', user?.id)
          .single();

        if (error) {
          console.log(error);
        }

        if (data) {
          const fullName = `${data.first_name} ${data.last_name}`.trim();
          setFullname(fullName);
          setUsername(data.nickname);
          setAvatar_url(data.avatar_url);
          setMotto(data.motto);
          setPhone_number(data.phone_number);
          setEmail(data.email);
          setAllergies(data.allergies);
          setBirthday(data.birthday);
        }
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile();
    };

    void fetchProfile();
  }, [getProfile]);

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
        setBirthday(value);
        break;
      default:
        break;
    }
  };

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const handleSaveProfile = async () => {
    await saveProfile();
    setShowDialog(true);
    setIsEditing(false);
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      // Data to be sent to the database
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
        setDialogMessage('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setDialogMessage(
        'An unexpected error occurred while updating the profile.',
      );
    } finally {
      setLoading(false);
      setShowDialog(true); // Show the dialog after the try-catch block completes
    }
  };

  async function handleSignOut() {
    try {
      const result = await signOutUser();

      if (result && result.message === 'Sign out successful') {
        await signOut();
        void router.push('/');
      } else {
        console.log('Sign out failed');
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto mt-6 shadow-lg">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold mb-4"> {fullname} </h2>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Avatar
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
                disabled={!isEditing || loading}
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
                disabled={!isEditing || loading}
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
                disabled={!isEditing || loading}
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
                disabled={!isEditing || loading}
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
                disabled={!isEditing || loading}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-lg font-medium">Födelsedatum</Label>
              <Input
                id="birthday"
                type="text"
                value={birthday || ''}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
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
                        ? 'Error'
                        : 'Profile Updated'}
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
              onClick={() => void handleSignOut()}>
              Logga ut
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
