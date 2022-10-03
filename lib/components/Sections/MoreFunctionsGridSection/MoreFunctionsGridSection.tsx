import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getMoreFunctionsGridSectionQuery } from "../../../api/sections";
import styles from "./MoreFunctionsGridSection.module.scss";
import Image from "next/image";

type Props = {
  id: string;
};

export const MoreFunctionsGridSection = ({ id }: Props) => {
  const { locale } = useRouter();

    const { loading, data } = useQuery(getMoreFunctionsGridSectionQuery(id), {
      variables: {
        locale: locale,
      },
    });

     const renderMoreFunctionsGridItem = (item: any, index: number) => {
        return (
       <div key={index} className={styles.item}>
         <div className={styles.iconContainer}>
           <div className={styles.icon}>
             <Image
               src={item.image.url}
               width={50}
               height={50}
               alt="icons"
               objectFit="contain"
               loading="eager"
               quality={70}
             />

           </div>
           <h4>{item.title}</h4>
         </div>
         <p>{item.description}</p>
       </div>
     );
   };

  if (loading) return <div></div>;

   return (
        <section className={styles.container} id="case">
        <div className={styles.wrapper}>
           <div className={styles.gridContainer}>
           <h2 className={styles.header} >{data?.moreFunctionsGridSection.title}</h2>
            {data?.moreFunctionsGridSection.itemsCollection.items.map(
              (item: any, index: number) => renderMoreFunctionsGridItem(item, index)
            )}
          </div>
        </div>
      </section>
    );
  };
