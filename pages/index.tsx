import Link from "next/link";
import { getEntries } from '../utils/content.js';
import { createClient } from 'contentful';

const IS_DEV = process.env.NODE_ENV === 'development';

export default function Home({ posts }: { posts: any }) {
  return (
    <>
      <main className="container mx-auto px-8">
        <div className="py-20">
          <h1 className="font-bold text-3xl text-center">
            <img src="/logo.svg" alt="Netlify - Fullstack Demo" className="w-40 inline-block" />
          </h1>
        </div>

        <div className="bg-slate-100 p-12 rounded-xl">
          <h2 className="text-2xl mb-12">
            <img src="/contentful.png" alt="Contentful" className="w-36"/>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {posts?.map((post: any) => (
              <div key={post.sys.id} className="bg-white rounded-xl"  data-sb-object-id={`${post.sys.id}`}>
                <img className="rounded-xl rounded-b-none w-full"/>
                <div className="p-8">
                  <h2 className="font-bold text-xl mb-8" data-sb-field-path="label">Somethign: {`${post.fields.label}`}</h2>
                  <Link href="/" className="border border-slate-400 hover:bg-slate-200 transition-all rounded px-4 py-2">View Post</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}


export const getStaticProps = async () => {
  try {
    const client = createClient({
      accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
      space: process.env.CONTENTFUL_SPACE_ID,
      host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
    });
  
    const entries = await client.getEntries({
      content_type: 'statItem'
    });
    console.log("ENTRIES", entries.items);
    return { props: { posts: entries.items || [] }}
  } catch(err) {
    console.error(err);
    return { props: { posts: [] }}
  }
}