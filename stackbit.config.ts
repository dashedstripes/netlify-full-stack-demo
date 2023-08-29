import { defineStackbitConfig } from '@stackbit/types';
import { NetlifyConnectSource } from './stackbit/NetlifyConnectSource';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '16',
  contentSources: [
    new NetlifyConnectSource({
      projectId: 'netlify_full_stack_demo_source',
      netlifyConnect: {
        prefix: 'contentful',
        apiKey: process.env.CONNECT_STAGING_API_KEY || '',
        endpointUrl: process.env.CONNECT_API_ENDPOINT || ''
      }
    })
  ],
  models: {
    page: { type: 'page', urlPath: '/{slug}' },
  },
})