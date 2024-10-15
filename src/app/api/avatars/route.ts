import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    if (typeof path === 'string') {
      const { data, error } = await supabase.storage
        .from('avatars')
        .createSignedUrl(path, 60 * 60);

      if (error) {
        return NextResponse.json(
          { message: `Error retrieving image: ${error.message}` },
          { status: 400 },
        );
      }

      return NextResponse.json({ signedUrl: data.signedUrl }, { status: 200 });
    }

    const { data: files, error: listError } = await supabase.storage
      .from('avatars')
      .list();

    if (listError) {
      return NextResponse.json(
        { message: `Error listing images: ${listError.message}` },
        { status: 400 },
      );
    }

    const signedUrls = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await supabase.storage
          .from('avatars')
          .createSignedUrl(file.name, 60 * 60);

        if (error) {
          console.error(
            `Error creating signed URL for ${file.name}: ${error.message}`,
          );
          return null;
        }

        return { path: file.name, signedUrl: data.signedUrl };
      }),
    );

    const filteredSignedUrls = signedUrls.filter((url) => url !== null);

    return NextResponse.json(filteredSignedUrls, { status: 200 });
    // eslint-disable-next-line
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
