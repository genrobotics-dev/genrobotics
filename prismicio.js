// prismicio.js
import * as prismic from '@prismicio/client'

export const repositoryName = 'genrobotics' // Replace with your Prismic repo name

export const client = prismic.createClient(repositoryName, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN, // optional if your repo is public
})
