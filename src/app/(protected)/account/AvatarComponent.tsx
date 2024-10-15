'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getAvatars } from '@/modules/apiClient';
import { avatarUrl } from '@/modules/apiTypes';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function AvatarComponent({
  uid,
  url,
  size,
  onUpload,
  isEditing,
}: Readonly<{
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
  isEditing: boolean;
}>) {
  const supabase = createClient();
  const [avatar, setAvatar] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (url) {
        const avatar = (await getAvatars(url)) as avatarUrl;
        if (avatar) {
          setAvatar(avatar.signedUrl);
        }
      }
    };

    setFetching(true);
    if (url) {
      void fetchAvatarUrl();
    }
    setFetching(false);
  }, [url, supabase]);

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('You must select an image to upload.');
      }

      if (url && url !== 'nysystrarnakm.png') {
        const { error: removeError } = await supabase.storage
          .from('avatars')
          .remove([url]);

        if (removeError) {
          throw new Error(
            `Failed to remove existing avatar: ${removeError.message}`,
          );
        }
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Failed to upload avatar: ${uploadError.message}`);
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar: ' + (error as Error).message);
    } finally {
      setUploading(false);
      setDragging(false);
    }
  };

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      await uploadAvatar(file as File);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      await uploadAvatar(file as File);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        dragging ? 'border-dashed border-2 border-blue-500' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => void handleDrop(e)}>
      <Avatar style={{ height: size, width: size }}>
        {loading ||
          (fetching && <Skeleton className="rounded-full bg-white" />)}
        <AvatarImage
          // eslint-disable-next-line
          src={avatar ?? undefined}
          onLoad={() => setLoading(false)}
          className={`${!loading && !fetching ? 'block' : 'none'}`}
        />
      </Avatar>
      {isEditing && (
        <div className="pt-2">
          <label className="button primary block text-center" htmlFor="single">
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Dra eller klicka för att ladda upp bild'
            )}
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={(e) => void handleFileInput(e)}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
