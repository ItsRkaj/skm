'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function Avatar({
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        setUploading(true);
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      } finally {
        setUploading(false);
      }
    }

    if (url) {
      void downloadImage(url);
    }
  }, [url, supabase]);

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('You must select an image to upload.');
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar! ' + (error as Error).message);
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
      await uploadAvatar(file!);
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
      await uploadAvatar(file!);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${dragging ? 'border-dashed border-2 border-blue-500' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
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
            onChange={handleFileInput}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
