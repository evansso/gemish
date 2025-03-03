import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
		UPSTASH_VECTOR_REST_URL: z.string().url(),
		UPSTASH_VECTOR_REST_TOKEN: z.string(),
		GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
		BETTER_AUTH_GITHUB_CLIENT_ID: z.string().min(1),
		BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL,
		UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
		GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		BETTER_AUTH_GITHUB_CLIENT_ID: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
		BETTER_AUTH_GITHUB_CLIENT_SECRET:
			process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
	},
});
