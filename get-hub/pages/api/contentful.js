import gql from "@apollo/client";
import apolloClient from "./apolloClient";

export async function getHomePageQuery() {
    const { data } = await apolloClient.query({
        query: gql`
            query GetHomePage{
                homePageCollection(limit: 1) {
                    items {
                        pageName
                        slug
                        seoMetadata {
                            ...SEOFragment
                        }
                    }
                }
            }
        `,
    });
    return data.homePageCollection.items;
}


