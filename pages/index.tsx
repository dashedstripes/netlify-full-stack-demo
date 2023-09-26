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
              <div key={post.node.id} className="bg-white rounded-xl"  data-sb-object-id={`${post.node.contentful_id}`}>
                <img src={post.node.featuredImage?.url} alt={post.node.title} className="rounded-xl rounded-b-none w-full"/>
                <div className="p-8">
                  <h2 className="font-bold text-xl mb-8" data-sb-field-path="title">Somethign:{post.node.title}</h2>
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
      allContentfulPageBlogPost(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            id
            title
            contentful_id
            featuredImage {
              url
            }
            node_locale
            publishedDate
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
    console.log("API", json.data.allContentfulPageBlogPost.edges);

    return { props: { posts: json?.data?.allContentfulPageBlogPost?.edges || [] }}
  } catch(err) {
    console.error(err);
    return { props: { posts: [] }}
  }
}