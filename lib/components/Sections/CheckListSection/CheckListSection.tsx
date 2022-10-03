import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getCheckListSectionQuery } from "../../../api/sections";
import styles from "./CheckList.module.scss";
import Image from "next/image";
import { AiFillCheckCircle } from "react-icons/ai";


type Props = {
  id: string;
};

export const CheckListSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getCheckListSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });
console.log('CHECKLIST', data)
   const renderCheckListItem = (item: any, index: number) => {
    return (
       <div key={index} className={styles.item}>
       <div className={styles.mobileIconText}>
         <div className={styles.iconContainer}>
         <AiFillCheckCircle size={40} className={styles.icon} />{" "}
           <div className={styles.icon}>
{/*              In case decided to use a image from contentful this can be used:
               <Image
              /src={item.image.url}
               width={50}
               height={50}
               alt="icons"
               objectFit="contain"
               loading="eager"
               quality={70}
             /> */}
           </div>
         </div>
         <h2>{item.title}</h2>
         </div>
         <p>{item.description}</p>
       </div>
     );
   };

  if (loading) return <div></div>;

  return (


    <section className={styles.container} id="case">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{data?.checkListSection.title}</h2>
        </div>

         <div className={styles.itemContainer}>
          {data.checkListSection.itemsCollection.items.map(
            (item: any, index: number) => renderCheckListItem(item, index)
          )}
        </div>
      </div>
    </section>

  );
};
