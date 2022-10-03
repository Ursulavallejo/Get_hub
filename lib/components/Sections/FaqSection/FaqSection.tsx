import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getFaqSectionQuery } from "../../../api/sections";
import styles from "./FaqSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import Image from 'next/image'
import logo from '../../../../styles/assets/images/bg-faq.png'

type Props = {
  id: string;
};

export const FaqSection = ({ id }: Props) => {
  const { locale } = useRouter();
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const { loading, data } = useQuery(getFaqSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  const toggleOpen = (index: number) => {
    if (openFaqs.includes(index)) {
      const newList = openFaqs.filter((i: number) => i != index);
      setOpenFaqs([...newList]);
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  const renderFaqItem = (item: any, index: number) => {
    return (
      <div style={{ width: "100%" }} key={index}>
        <div className={styles.question} onClick={() => toggleOpen(index)}>
          <p>{item.question}</p>

          <div
            className={`${styles.greendot} ${
              openFaqs.includes(index) ? "" : styles.rotate
            }`}
          >
            <MdKeyboardArrowUp />
          </div>
        </div>
        <div
          className={`${styles.answer} ${
            openFaqs.includes(index) ? "" : styles.hidden
          }`}
        >
          <div>
            {item?.answer?.json && documentToReactComponents(item.answer.json)}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div></div>;

  const { header, introText } = data.faqSection;

  return (
    <section className={styles.wrapper} id="FAQ">
  
       
 
      <div className={styles.left}>
        <div className={styles.logo}></div>
        <div className={styles.header}>{header}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.introText}>
          {introText?.json && documentToReactComponents(introText.json)}
        </div>
        {data.faqSection.itemsCollection.items.map((item: any, index: number) =>
          renderFaqItem(item, index)
        )}

      </div>
 
    </section>
  );
};
