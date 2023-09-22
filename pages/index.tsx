import Link from "next/link";

export default function Home({ posts }: { posts: any }) {
  return (
    <>
      <main className="container mx-auto px-8">
        <div className="py-20">
          <h1 className="font-bold text-3xl text-center">
            <img src="/logo.svg" alt="Netlify - Fullstack Demo" className="w-40 inline-block" />
          </h1>
        </div>

        <div className="pt-0 py-20 px-10 text-center">
          <p className="text-xl">All of the data on this page is from <a href="https://www.netlify.com/products/connect/" className="text-teal-500 underline">Netlify Connect</a></p>
        </div>

        <div className="bg-slate-100 p-12 rounded-xl">
          <h2 className="text-2xl mb-12">
            <img src="/contentful.png" alt="Contentful" className="w-36"/>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {posts?.map((post: any) => (
              <div key={post.id} className="bg-white rounded-xl"  data-sb-object-id={`${post.contentful_id}`}>
                <img src={post.image?.url} alt={post.title} className="rounded-xl rounded-b-none w-full"/>
                <div className="p-8">
                  <h2 className="font-bold text-xl mb-8" data-sb-field-path="title">{post.title}</h2>
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
    const QUERY = `
    query MyQuery {
      allContentfulPost {
        nodes {
          id
          title
          slug
          contentful_id
          description {
            raw
          }
          image {
            id
            url
          }
        }
      }
    }
    `;
  
    const results = await fetch(process.env.CONNECT_API_ENDPOINT || '', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CONNECT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: QUERY, variables: {} })
    })
  
    const json = await results.json();

    console.log(json?.data?.allContentfulPost)

    return { props: { posts: json?.data?.allContentfulPost?.nodes || [] }}
  } catch(err) {
    console.error(err);
    return { props: { posts: [] }}
  }
}