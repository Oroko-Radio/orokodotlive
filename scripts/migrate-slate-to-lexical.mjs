import { migrateSlateToLexical } from "@payloadcms/richtext-lexical/migrate";
import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config: config });

await migrateSlateToLexical({ payload });
