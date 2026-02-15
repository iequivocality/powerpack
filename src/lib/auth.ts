import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies(), username()],
});
