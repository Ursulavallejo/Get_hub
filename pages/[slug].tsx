import type { GetServerSideProps } from "next";
import { client } from "../lib/api/apolloClient";
import {createClient} from 'contentful';
import styles from "../styles/landingPage.module.scss";
import { LandingPageModel } from "../lib/models/landingPageModel";
import { getLandingPageQuery } from "../lib/api/pages";
import { getSection } from "../lib/utils/sectionPicker";
import Image from "next/image";


type Props = {
  data: LandingPageModel;
};


const LandingPageInfo =  ({ data }: Props) => {
  const { header, introText, heroImage, seoMetadata, slug } = data;

  console.log('LANDING', data)


   return (
      <>

            <div className={styles.container}>
              <div className={styles.textWrapper}>
                  <h1 className={styles.header}>{header}</h1>
                  <div className={styles.imageWrapper}>
                          <Image
                            src={heroImage.url}
                            alt="HeroPhoto"
                            width="1600"
                            height="1600"
                            objectFit="cover"
                            loading="eager"
                            quality={70}
                            className={styles.image}
                          />
                </div>
                  <p className={styles.text}>{introText}</p>
              </div>

              <div className={styles.imgContainer}>
                          <Image
                            src={heroImage.url}
                            alt="HeroPhoto"
                            width="1600"
                            height="1600"
                            objectFit="cover"
                            loading="eager"
                            quality={70}
                            className={styles.img}
                          />
                </div>

            </div>

            {/* RENDER SECTIONS */}
            {data.sectionsCollection.items.map((section: any) =>
             getSection(section.__typename, section.sys?.id)
             )}

      </>
  )
 };



 export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {

  const { data, error } = await client.query({
    query: getLandingPageQuery(`${params.slug}`),
    variables: {
      locale: locale,
    },
  });

  let landing = data.landingPageCollection.items[0] ?? {};

  return {
    props: {
      data: landing as LandingPageModel,
    },
  };
};


export default  LandingPageInfo;






