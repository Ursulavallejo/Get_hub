import { useQuery } from '@apollo/client';
import { getGlobalQuery } from '../../api/pages';
import { GlobalPageModel } from '../../models/globalPageModel';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { Link } from 'react-scroll';
import Link2 from 'next/link'
import { LocaleLinkWrapper } from '../../utils/localeLinkWrapper';
import { useRouter } from 'next/router';
import { MdOutlineLanguage } from 'react-icons/md';
import { BiHomeSmile } from 'react-icons/bi';
import { useState } from 'react'

type Props = {
  data: GlobalPageModel;
};

const Navbar = () => {
  const router = useRouter();

  const { data, loading } = useQuery(getGlobalQuery(), {
    variables: {
      locale: router.locale,
    },
  });

  if (loading || !data?.globalsCollection?.items[0]) return null;


  const { getHubLogoTopGreen } = data.globalsCollection.items[0];

  return (

    <div className={styles.container}>

      <div className={styles.imgContainer}>
        <Image
          src={getHubLogoTopGreen.url}
          alt="getHubLogo"
          width="329"
          height="442"
          className={styles.img}
          loading="eager"
          quality={70}
        />
      </div>
      <nav className={styles.nav}>

      <div className={styles.homeItem}>
      <Link2 href="/">
           {router.pathname !== '/' ? <span className={styles.homeText}><BiHomeSmile size={28} /></span>:<span className={styles.hide}></span>}
      </Link2>
      </div>

       <div className={styles.linkItem}>
          {' '}
          <Link2 href="/">
          <Link to="case"  spy={true} smooth="true" offset={-50} duration={500}>
            {' '}
            {router.pathname == '/' ? <span>Case</span>:<span className={styles.hide}></span>}
          </Link>
          </Link2>

        </div>

         <div className={styles.linkItem}>
           {' '}
           <Link2 href="/#price">
           <Link  to="price" spy={true} smooth="true" offset={-50} duration={500}>
             {' '}
             {router.locale == 'sv' ? 'Priser' : 'Price'}
           </Link>
           </Link2>
         </div>

        <div className={styles.linkItem}>
          {' '}
          <Link2 href="/#FAQ">
          <Link  to="FAQ" spy={true} smooth="true" offset={-50} duration={500}>
            {' '}
            FAQ
          </Link>
          </Link2>
        </div>

        <div className={styles.button}>
          <Link
            to="contact"
            spy={true}
            smooth="true"
            offset={-50}
            duration={500}
          >
            {' '}
            {router.locale == 'sv' ? 'Kontakt' : 'Contact'}
          </Link>
        </div>
        <div >
        {/* <LocaleLinkWrapper> */}

       <Link2
        href={router.asPath}
        locale={router.locale == 'sv' ? 'en' : 'sv'} >
        <div className={styles.language}>
        {router.locale == 'sv' ? 'English' : 'Svenska'}
         <MdOutlineLanguage size={18} />
         </div>
         </Link2>

{/*      This work only for the first page to translate. Left on the repo as reference same as the LocaleLinkWrapper

          <Link
            onClick={() => {
              router.push('', '', {
                locale: router.locale == 'sv' ? 'en' : 'sv',
              });
            }}
          >
            {router.locale == 'sv' ? 'English' : 'Svenska'}
            <MdOutlineLanguage size={18} />
          </Link> */}
        {/*   </LocaleLinkWrapper> */}
        </div>
      </nav>
    </div>


  );
};

export default Navbar;


