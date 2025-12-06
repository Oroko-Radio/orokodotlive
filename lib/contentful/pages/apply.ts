import { graphql } from "@/lib/contentful";
import { SettingsInterface } from "@/types/shared";
import { extractPage } from "@/util";

export async function getApplyPage() {
  const SettingsQuery = /* GraphQL */ `
    query SettingsQuery {
      settings(id: "24RpL8uS7lPDmThpVwOnOf") {
        applicationsOpen
      }
    }
  `;

  const data = await graphql(SettingsQuery);

  return extractPage<SettingsInterface>(data, "settings");
}
