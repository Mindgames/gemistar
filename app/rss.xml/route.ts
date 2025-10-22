import { getURL } from '@/utils/helpers';

export async function GET() {
  const baseUrl = getURL();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Gamistar Updates</title>
      <link>${baseUrl}</link>
      <description>Stay up to date with announcements from the Gamistar team.</description>
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml'
    }
  });
}
