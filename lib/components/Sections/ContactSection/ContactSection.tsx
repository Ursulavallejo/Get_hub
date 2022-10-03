import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getContactSectionQuery } from "../../../api/sections";
import styles from "./ContactSection.module.scss";

type Props = {
  id: string;
};

export const ContactSection = ({ id }: Props) => {
  const { locale } = useRouter();

  const { loading, data } = useQuery(getContactSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  //   Form validation state

  const [errors, setErrors] = useState<any>({});

  // Setting success or failure messages states

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  if (loading) return <div></div>;
  // Validation check method

  const handleValidation = () => {
    let tempErrors: any = {};
    let isValid = true;

    if (fullName.length <= 0) {
      tempErrors["fullName"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (company.length <= 0) {
      tempErrors["company"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    return isValid;
  };

  //   Handling form submit

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          company: company,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        setShowSuccessMessage(false);
        setShowFailureMessage(true);

        return;
      }

      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      // Reset form fields
      setFullName("");
      setEmail("");
      setCompany("");
    }
  };

  return (
    <>
      <section className={styles.container} id="contact">
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <h4>{data.contactSection.title}</h4>
            <h2 className={styles.header}>{data.contactSection.header}</h2>
          </div>

          <form className={styles.contactUs} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <p className={styles.styleContact}>
                {data.contactSection.nameText}
              </p>
              <input
                id="name-field"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className={styles.field}
                placeholder={data.contactSection.namePlaceholder}
              />
              {errors?.fullName && <p>Name cannot be empty.</p>}
            </div>
            <div className={styles.formGroup}>
              <p className={styles.styleContact}>
                {data.contactSection.companyText}
              </p>
              <input
                id="company-field"
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                className={styles.field}
                placeholder={data.contactSection.companyPlaceholder}
              />
              {errors?.company && <p>Company cannot be empty.</p>}
            </div>
            <div className={styles.formGroup}>
              <p className={styles.styleContact}>
                {data.contactSection.emailText}{" "}
              </p>
              <input
                id="email-field"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={styles.field}
                placeholder={data.contactSection.emailPlaceholder}
              />
              {errors?.email && <p>Email cannot be empty.</p>}
            </div>

            <button type="submit" className={styles.buttonStyle}>
              {data.contactSection.buttonText}
            </button>
            <div>
              {showSuccessMessage && (
                <p>Thank you! Your Message has been delivered.</p>
              )}

              {showFailureMessage && (
                <p>Oops! Something went wrong, please try again.</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
