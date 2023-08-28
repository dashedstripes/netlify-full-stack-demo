import { defineStackbitConfig } from '@stackbit/types';
import { NetlifyConnectSource } from './stackbit/NetlifyConnectSource';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '16',
  contentSources: [
    new NetlifyConnectSource({
      projectId: 'netlify_full_stack_demo_source',
      apiKey: 'test'
    })
  ],
  models: {
    page: { type: 'page', urlPath: '/{slug}' },
  },
})