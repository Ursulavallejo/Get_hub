import { FaqSection } from "../components/Sections/FaqSection/FaqSection";
import { GridSection } from "../components/Sections/GridSection/GridSection";
import { ContactSection } from "../components/Sections/ContactSection/ContactSection";
import { ImageTextSection } from "../components/Sections/ImageTextSection/ImageTextSection";
import { PricingSection } from "../components/Sections/PricingSection/PricingSection";
import { VideoSection } from "../components/Sections/VideoSection/VideoSection";
import { CheckListSection } from "../components/Sections/CheckListSection/CheckListSection";
import { MoreInfoImageSection } from "../components/Sections/MoreInfoImageSection/MoreInfoImageSection";
import { MoreFunctionsGridSection } from "../components/Sections/MoreFunctionsGridSection/MoreFunctionsGridSection";

const sectionsMap = new Map<string, Function>([
  ["GridSection", (id: string) => <GridSection key={id} id={id} />],
  ["PricingSection", (id: string) => <PricingSection key={id} id={id} />],
  ["FaqSection", (id: string) => <FaqSection key={id} id={id} />],
  ["ContactSection", (id: string) => <ContactSection key={id} id={id} />],
  ["ImageTextSection", (id: string) => <ImageTextSection key={id} id={id} />],
  ["VideoSection", (id: string ) => <VideoSection key={id} id={id} />],
  ["CheckListSection", (id: string ) => <CheckListSection key={id} id={id} />],
  ["MoreInfoImageSection", (id: string ) => <MoreInfoImageSection key={id} id={id} />],
  ["MoreFunctionsGridSection", (id: string ) => <MoreFunctionsGridSection key={id} id={id} />],

]);

export const getSection = (typename: string, id: string): JSX.Element => {
  return sectionsMap.has(typename) ? sectionsMap.get(typename)(id) : null;
};
