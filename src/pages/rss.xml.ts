import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/data/site';

export async function GET() {
  const essays = await getCollection('essays');

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.excerpt,
      pubDate: new Date(essay.data.date),
      link: `/writing/${essay.data.slug}/`,
    })),
  });
}
