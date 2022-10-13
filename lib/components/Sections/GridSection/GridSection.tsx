import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getGridSectionQuery } from "../../../api/sections";
import styles from "./GridSection.module.scss";
import Image from "next/image";
import { GridCarousel } from './GridCarousel'
import Link from "next/link";

type Props = {
  id: string;
};

export const GridSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getGridSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

   const renderGridItem = (item: any, index: number) => {
    return (
    <div className={styles.itemContainer}>
    <div key={index} className={styles.item}>
             <div className={styles.iconContainer}>
               <div className={styles.icon}>
                 <Image
                   src={item.logo.url}
                   width={50}
                   height={50}
                   alt="icons"
                   objectFit="contain"
                   loading="eager"
                   quality={70}
                 />
               </div>
             </div>
             <h4>{item.title}</h4>
             <p>{item.description}</p>


           </div>
           <Link
           href={item.slug}>
           <button >{item.textButton}</button>
           </Link>
    </div>

     );
   };

  if (loading) return <div></div>;

  return (

    
    <section className={styles.container} id="case">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{data.gridSection.title}</h2>
          <p>{data.gridSection.description}</p>
        </div>
        <GridCarousel id={id}/>
     
         <div className={styles.gridContainer}>
          {data.gridSection.itemsCollection.items.map(
            (item: any, index: number) => renderGridItem(item, index)
          )}
        </div>
      </div>
    </section>
   
  );
};
