import androidRuntime from "@/content/posts/android-runtime-analysis.md";
import brokenAuth from "@/content/posts/broken-auth-in-apis.md";
import fridaApis from "@/content/posts/frida-apis.md";
import networkTraffic from "@/content/posts/network-traffic-analysis.md";
import securityPipeline from "@/content/posts/security-in-pipelines.md";

export const rawWritingPosts = [
  { slug: "android-runtime-analysis", raw: androidRuntime },
  { slug: "broken-auth-in-apis", raw: brokenAuth },
  { slug: "frida-apis", raw: fridaApis },
  { slug: "network-traffic-analysis", raw: networkTraffic },
  { slug: "security-in-pipelines", raw: securityPipeline }
] as const;
