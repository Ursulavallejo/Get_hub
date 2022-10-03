import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: any;
  hidePage?: boolean;
  excludeLinks?: boolean;
};

export const MyHead = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  hidePage,
  excludeLinks,
}: Props) => {
  return (
    <>
      <Head>
        <title>{`${
          process.env.NEXT_PUBLIC_ENVIRONMENT != "master"
            ? `${process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase()} - `
            : ""
        }${title}`}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={ogTitle ?? title} />
        <meta
          property="og:description"
          content={ogDescription ?? description}
        />
        {ogImage?.url && <meta property="og:image" content={ogImage.url} />}
        <meta
          name="robots"
          content={`${hidePage ? "noindex" : "index"}, ${
            excludeLinks ? "nofollow" : "follow"
          }`}
        />
      </Head>
    </>
  );
};
