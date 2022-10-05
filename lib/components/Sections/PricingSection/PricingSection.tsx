import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getPricingSectionQuery } from "../../../api/sections";
import styles from "./PricingSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type Props = {
  id: string;
};

export const PricingSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getPricingSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  const renderPricingItem = (item: any, index: number) => {
    return (
      <div key={index} id="Price">
        <div className={styles.item}>
          <h4 className={styles.itemTitle}> {item.title}</h4>
          <h2 className={styles.itemPrice}> {item.price}</h2>
          <div className={styles.itemDescription}>
            {item.description?.json &&
              documentToReactComponents(item.description.json)}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div></div>;

  return (
    <section className={styles.container} id="price">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{data.pricingSection.header}</h2>
        </div>
        <div className={styles.gridContainer}>
          {data.pricingSection.itemsCollection.items.map(
            (item: any, index: number) => renderPricingItem(item, index)
          )}
        </div>
      </div>
    </section>
  );
};
