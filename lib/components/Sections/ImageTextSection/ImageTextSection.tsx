import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getImageTextSectionQuery } from "../../../api/sections";
import styles from "./ImageTextSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";

type Props = {
  id: string;
};

export const ImageTextSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getImageTextSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  if (loading) return <div></div>;

  const renderUlItem = (item: any, index: number) => {
    return (
      <div className={styles.ulWrapper} key={index}>
        <div className={styles.greendot}>
          <MdOutlineKeyboardArrowRight />{" "}
        </div>
        <div>{item?.content[0]?.content[0]?.value}</div>
      </div>
    );
  };

  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node: any) => {
        return <ul> {node.content.map(renderUlItem)} </ul>;
      },
    },
  };

  return (
    <div className={styles.container} id="info">
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            className={styles.img}
            src={data.imageTextSection.image.url}
            width={800}
            height={800}
            alt="workerPhoto"
            loading="eager"
            quality={75}
            objectFit="cover"
          />
        </div>
        <div className={styles.right}>
          {data.imageTextSection?.richText?.json &&
            documentToReactComponents(
              data.imageTextSection.richText.json,
              options
            )}

          {data.imageTextSection.buttonText && (


          <Link href={router.locale == 'sv' ? '/nyheter' : '/news'}>

          <button className="buttonStyle">
              {data.imageTextSection.buttonText}
            </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
