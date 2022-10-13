import { DocumentNode, gql } from '@apollo/client';

export const getFaqSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            faqSection(id: "${id}", locale: $locale) {
                name
                header
                introText {
                    json
                }
                showInNavigation
                itemsCollection {
                    items {
                        question
                        answer {
                            json
                        }
                    }
                }
            }
        }
    `;
};

export const getGridSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            gridSection(id: "${id}", locale: $locale) {
                name
                title
                description
                showInNavigation
                itemsCollection {
                    items {
                        logo {
                            url
                        }
                        slug
                        title
                        description
                        textButton
                    }
                }
            }
        }
    `;
};

export const getContactSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            contactSection(id: "${id}", locale: $locale){
                title
                header
                nameText
                namePlaceholder
                companyText
                companyPlaceholder
                emailText
                emailPlaceholder
                buttonText

            }
        }
    `;
};

export const getPricingSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            pricingSection(id: "${id}", locale: $locale){
                header
                showInNavigation
                itemsCollection{
                    items{
                        title
                        description{json}
                        price
                    }
                }
            }
        }
    `;
};

export const getImageTextSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            imageTextSection(id: "${id}", locale: $locale){
                richText {json}
                image {
                    url
                }
                buttonText
            }
        }
    `;
};

export const getVideoSectionQuery = (id: string): DocumentNode => {
    return gql`
        query ($locale: String!) {
            videoSection(id: "${id}", locale: $locale){
                richText {json}
                video {
                    url
                }
                buttonText
            }
        }
    `;
};

//Landing Page

export const getCheckListSectionQuery = (id: string): DocumentNode => {
    return gql`
        query  ($locale: String!) {
            checkListSection(id: "${id}", locale: $locale){
                title
                showInNavigation
                itemsCollection{
                    items {
                        image{
                            url
                        }
                        title
                        description
                    }
                }
            }
        }
    `;
};


export const getMoreInfoImageSectionQuery = (id: string): DocumentNode => {
    return gql`
        query  ($locale: String!) {
            moreInfoImageSection(id: "${id}", locale: $locale) {
                showInNavigation
                text{json}
                image{
                    url
                }
            }
        }
    `;
};

export const getMoreFunctionsGridSectionQuery = (id: string): DocumentNode => {
    return gql`
        query  ($locale: String!) {
            moreFunctionsGridSection(id: "${id}", locale: $locale){
                title
                showInNavigation
                itemsCollection{
                    items{
                        image{
                            url
                        }
                        slug
                        title
                        description
                        textButton
                    }
                }
            }
        }
    `;
};
