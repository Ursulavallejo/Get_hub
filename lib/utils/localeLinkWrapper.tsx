import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  href: string;
  children: JSX.Element;
  overrideLocale?: string;
};

export const LocaleLinkWrapper = ({
  href,
  children,
  overrideLocale,
}: Props) => {
  const { locale } = useRouter();
  const [updatedLocale, setUpdatedLocale] = useState("");
  useEffect(() => {
    if (overrideLocale) {
      setUpdatedLocale(overrideLocale);
      return;
    }
    const urlArr = href.split(process.env.NEXT_PUBLIC_BASE_URL);
    // Here we have an internal link that we can change locale on
    if (urlArr.length > 1) {
      const localeWithPath = urlArr[1];
      if (localeWithPath.startsWith("/sv")) {
        setUpdatedLocale("sv");
      } else if (localeWithPath.startsWith("/en")) {
        setUpdatedLocale("en");
      }
    } else {
      setUpdatedLocale(locale);
    }
  }, [locale]);

  return (
    <Link href={href} locale={updatedLocale}>
      {children}
    </Link>
  );
};