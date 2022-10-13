import { gql, DocumentNode } from '@apollo/client';
// import { SEO_FRAGMENT } from "./fragments";

export const getHomePageQuery = (): DocumentNode => {
  return gql`
    query ($locale: String!) {
      homePageCollection(limit: 1, locale: $locale) {
        items {
          header
          introText {
            json
          }
          image {
            url
          }
          seoMetadata {
            title
            description
            ogTitle
            ogDescription
            ogImage {
              url
            }
            hidePage
            excludeLinks
          }
          buttonText
          sectionsCollection {
            items {
              __typename
              sys {
                id
              }
            }
          }
        }
      }
    }
  `;
};

export const getGlobalQuery = (): DocumentNode => {
  return gql`
    query ($locale: String!) {
      globalsCollection(limit: 1, locale: $locale) {
        items {
          getHubLogoTopGreen {
            url
            size
            width
            height
            fileName
          }
          getHubLogo {
            url
            size
            width
            height
            fileName
          }
          getItLogo {
            url
            size
            width
            height
            fileName
          }
          footerText {
            json
          }
          footerContact {
            json
          }
        }
      }
    }
  `;
};

export const getLandingPageQuery = (slug: string): DocumentNode => {
  return gql`
    query ($locale: String!)  {
      landingPageCollection(limit:1,  locale: $locale, where: { slug: "${slug}" }){
        items{
          slug
          header
          introText
          heroImage {
            url
          }
          sectionsCollection{
            items{
              __typename
              sys {id}
            }
          }
        }
      }
    }
  `;
};
