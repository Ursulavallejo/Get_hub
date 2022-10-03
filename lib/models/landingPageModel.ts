import { SeoMetadataModel } from "./SEOMetadataModel"

export type LandingPageModel = {
    header: string;
    introText: any;
    slug: string,
    seoMetadata: SeoMetadataModel,
    sectionsCollection: any;
    __typename: string,
    heroImage: any;
   
}