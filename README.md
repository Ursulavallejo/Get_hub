##Praktik på Getit Nordic
##Projekt https://gethub.se/

##Carin Wood & Ursula Vallejo

# Introduktion:

I utvecklingen av projektet har vi använt nya verktyg som vi var tvungna att lära oss och implementera. Vi kommer att utforska lite nedan.

- [WireFrames](https://xd.adobe.com/view/48935ae1-817e-41da-98ee-fc309c57a868-1dc0/screen/b2dc6744-2297-4621-bedf-50e433995c55/specs/)


# Next.Js

* SEO :
Det ger oss möjlighet att tillhandahålla SEO-datainformation för att bättre positionera vår sida i sökningar.

```javascript
<index.js>
    import Head from "next/head";

    <MyHead
        title={seoMetadata.title}
        description={seoMetadata.description}
        ogTitle={seoMetadata.ogTitle ?? seoMetadata.title}
        ogDescription={seoMetadata.ogDescription ?? seoMetadata.description}
        ogImage={seoMetadata.ogImage}
        hidePage={seoMetadata.hidePage}
        excludeLinks={seoMetadata.excludeLinks}
    />

    <myHead.tsx>
    import Head from "next/head";

    type Props = {
    title: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: any;
    hidePage?: boolean;
    excludeLinks?: boolean;
};

    export const MyHead = ({
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    hidePage,
    excludeLinks,
}: Props) => {
    return (
    <>
    <Head>
    <title>{`${
    process.env.NEXT_PUBLIC_ENVIRONMENT != "master"
    ? `${process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase()} - `
    : ""
}${title}`}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:title" content={ogTitle ?? title} />
    <meta
    property="og:description"
    content={ogDescription ?? description}
    />
{ogImage?.url && <meta property="og:image" content={ogImage.url} />}
    <meta
    name="robots"
    content={`${hidePage ? "noindex" : "index"}, ${
    excludeLinks ? "nofollow" : "follow"
}`}
    />
    </Head>
    </>
    );
};

```

* API: 

API hanteras i samma mapp i projektet. Backend hanteras inom samma project, det finns inget behov av att generera en klient och en server.

```javascript
import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_ENVIRONMENT}`,
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions,
  link: authLink.concat(httpLink),
});

export { client };

```

* Router:  
Sidorna som genereras i pages-mappen genererar sin rutt utan att behöva konfigurera dem.

Det finns olika typer av sätt att använda routern:

- Routing med Pages
- Nested Routes
- Dynamic Rotes [slug]

I vårt projekt implementerar vi den dynamiska router för landningssidan. Ruttens namn är hämtat från [slug] som tilldelats den i contentful. 
Därför kan det variera utan att behöva gå in i programmering.

[<img src="./styles/assets/images/next.png" width="300"/>](./styles/assets/images/next.png)

- [Next Tutorial](https://www.youtube.com/watch?v=9P8mASSREYM&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH&index=2)


* Data Fetching från Contentful med GetServerSideProps:
* Render Sections 
```javascript
 <index.tsx>
import type { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import { client } from "../lib/api/apolloClient";
import { getHomePageQuery } from "../lib/api/pages";
import { HomePageModel } from "../lib/models/homePageModel";
import { getSection } from "../lib/utils/sectionPicker";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MyHead } from "../lib/components/myHead";

type Props = {
  data: HomePageModel;
};

const Home = ({ data }: Props) => {
  const { header, image, introText, buttonText, seoMetadata } = data;

  return (
    <>
   
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <div className={styles.textDiv}>
              <h1 className={styles.header}>{header}</h1>
              <div className={styles.introText}>
                {introText?.json && documentToReactComponents(introText.json)}
              </div>
              <div className={styles.buttonText}>{buttonText}</div>
            </div>
            <div className={styles.imgContainer}>
              <Image
                src={image.url}
                alt="HeroPhoto"
                width="1181"
                height="1181"
                objectFit="contain"
                loading="eager"
                quality={70}
              />
            </div>
            {/* <div className={styles.button}>{buttonText}</div> */}
          </div>
        </div>
        {/* RENDER SECTIONS */}
        {data.sectionsCollection.items.map((section: any) =>
          getSection(section.__typename, section.sys?.id)
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data, error } = await client.query({
    query: getHomePageQuery(),
    variables: {
      locale: locale,
    },
  });

  let home = data.homePageCollection.items[0] ?? {};

  return {
    props: {
      data: home as HomePageModel,
    },
  };
};

export default Home;
```

```javascript
<sectionPicker.tsx>
const sectionsMap = new Map<string, Function>([
["GridSection", (id: string) => <GridSection key={id} id={id} />],
["PricingSection", (id: string) => <PricingSection key={id} id={id} />],
]);

export const getSection = (typename: string, id: string): JSX.Element => {
return sectionsMap.has(typename) ? sectionsMap.get(typename)(id) : null;
};
```
* Locale:  i18next-implementering för att hantera locale kopplad till contentful.

- [i18next](https://next.i18next.com/)

- [Next.Js](https://nextjs.org/)


# GraphQL

GraphQL är ett frågespråk för APIs.
Det gör det möjligt att göra mer exakta API query genom att minska mängden data som importeras, vilket gör det mer effektivt och snabbare.

I contentful finns en app som hjälper till att generera GraphQl-frågorna för projektet

[<img src="./styles/assets/images/GraphQL.png" width="200"/>](./styles/assets/images/GraphQL.png)

```javascript
import { gql, DocumentNode } from '@apollo/client';

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
```
- [Graphql](https://graphql.org/)
- 
# Contentful

# SAS

```javascript

<SASS Css moduler>

    @import "../../../../styles/breakpoints.scss";
    
.headerContainer {
  margin-bottom: 2em;
  h4 {
    margin-bottom: 0.5em;
    font-size: 22px;
    font-family: "Poppins-Bold";
    font-weight: 100;
  }

  h2 {
    font-size: 30px;
    @include respond-to("s") {
      font-size: 42px;
    }
    @include respond-to("m") {
      font-size: 46px;
    }
    @include respond-to("l") {
      font-size: 50px;
    }
  }
}
```

# Sendgrid


- [Chakra Core](https://github.com/Microsoft/ChakraCore)