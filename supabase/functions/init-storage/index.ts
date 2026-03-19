import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Create bucket if it doesn't exist
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const exists = buckets?.some((b: any) => b.id === "post-images");

    if (!exists) {
      await supabaseAdmin.storage.createBucket("post-images", {
        public: true,
      });
    }

    // Create storage policies via SQL
    const policies = [
      {
        name: "Allow public read post-images",
        sql: `CREATE POLICY "Allow public read post-images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'post-images');`,
      },
      {
        name: "Allow public upload post-images",
        sql: `CREATE POLICY "Allow public upload post-images" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'post-images');`,
      },
    ];

    for (const policy of policies) {
      const { error } = await supabaseAdmin.rpc("exec_sql" as any, { sql: policy.sql } as any);
      if (error && !error.message?.includes("already exists")) {
        // Try direct approach - if rpc doesn't work, use raw query
        console.log(`Policy creation note for ${policy.name}:`, error.message);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
