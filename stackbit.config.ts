import { defineStackbitConfig } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '16',
  contentSources: [
    new ContentfulContentSource({
      spaceId: "m7021t7gk76q",
      environment: "master",
      previewToken: "2cCShdcXwdCuKk_ggzHjqdfjTxbgsQRaQcuMg0fjx2M",
      accessToken: "CFPAT-0cMwF6NXgFq_wnW4Yw2uHHmmfUeOgVu7541KXbmH1AU",
    }),
  ],
  models: {
    page: { type: 'page', urlPath: '/{slug}' },
  },
  modelExtensions: [
    { name: 'post', type: 'page', urlPath: '/posts/{slug}' },
  ],
})