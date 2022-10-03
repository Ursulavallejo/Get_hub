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
      <MyHead
        title={seoMetadata.title}
        description={seoMetadata.description}
        ogTitle={seoMetadata.ogTitle ?? seoMetadata.title}
        ogDescription={seoMetadata.ogDescription ?? seoMetadata.description}
        ogImage={seoMetadata.ogImage}
        hidePage={seoMetadata.hidePage}
        excludeLinks={seoMetadata.excludeLinks}
      />
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
