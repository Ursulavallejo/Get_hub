import { useQuery } from '@apollo/client';
import { getGlobalQuery } from '../../api/pages';
import { GlobalPageModel } from '../../models/globalPageModel';
import styles from '../footer/footer.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  data: GlobalPageModel;
};

const Footer = () => {
  const { locale } = useRouter();
  const { data, loading } = useQuery(getGlobalQuery(), {
    variables: {
      locale: locale,
    },
  });

  if (loading || !data?.globalsCollection?.items[0]) return null;

  const { getItLogo, getHubLogo, footerContact, footerText } =
    data.globalsCollection.items[0];
  return (
    <div className={styles.footer}>
      <div className={styles.logosWrapper}>
        <div className={styles.gethublogoWrapper}>
          <Image
            className={styles.gethubimg}
            src={getHubLogo.url}
            width={227}
            height={91}
            alt="getHubLogo"
            loading="eager"
            quality={70}
          />
        </div>
        <div className={styles.getitlogoWrapper}>
          <Image
            className={styles.getitimg}
            src={getItLogo.url}
            width={1900}
            height={1200}
            alt="getItLogo"
            loading="eager"
            quality={70}
          />
        </div>
      </div>

      <div style={{ fontSize: '12px' }} className={styles.copyright}>
        {documentToReactComponents(footerText.json)}
      </div>
      <div className={styles.contacts}>
        {documentToReactComponents(footerContact.json)}
      </div>
    </div>
  );
};

export default Footer;
