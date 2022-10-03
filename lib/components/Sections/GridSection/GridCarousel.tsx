
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getGridSectionQuery } from "../../../api/sections";
import styles from "./GridCarousel.module.scss";
import Image from "next/image";
import { Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
 
type Props = {
  id: string;
};
 
export const GridCarousel = ({ id }: Props) => {
  const { locale } = useRouter();
 
  const { loading, data } = useQuery(getGridSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });
 
 
  if (loading) return <div></div>;
 
  return (
   
        <Splide options={{ perPage: 1, pagination: true, type: 'loop', focus: 'center', arrows: false }} className={styles.splide}>
       
       
          {data.gridSection.itemsCollection.items.map(
            (item: any, index: number) => (
   
      <SplideSlide key={index} className={styles.item}>
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
      </SplideSlide>
 
            )
 
          )}
   
     
       </Splide>
  );
};
 
