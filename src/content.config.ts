import { defineCollection} from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    year: z.number(),
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    role: z.array(z.string()),
    tags: z.array(z.enum([
      'research', 'accessibility', 'physical-computing',
      'creative-coding', 'education', 'robotics',
    ])),
    cover: image(),
    coverAlt: z.string(),
    summary: z.string(),
    tools: z.array(z.string()).optional(),
    collaborators: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };