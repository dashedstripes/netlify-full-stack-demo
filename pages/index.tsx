export default function Home({ posts }: { posts: any }) {
  console.log(posts);
  return (
    <>
      <main className="container mx-auto px-8">
        <div className="py-20">
          <h1 className="font-bold text-3xl">Netlify Full Stack Demo</h1>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {posts?.map((post: any) => (
            <div key={post.id}>
              <img src={post.image?.url} alt={post.title} className="rounded-xl"/>
              <div className="py-4">
                <h2 className="font-bold text-xl">{post.title}</h2>
              </div>
            </div>
          ))}
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
  
    const results = await fetch('https://adam-demo-lay-i7y9od-prod.api.netlify-connect.com/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CONNECT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: QUERY, variables: {} })
    })
  
    const json = await results.json();
  
    return { props: { posts: json?.data?.allContentfulPost?.nodes || [] }}
  } catch(err) {
    console.error(err);
    return { props: { posts: [] }}
  }
}