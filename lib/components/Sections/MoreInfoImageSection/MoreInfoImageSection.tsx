import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getMoreInfoImageSectionQuery } from "../../../api/sections";
import styles from "./MoreInfoImageSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { AiFillCheckCircle } from "react-icons/ai";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";


type Props = {
  id: string;
};

export const MoreInfoImageSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getMoreInfoImageSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  if (loading) return <div></div>;

  const renderUlItem = (item: any, index: number) => {
    return (
      <div className={styles.ulWrapper} key={index}>
        <div className={styles.greendot}>
          <AiFillCheckCircle size={30} />{" "}
        </div>
        <div>{item?.content[0]?.content[0]?.value}</div>
      </div>
    );
  };

  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node: any) => {
        return <ul className={styles.ul} > {node.content.map(renderUlItem)} </ul>;
      },
    },
  };

  return (
    <div className={styles.container} id="info">
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            className={styles.img}
            src={data.moreInfoImageSection.image.url}
            width={800}
            height={800}
            alt="PhoneApp"
            loading="eager"
            quality={75}
            objectFit="cover"
          />
        </div>
        <div className={styles.right}>
          {data.moreInfoImageSection?.text?.json &&
            documentToReactComponents(
              data.moreInfoImageSection.text.json,
              options
            )}
        </div>
      </div>
    </div>
  );
};
